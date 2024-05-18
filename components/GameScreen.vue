<template>
  <div v-if="!state.loading" class="container mx-auto px-2 text-base">
    <ArtistHeader :image="state.artistInfo.image" />

    <p
      v-if="game.answers.length && hint"
      class="mb-2 text-sm text-slate-300 underline decoration-cyan-700 decoration-dotted underline-offset-2"
    >
      {{ hint }}
    </p>

    <ol v-if="game.answers.length" class="guesses">
      <li
        v-for="(_, i) in game.answers"
        :key="i"
        class="answer mb-2 flex flex-wrap py-1 last:mb-0"
        :class="{
          fail: game.answers[i].score === 0,
          flop: game.answers[i].score === 0.5,
          flip: game.answers[i].score === 1,
        }"
      >
        <div class="input-container flex w-full items-center" ref="answerWrappers">
          <OnClickOutside @trigger="onClickOutside()" class="relative mx-2 grow">
            <input
              type="text"
              ref="answerInputs"
              :aria-label="`Guess ${i + 1}`"
              v-model="game.answers[i].value"
              @input="handleInput(i, game.answers[i].value)"
              class="w-full truncate rounded-none border-0 border-b-2 border-slate-50 bg-transparent p-1 px-2 text-slate-100 placeholder:text-slate-900 focus:placeholder:text-slate-300 disabled:border-slate-400 disabled:text-slate-300"
              :disabled="game.answers[i].score !== undefined || false"
              placeholder="Type to search..."
              @keyup.esc="onClickOutside()"
              @keyup.enter="onClickOutside()"
              @focusin="onClickOutside()"
              @keyup.arrow-down="navToSearchResults()"
            />
            <div
              v-if="state.searchResults[i].length"
              class="search-results-wrapper absolute top-full z-10 m-0 block w-full overflow-y-scroll bg-slate-50 drop-shadow-md"
            >
              <ul class="search-results w-full" ref="searchResults">
                <li
                  v-for="(track, index) in state.searchResults[i]"
                  :key="index"
                  class="border-b border-slate-700 last:border-b-0"
                >
                  <button
                    type="button"
                    @click="handleSelect(i, track.name)"
                    class="w-full p-1 text-left text-slate-800 hover:bg-slate-200 focus:bg-slate-200"
                    @keyup.esc="onClickOutside()"
                    @keyup.prevent="navBetweenItems(index, $event)"
                  >
                    {{ track.name }}
                  </button>
                </li>
              </ul>
            </div>
          </OnClickOutside>
          <PreviewButton
            v-if="game.status === 'complete'"
            @preview="songPreview(i)"
            :track="state.topTracks[i]"
            :index="i"
            ref="answerAudioControls"
          ></PreviewButton>
        </div>
        <p v-if="game.answers[i].error" class="pt-1 leading-4 text-rose-500">
          <small>{{ game.answers[i].error }}</small>
        </p>
        <p class="pt-2 leading-4 text-sm text-slate-300">
          <span v-if="game.status === 'complete'">
            {{ state.topTracks[i].name }} —
            <span class="italic">{{ state.topTracks[i].album }}</span>
          </span>
          <small v-else>&nbsp;</small>
        </p>
      </li>
    </ol>

    <div>
      <SubmitButton @checkAll="checkAll()" ref="answerSubmits" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/game';
import { differenceInDays, format } from 'date-fns';
import endpoints from '@/data/endpoints';
import { staticArtists } from '@/data/game';
import type { Artist, Answer, Track, Distributions } from '@/data/types';
import { OnClickOutside } from '@vueuse/components';
import { stringSimilarity } from 'string-similarity-js';
import PreviewButton from '@/components/PreviewButton.vue';
import SubmitButton from '@/components/SubmitButton.vue';
import { rand } from '@vueuse/core';

const router = useRouter();
const route = useRoute();

const answerWrappers = ref([]);
const answerInputs = ref([]);
const answerSubmits = ref([]);
const answerAudioControls = ref([]);

const launchDate = new Date('2022-11-24T00:00:00');
const artistIndex = differenceInDays(Date.now(), launchDate) || 1;
let archive: number = 0;

