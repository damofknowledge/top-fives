<template>
  <button
    type="button"
    @click="$emit('preview', index)"
    class="h-9 w-9 rounded bg-cyan-600 text-lg text-white enabled:hover:bg-cyan-900 disabled:bg-transparent disabled:opacity-50"
    :disabled="!track.preview_url"
    ref="answerAudioControl"
  >
    <span class="sr-only" v-if="!track.preview_url"> A preview of this song is not available </span>
    <template v-else>
      <font-awesome-icon class="play" :icon="icons.play" />
      <font-awesome-icon class="stop" :icon="icons.stop" />
    </template>
    <span class="sr-only">
      <audio ref="answerAudio" :src="track.preview_url">
        <a :href="track.preview_url"> Preview {{ track.name }} </a>
      </audio>
    </span>
  </button>
</template>

<script setup lang="ts">
import { faMusic, faStop } from '@fortawesome/free-solid-svg-icons';

const icons = {
  play: faMusic,
  stop: faStop,
};

const props = defineProps({
  track: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});

const { track, index } = props;

const answerAudioControl = ref(null);
const answerAudio = ref(null);

const play = () => {
  let control = answerAudioControl?.value as unknown as HTMLButtonElement;
  let audio = answerAudio?.value as unknown as HTMLAudioElement;

  // toggle current control
  if (control.hasAttribute('data-playing')) {
    audio.pause();
    audio.currentTime = 0;
    control.removeAttribute('data-playing');
    return;
  }

  audio.play();
  control.setAttribute('data-playing', '');
};

const stop = () => {
  let control = answerAudioControl?.value as unknown as HTMLButtonElement;
  let audio = answerAudio?.value as unknown as HTMLAudioElement;

  audio.pause();
  audio.currentTime = 0;
  control.removeAttribute('data-playing');
};

defineExpose({
  play,
  stop,
});
</script>

<style>
button .play {
  display: var(--fa-display, inline-block);
}

button .stop {
  display: none;
}

button[data-playing] .play {
  display: none;
}

button[data-playing] .stop {
  display: var(--fa-display, inline-block);
}
</style>
