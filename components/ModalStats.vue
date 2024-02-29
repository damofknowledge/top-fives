<template>
  <div>
    <div class="mb-4 flex">
      <div class="flex-auto text-center">
        <h3 class="mb-1 font-serif text-xl font-extrabold tracking-wide">
          {{ state.stats.playCount }}
        </h3>
        <span class="block text-xs uppercase">Games Played</span>
      </div>
      <div class="flex-auto text-center">
        <h3 class="mb-1 font-serif text-xl font-extrabold tracking-wide">
          {{ state.stats.playStreak }}
        </h3>
        <span class="block text-xs uppercase">Current Streak</span>
      </div>
      <div class="flex-auto text-center">
        <h3 class="mb-1 font-serif text-xl font-extrabold tracking-wide">
          {{ state.stats.maxStreak }}
        </h3>
        <span class="block text-xs uppercase">Max Streak</span>
      </div>
    </div>

    <h3 class="text-md mb-4 font-serif font-extrabold tracking-wide">🎯 Distributions</h3>

    <p
      class="mb-2 text-sm text-slate-300 underline decoration-cyan-900 decoration-dotted underline-offset-2"
    >
      The number of times you correctly guessed the song and its popularity.
    </p>

    <ol class="mb-8">
      <li
        v-for="(correct, i) in state.stats.correctDistribution"
        :key="i"
        class="relative mb-2 align-middle leading-none"
      >
        <span
          v-if="correct"
          class="bar absolute top-0 left-1 z-0 h-full rounded"
          :class="{ 'bg-green-600': correct }"
          :style="`width: ${(correct / state.stats.playCount) * 100 <= 15 ? 15 : (correct / state.stats.playCount) * 100}%`"
        >
          <span class="absolute right-2 top-0 text-xs">{{ correct }}</span>
        </span>
        <span v-else class="bar absolute top-0 left-1 z-0 h-full w-9 rounded">
          <span class="absolute right-2 top-0 text-xs">{{ correct }}</span>
        </span>
        <span class="relative z-10">{{ emojiNumber(i - 1) }}</span>
      </li>
    </ol>

    <p class="mb-2" aria-label="reset">
      Use the <strong>Reset All Saved Games</strong> button to clear all game data on your device.
    </p>

    <p>
      <button
        type="button"
        aria-labelledby="reset"
        @click="hardReset()"
        class="rounded-lg bg-red-600 p-1 px-2 text-sm w-full font-bold uppercase transition hover:bg-red-900 focus:bg-red-900"
      >
        <span>Reset All Saved Games</span>
      </button>
    </p>
  </div>
</template>

<script setup lang="ts">
const emojiNumbers = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣'];

const emojiNumber = (idx: number) => {
  return emojiNumbers[idx];
};

const state = reactive({
  stats: {
    correctDistribution: {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    },
    maxStreak: 0,
    playStreak: 0,
    totalScore: 0,
    playCount: 0,
  },
});

const hardReset = () => {
  localStorage.clear();
  reloadNuxtApp();
};

onMounted(() => {
  const store = localStorage.getItem('stats');
  const stats = store ? JSON.parse(store) : false;
  if (stats) {
    state.stats = stats;
  }
});
</script>

<style></style>
