<template>
  <div>
    <p class="mb-4">
      Playing past day’s games will not count towards your total scores or play streaks.
    </p>

    <template v-if="!artists.length">
      <p class="mb-4">The archive could not be loaded. Please try again later.</p>
    </template>
    <template v-else>
      <ol reversed>
        <li class="relative mb-4 pl-7">
          <span class="absolute top-1 left-0">
            <span v-if="completed(currentGame.id)">✅</span>
            <span v-else>⚪️</span>
          </span>
          <NuxtLink
            to="/"
            class="underline decoration-cyan-600 decoration-2 hover:decoration-cyan-900"
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
            class="underline decoration-cyan-600 decoration-2 hover:decoration-cyan-900"
          >
            <small>{{ artist.date }}</small>
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

const launchDate = new Date('2022-11-22T00:00:00');
const artistIndex = differenceInDays(Date.now(), launchDate) || 1;

const { artists, duration } = await $fetch(`/api/get-artists`);

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
</script>

<style></style>
