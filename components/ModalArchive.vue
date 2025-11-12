<template>
  <div>
    <p class="mb-4">Playing past day’s games will not count towards your gameplay stats.</p>

    <template v-if="!searchInput.length && !state.artists.length">
      <p class="mb-4">The archive could not be loaded. Please try again later.</p>
    </template>

    <template v-else>
      <input
        class="mb-4 w-full truncate rounded-none border-0 border-b-2 border-zinc-50 bg-transparent p-1 px-2 text-zinc-100 placeholder:text-zinc-500 focus:placeholder:text-zinc-300 disabled:border-zinc-400 disabled:text-zinc-300"
        v-model="searchInput"
        type="search"
        autocomplete="off"
        placeholder="Search for an artist…"
        @input="handleInput"
        aria-label="Search for an artist"
      />

      <ol v-if="!searchInput.length" reversed>
        <li class="relative mb-4 pl-7">
          <span class="absolute top-1 left-0">
            <span v-if="completed(currentGame.id)">✅</span>
            <span v-else>⚪️</span>
          </span>
          <NuxtLink
            to="/"
            class="underline decoration-orange-600 decoration-2 hover:decoration-orange-900"
          >
            <small>{{ currentGame.date }}</small>
            <h4 class="text-md font-serif font-bold tracking-wide">{{ currentGame.name }}</h4>
          </NuxtLink>
        </li>
        <li v-for="(artist, id) in previousGames" :key="id" class="relative mb-4 pl-7">
          <span class="absolute top-1 left-0">
            <span v-if="completed(artist.id)">✅</span>
            <span v-else>⚪️</span>
          </span>
          <NuxtLink
            :to="`/${artist.id}`"
            class="underline decoration-orange-600 decoration-2 hover:decoration-orange-900"
          >
            <small>{{ artist.date }}</small>
            <h4 class="text-md font-serif font-bold tracking-wide">{{ artist.name }}</h4>
          </NuxtLink>
        </li>
      </ol>

      <ol v-else reversed>
        <li v-for="(artist, id) in state.artists" :key="id" class="relative mb-4 pl-7">
          <span class="absolute top-1 left-0">
            <span v-if="completed(artist.id)">✅</span>
            <span v-else>⚪️</span>
          </span>
          <NuxtLink
            :to="`/${artist.id}`"
            class="underline decoration-orange-600 decoration-2 hover:decoration-orange-900"
          >
            <h4 class="text-md font-serif font-bold tracking-wide">{{ artist.name }}</h4>
          </NuxtLink>
        </li>
      </ol>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { Artist } from '@/data/types';

import { subDays, format, differenceInDays } from 'date-fns';

const state = reactive({
  artists: [] as Artist[],
});

const launchDate = new Date('2022-11-24T00:00:00');
const artistIndex = differenceInDays(Date.now(), launchDate) || 1;

const { artists, duration } = await $fetch(`/api/get-artists`);

state.artists = artists;

const searchInput = ref('');

console.log('query: ', duration);

const currentArtist = artists.find((a: Artist) => a.id === artistIndex);

const currentGame: any = {
  date: format(Date.now(), 'MM/dd/yyyy'),
  ...currentArtist,
};

const previousGames = computed(() => {
  let current = currentArtist.id - 1;
  let currentDate = new Date(Date.now());
  let prev: Array<any> = [];
  let subDay = 1;

  while (current >= 1) {
    const artist = artists.find((a: Artist) => a.id === current);
    if (artist) {
      let saveArtist = {
        date: format(subDays(currentDate, subDay), 'MM/dd/yyyy'),
        ...artist,
      };
      prev.push(saveArtist);
    }
    subDay++;
    current--;
  }
  return prev;
});

const completed = (gameIdx: number) => {
  const store = localStorage.getItem(gameIdx.toString());
  const played = !store ? false : JSON.parse(store)?.status !== 'complete' ? false : true;
  return played;
};

const handleInput = async () => {
  const { artists } = await $fetch(
    `/api/get-artists-by-name?id=${artistIndex}&name=${searchInput.value.toLocaleLowerCase()}`
  );

  state.artists = artists || [];
};
</script>

<style></style>
