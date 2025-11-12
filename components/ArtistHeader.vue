<template>
  <div class="flex items-center py-4">
    <div class="text-center">
      <img
        v-if="props.image"
        :src="props.image"
        :alt="game.artist?.name"
        width="130"
        height="130"
        class="mx-auto rounded-lg"
      />
    </div>
    <div class="pl-4 text-left">
      <span class="text-sm italic text-zinc-400">{{ gameDate }}</span>
      <h2 class="mb-2 text-lg tracking-wide">
        <a
          v-if="game.status === 'complete'"
          :href="`https://open.spotify.com/artist/${game.artist.artistId}`"
          target="_blank"
          class="underline decoration-orange-600 decoration-2 underline-offset-2 hover:decoration-orange-900"
        >
          {{ gameTitle }}
        </a>
        <span v-else>
          {{ gameTitle }}
        </span>
      </h2>
      <p class="items-left flex">
        <span class="mr-2 p-1 font-black"> {{ game.score }}/{{ game.answers.length }} </span>
        <ButtonShare v-if="game.status === 'complete'" />
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/game';
import { subDays, format, differenceInDays, addDays } from 'date-fns';

const game = useGameStore();

const props = defineProps({
  image: {
    type: String,
    default: '',
  },
});

const htmlTitle = computed(() => {
  return `${game.artist?.name} on Top Fives - The Spotify Guessing Game`;
});

const launchDate = new Date('2022-11-24T00:00:00');
const gameDate = computed(() => {
  return format(addDays(launchDate, game.artist?.id), 'MMMM do, yyyy');
});

const gameTitle = computed(() => {
  return `#${game.artist?.id}: ${game.artist?.name}`;
});

useHead({
  title: htmlTitle.value,
});
</script>

<style></style>
