<template>
  <div id="app" class="min-h-screen text-neutral-50" :class="{ gameClass, 'bg-slate-900': game.artist?.id !== gameTrigger }" @click="play()">
    <LinkSkip />
    <AppHeader />
    <main id="main-content" tabindex="-1" class="mb-1">
      <NuxtPage />
    </main>
    <AppFooter />
    
    <div ref="video" class="yt-player" :style="{ 'display': game.artist?.id !== gameTrigger ? 'none' : 'block' }" />
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

const gameTrigger = 1000; // artist ID to trigger the background video
const video = ref();
const player = ref(null);
const { onLoaded } = useScriptYouTubePlayer();

function onPlayerStateChange(event) {
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
  position: absolute !important;
  top: 0;
  left: 0;
  height: 200vh;
  z-index: -1;
  width: 200vw;
  transform: translate3d(-50vw, -50vh, 0);
}

</style>
