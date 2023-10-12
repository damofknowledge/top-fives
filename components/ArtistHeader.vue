<template>
  <div class="flex items-center py-4">
    <div class="text-center">
      <img
        v-if="props.image"
        :src="props.image"
        :alt="game.artist?.name"
        width="160"
        height="160"
        class="mx-auto rounded-lg"
      />
    </div>
    <div class="pl-4 text-left">
      <h2 class="mb-2 text-lg tracking-wide">
        <a
          v-if="game.status === 'complete'"
          :href="`https://open.spotify.com/artist/${game.artist.artistId}`"
          target="_blank"
          class="underline decoration-cyan-600 decoration-2 underline-offset-2 hover:decoration-cyan-900"
        >
          {{ game.artist?.name }}
        </a>
        <span v-else>
          {{ game.artist?.name }}
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

const game = useGameStore();

const props = defineProps({
  image: {
    type: String,
    default: '',
  },
});
</script>

<style></style>
