<template>
  <div id="app" class="min-h-screen bg-slate-900 text-neutral-50" :class="gameClass">
    <LinkSkip />
    <AppHeader />
    <main id="main-content" tabindex="-1" class="mb-1">
      <NuxtPage />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
// import LogRocket from 'logrocket';
import { useWindowSize } from '@vueuse/core';
import { useGameStore } from '@/stores/game';
// LogRocket.init('gxk2oi/top-fives');
const game = useGameStore();
const { height } = useWindowSize();

const gameClass = computed(() => {
  return game.artist?.id ? `game-${game.artist?.id}` : '';
});

useHead({
  htmlAttrs: {
    class: 'bg-slate-900',
    style: () => {
      return `--doc-height: ${height.value}px`;
    },
  },
});
</script>
<style>
:root {
  --doc-height: 100%;
}

main {
  min-height: calc(100vh - 125px);
  min-height: calc(var(--doc-height) - 125px);
}
</style>
