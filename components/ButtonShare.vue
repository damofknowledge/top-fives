<template>
  <button
    type="button"
    @click="isSupported ? share({ text: textToShare }) : copy(textToShare)"
    class="rounded-lg bg-cyan-600 p-1 px-2 text-sm font-bold uppercase transition hover:bg-cyan-900 focus:bg-cyan-900"
  >
    <span v-if="!copied">Share</span>
    <span v-else>Copied!</span>
  </button>
</template>

<script setup lang="ts">
import { useClipboard, useShare } from '@vueuse/core';

import { useGameStore } from '@/stores/game';

const game = useGameStore();

const emojiNumbers = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣'];

const { copy, copied } = useClipboard();
const { share, isSupported } = useShare();

const generateEmojiGrid = () => {
  let scoreText = '';
  game.answers.forEach((a, i) => {
    scoreText += `${emojiNumbers[i]} `;
    switch (a.score) {
      case 1:
        scoreText += '🟩';
        break;
      case 0.5:
        scoreText += '🟨';
        break;
      default:
        scoreText += '⬜️';
        break;
    }
    scoreText += '\n';
  });
  return scoreText;
};

const textToShare = computed(() => {
  return (
    `Top Fives #${game.artist?.id} ${game.artist.name} ${game.score}/${game.answers.length}}\n\n` +
    `${generateEmojiGrid()}\n` +
    `https://topfives.fyi`
  );
});
</script>