const accessToken = await $fetch('/api/spotify');

/**
 * @returns Boolean if game is accessed via the archive query string
 */
const isArchive = computed(() => {
  if (route.params.game) {
    return true;
  }
  return false;
});

const game = useGameStore();

const state = reactive({
  loading: true,
  artistInfo: {
    image: '',
  },
  topTracks: [] as Array<Track>,
  topAlbums: [] as Array<any>,
  comparison: [] as Array<string>,
  // Correct answers can not be used again on other inputs to prevent gaming the logic
  locked: [] as Array<string>,
  // Similar answers for scoring
  similarLocked: [] as Array<string>,
  // All tracks for autocomplete
  autocompletes: [] as Array<Track>,
  // Displayed Search Results
  searchResults: [[], [], [], [], []] as Array<Array<any>>,
});

const onClickOutside = () => {
  state.searchResults = [[], [], [], [], []];
};

const answerFactory = (answerData: Answer = { value: '', score: undefined, error: '' }) => {
  return {
    ...answerData,
  };
};

const getArtistInfo = async () => {
  try {
    const response: any = await $fetch(`${endpoints.artists}/${game.artist?.artistId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    state.artistInfo = {
      image: response.images[2].url,
    };
  } catch (err) {
    console.error(err);
  }
};

/**
 * @returns Initialized Array<Answer>
 */
const initAnswers = () => {
  let n = 0;
  while (n < state.topTracks.length) {
    n++;
    game.initAnswer(answerFactory());
  }
};

/**
 * Get top-tracks from API, limit to 5
 */
const getTopTracks = async () => {
  try {
    const response: any = await $fetch(
      `${endpoints.artists}/${game.artist?.artistId}/${endpoints.topTracks}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    state.topTracks = response.tracks.slice(0, 5).map((t: Track) => {
      return {
        name: t.name,
        album: t.album.name,
        popularity: t.popularity || 0,
        preview_url: t.preview_url,
      };
    });

    // Get albums from top tracks, exclude features, singles, various artists
    // This ensures we get popular albums for autocomplete
    state.topAlbums = response.tracks
      .filter((track: any) => {
        return (
          track.album.album_type === 'album' && track.album.artists[0]?.name === game.artist?.name
        );
      })
      .map((track: any) => {
        return {
          id: track.album.id,
          name: track.album.name,
        };
      });

    // Save the tracks for later scoring
    state.comparison = state.topTracks.map((t) => t.name.toLocaleLowerCase());
  } catch (err) {
    console.error(err);
  }
};

const hint = computed(() => {
  let hint = '';
  const hintTypes = [];
  if (state.comparison.some((t) => t.includes('remaster'))) {
    hintTypes.push('remastered');
  }
  if (state.comparison.some((t) => t.includes('remix'))) {
    hintTypes.push('remixed');
  }
  if (hintTypes.length) {
    hint = `Today’s Hint: Correct answers can include ${hintTypes.join(', ')} versions.`;
  }
  return hint;
});

/**
 * Get all tracks from artist's albums for autocomplete datalist
 */
const getArtistTracks = async (albumIds: string) => {
  try {
    // Get artist albums by IDs, limit 20
    const response: any = await $fetch(`${endpoints.albums}?ids=${albumIds}&market=US`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // 1. Get track names from every album, add album popularity
    // 2. Flatten array
    return response.albums
      .map((album: any) => {
        const tracks = album?.tracks?.items?.map((i: Track) => {
          return {
            name: i.name,
            popularity: album?.popularity || 0,
            preview_url: i.preview_url,
          };
        });
        return tracks;
      })
      .flat();
  } catch (err) {
    console.error(err);
  }
};

/**
 * @returns Autocomplete full list
 */

const setAutocompleteList = (autocompleteList: Array<any> = []) => {
  // 3. Add Top Tracks answers to autocomplete list, in case of non-album or guest featured tracks are in the mix
  const autocomplete = autocompleteList.concat(...state.topTracks);

  // 4. Reduce list to unique track names
  // We don't care what album the title comes from, correct matches of song across different albums will count
  // 5. Sort alphabetically by track name, descending
  // 6. Sort by track's album popularity, descending
  state.autocompletes = [
    ...new Map(autocomplete.map((item: Track) => [item['name'], item])).values(),
  ]
    .sort()
    .sort((a: Track, b: Track) => b.popularity - a.popularity);
};

/**
 * @returns Array of artist albums IDs, pass to getAlbums for tracks and autocomplete dataset
 */
const getArtistAlbums = async () => {
  // Don't burn API calls if we've already played this game
  if (game.status === 'complete') {
    return;
  }
  try {
    const response: any = await $fetch(
      `${endpoints.artists}/${game.artist?.artistId}/${endpoints.artistAlbums}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    let albumsWithTopTracks = response.items.concat(...state.topAlbums);

    // Get top albums for possible hint
    state.topAlbums = [...new Set(state.topAlbums.slice(0, 5).map((a) => a.name))];

    // Popularity is not on the getArtistAlbums endpoint and duplicate albums are sometimes returned (Taylor Swift) after the album we want
    // 1. get unique (last found will be saved), this will be oldest release date
    const uniqueAlbums = [
      ...new Map(albumsWithTopTracks.map((item: Track) => [item['name'], item])).values(),
    ];

    // Filter out some anomolies
    // - karaoke versions
    const filteredAlbums = uniqueAlbums.filter((a: any) => {
      return !a['name'].toLocaleLowerCase().includes('karaoke');
    });

    // Get album IDs, API limit is 20 at a time
    // Weezer required chunking the api calls to get to the Blue album
    const albumIds = filteredAlbums.map((i: any) => i['id']);
    const chunkSize = 20;
    let collection: Array<any> = [];
    for (let i = 0; i < albumIds.length; i += chunkSize) {
      const chunk = albumIds.slice(i, i + chunkSize).join(',');
      const tracks = await getArtistTracks(chunk);
      collection = collection.concat(...tracks);
    }
    setAutocompleteList(collection);
  } catch (err) {
    console.error(err);
  }
};

const saveStats = () => {
  const store = localStorage.getItem('stats');
  const stats = store ? JSON.parse(store) : false;
  const updated = {
    lastPlayed: artistIndex,
    playCount: 0,
    playStreak: 1,
    maxStreak: 1,
    totalScore: 0,
    correctDistribution: {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    } as Distributions,
  };
  if (stats) {
    // Increment play count
    updated.playCount = stats.playCount;
    updated.totalScore = stats.totalScore;
    updated.playStreak = stats.playStreak;
    updated.maxStreak = stats.maxStreak;
    updated.correctDistribution = {
      1: stats.correctDistribution[1],
      2: stats.correctDistribution[2],
      3: stats.correctDistribution[3],
      4: stats.correctDistribution[4],
      5: stats.correctDistribution[5],
    };
  }

  // Game IDs are autoincrementing numbers. Use the saved Game ID to calculate streaks
  if (updated.lastPlayed - 1 === stats?.lastPlayed) {
    updated.playStreak++;
    updated.maxStreak =
      updated.playStreak > updated.maxStreak ? updated.playStreak : updated.maxStreak;
  } else {
    updated.playStreak = 1;
  }

  // Add to total points scored
  updated.playCount++;
  updated.totalScore = updated.totalScore + (Number(game.score) || 0);
  // Save distribution of correct guesses
  game.answers.forEach((a, index) => {
    if (a.score === 1) {
      updated.correctDistribution[index + 1]++;
    }
  });
  if (!isArchive.value) {
    localStorage.setItem(
      'stats',
      JSON.stringify({
        lastPlayed: artistIndex,
        playCount: updated.playCount,
        playStreak: updated.playStreak,
        maxStreak: updated.maxStreak,
        totalScore: updated.totalScore,
        correctDistribution: {
          1: updated.correctDistribution[1],
          2: updated.correctDistribution[2],
          3: updated.correctDistribution[3],
          4: updated.correctDistribution[4],
          5: updated.correctDistribution[5],
        },
      })
    );
  }
};

const saveGame = () => {
  const unanswered = game.answers.map((a) => a.score).filter((a) => a === undefined);
  if (!unanswered.length) {
    game.setStatus('complete');
    saveStats();
  }
  localStorage.setItem(
    Number(game.artist?.id).toString(),
    JSON.stringify({
      status: game.status,
      answers: game.answers,
      locked: state.locked,
    })
  );
};

const loadGame = () => {
  localStorage.setItem('day', artistIndex.toString());
  const storage = localStorage.getItem(Number(game.artist?.id).toString());
  const memory = storage ? JSON.parse(storage) : false;
  if (memory) {
    game.setAnswers(memory.answers);
    state.locked = memory.locked || [];
    game.setStatus(memory.status);
  } else {
    game.setAnswers([]);
  }
};

const startGame = () => {
  if (!game.answers.length) {
    initAnswers();
  }
  state.loading = false;
};

const regexYear = /(?:(?:18|19|20|21)[0-9]{2})/g;
const regexEdit = /\b(edit)\b/g;
/**
 * @returns a simplified string for similarity checks
 */
const makeSimilar = (input: string) => {
  return input
    .replace(regexEdit, '')
    .replace('remaster', '')
    .replace('remastered', '')
    .replace(regexYear, '')
    .replace('-', ' ')
    .replace(',', '')
    .replace(/  +/g, ' ')
    .trim();
};

const similarityChecker = (input: string, answer: string) => {
  const simplifiedInput = makeSimilar(input);
  const simplifiedAnswer = makeSimilar(answer);
  return stringSimilarity(simplifiedInput, simplifiedAnswer);
};

const check = (idx: number) => {
  const input = answerInputs.value[idx] as HTMLInputElement;
  const guess = input.value.toLocaleLowerCase();
  const answers = state.topTracks.map((t) => t.name.toLocaleLowerCase());

  state.similarLocked = state.similarLocked.length
    ? state.similarLocked
    : answers.map((t) => makeSimilar(t));

  // Get similarity ratio
  const similarity = similarityChecker(guess.toLocaleLowerCase(), answers[idx]);

  // If an answer is correct, then don't allow it to be used for another guess
  if (state.locked.includes(guess) && game.answers[idx].score === undefined) {
    game.answers[idx].error = 'This song has already been correctly guessed, please try another.';
    return;
  }

  // Reset error
  game.answers[idx].error = '';

  // If guess equals answer or guess is sufficiently similar to answer
  if (guess === answers[idx] || similarity >= 0.7) {
    if (guess !== answers[idx]) {
      console.info('Close enough, we’re giving it to you.');
    }
    game.answers[idx].score = 1;
    game.answers[idx].value = state.topTracks[idx].name;
    state.locked.push(game.answers[idx].value);

    // Remove locked answer from similarity checker.
    // Using this answer or similar songs should not give a half point
    let similarIdx = state.similarLocked.indexOf(makeSimilar(answers[idx]));
    if (similarIdx > -1) {
      state.similarLocked.splice(similarIdx, 1);
    }
  } else if (
    answers.includes(guess) ||
    state.locked.some((a) => {
      return similarityChecker(guess, a) >= 0.7;
    }) ||
    state.similarLocked.some((a) => {
      return similarityChecker(guess, a) >= 0.7;
    })
  ) {
    // If answer is correct elsewhere throw an error
    if (
      !state.similarLocked.some((a) => {
        return similarityChecker(guess, a) >= 0.7;
      }) &&
      game.answers[idx].score === undefined
    ) {
      game.answers[idx].error = 'This song has already been correctly guessed, please try another.';
      return;
    }
    game.answers[idx].score = 0.5;
  } else {
    game.answers[idx].score = 0;
  }
  saveGame();
};

const songPreview = (idx: number) => {
  answerAudioControls.value.forEach((_, index) => {
    let control = answerAudioControls.value[index] as typeof PreviewButton;
    if (index === idx) {
      control.play();
    } else {
      control.stop();
    }
  });
};

const checkAll = () => {
  // Check all answers sequentially, break on errors
  // TODO: validate uniqueness of all inputs first?
  for (let idx = 0; idx < answerInputs.value.length; idx++) {
    check(idx);
  }
};

const handleInput = (idx: number, query: string) => {
  if (query?.length < 1) {
    state.searchResults[idx] = [];
    return;
  }
  // Match full words and/or parts of sentences
  const matches = state.autocompletes.filter((element) => {
    const songTitleFull = element.name.toLowerCase();
    const songTitleWords = songTitleFull.split(' ');
    const normalizedQuery = query.toLowerCase();
    const spaceSearch = normalizedQuery.includes(' ');
    for (const value of songTitleWords.values()) {
      if (value.startsWith(normalizedQuery)) {
        return element;
      } else if (spaceSearch && songTitleFull.includes(normalizedQuery)) {
        return element;
      }
    }
  });
  state.searchResults[idx] = matches.slice(0, 10);
};

const handleSelect = async (idx: number, track: string) => {
  game.answers[idx].value = track;
  state.searchResults[idx] = [];
  const bSubmit = answerSubmits.value[idx] as HTMLButtonElement;
  if (bSubmit) {
    bSubmit.focus();
  }
};

/** Down arrow key from seach automatically focuses on first search result (if available) */
const navToSearchResults = async () => {
  const firstItem = document.querySelector('.search-results-wrapper button') as HTMLButtonElement;
  if (firstItem) {
    firstItem.focus();
  }
};

/** Arrow up/down is a focus trap within the search results */
const navBetweenItems = async (idx: number, event: any) => {
  // return if not arrow up or down
  if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') {
    return;
  }

  const numItems = document.querySelectorAll('.search-results-wrapper button').length;
  let nextIdx = 0;

  if (event.key === 'ArrowDown') {
    nextIdx = idx + 1 >= numItems ? 0 : idx + 1;
  } else if (event.key === 'ArrowUp') {
    nextIdx = idx - 1 < 0 ? numItems - 1 : idx - 1;
  }

  let nextItem = document.querySelectorAll('.search-results-wrapper button')[
    nextIdx
  ] as HTMLButtonElement;

  if (nextItem) {
    nextItem.focus();
  }
};

const init = async () => {
  archive = Number(route.params.game);

  // Don't allow access to games that are not available yet
  if (archive >= artistIndex) {
    console.error('This game is not available yet, sending you back to the home page.');
    router.push('/');
  }

  // Get today's or archive artist?
  const getIndex = !isArchive.value ? artistIndex : archive;

  // Fetch artist data from DB
  const { artists } = await $fetch(`/api/get-artist?id=${getIndex}`);

  if (artists.length) {
    game.setArtist(artists[0]);
  } else {
    // Insert artist record into DB from random static data
    const uniqueId = rand(1, 231);
    const artist = staticArtists.find((a: Artist) => a.id === uniqueId);

    // post game to database for future use
    await $fetch('/api/post-artist', {
      method: 'post',
      body: {
        artistId: artist?.artistId,
        name: `${artist?.name} ${format(Date.now(), 'MM/dd/yyyy')}`,
      },
    });

    // reload app to get newly inserted artist
    reloadNuxtApp();
  }

  return Promise.resolve();
};

watch(
  () => route.params.game,
  async () => {
    state.loading = true;
    await init();
    await getArtistInfo();
    await getTopTracks();
    loadGame();
    startGame();
    await getArtistAlbums();
  }
);

onMounted(async () => {
  game.setStatus('loading');
  await init();
  await getArtistInfo();
  await getTopTracks();
  loadGame();
  startGame();
  await getArtistAlbums();
});

</script>

<style>
ol {
  counter-reset: list-counter;
}
.answer {
  counter-increment: list-counter;
  position: relative;
}
.answer .input-container::before {
  content: '🔳 ' counter(list-counter) '.';
  font-weight: 900;
}

.answer.flip .input-container::before {
  content: '🟩 ' counter(list-counter) '.';
}

.answer.flop .input-container::before {
  content: '🟨 ' counter(list-counter) '.';
}

.answer.fail .input-container::before {
  content: '⬜️ ' counter(list-counter) '.';
}

.search-results-wrapper {
  max-height: 300px;
}
</style>
