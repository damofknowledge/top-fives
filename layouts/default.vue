<template>
  <div id="app" class="min-h-screen text-neutral-50" :class="{ gameClass, 'bg-zinc-900': game.artist?.id !== gameTrigger }" @click="play()">
    <LinkSkip />
    <AppHeader />
    <main id="main-content" tabindex="-1" class="mb-1">
      <NuxtPage />
    </main>
    
    <div ref="video" class="yt-player" :style="{ 'display': game.artist?.id !== gameTrigger ? 'none' : 'block' }" />
  </div>
  <SpeedInsights />
</template>

<script setup lang="ts">
import { useWindowSize } from '@vueuse/core';
import { useGameStore } from '@/stores/game';
import { SpeedInsights } from "@vercel/speed-insights/nuxt";

const game = useGameStore();
const { height } = useWindowSize();

const gameClass = computed(() => {
  return game.artist?.id ? `game-${game.artist?.id}` : '';
});

useHead({
  htmlAttrs: {
    class: 'bg-zinc-900',
    style: () => {
      return `--doc-height: ${height.value}px`;
    },
  },
});

const gameTrigger = 1000; // artist ID to trigger the background video
const video = ref();
const player = ref(null);
const { onLoaded } = useScriptYouTubePlayer({});

function onPlayerStateChange(event: any) {
  if (event.data === YT.PlayerState.ENDED) {
    play();
  }
}

function play() {
  if (game.artist?.id !== gameTrigger) // only play for the default background
    return;
  player.value?.playVideo();
}

watch(game, (newValue) => {
  if (newValue?.artist?.id === gameTrigger && !player.value) {
    // reinitialize the player
    onLoaded(async ({ YT }) => {
      const YouTube = await YT;
      player.value = new YouTube.Player(video.value, {
        videoId: 'Cx4wY7iBE2s',
        playerVars: {
          autoplay: 1,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          loop: 1,
        },
        events: {
          'onStateChange': onPlayerStateChange,
        },
      });
    });
  }
}, { immediate: true, deep: true });

onMounted(() => {
  // workaround for mobile browsers that don't allow autoplay with sound
  document.addEventListener('touchstart', play, { once: true });
});
</script>

<style>
:root {
  --doc-height: 100%;
}


.app {
  position: relative;
  z-index: 0;
}

main {
  min-height: calc(100vh - 125px);
  min-height: calc(var(--doc-height) - 125px);
}

.yt-player {
  height: 100vh;
  left: 0;
  position: absolute !important;
  top: 0;
  width: 100vw;
  z-index: -1;
}

</style>
