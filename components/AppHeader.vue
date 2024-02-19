<template>
  <div class="bg-slate-800">
    <header class="container mx-auto flex items-center py-1 px-2">
      <div class="mr-3 grow-0">
        <NuxtLink to="/">
          <img
            src="/images/top-fives-logo.svg"
            alt="Top Fives Home"
            height="32"
            width="32"
            loading="lazy"
          />
        </NuxtLink>
      </div>
      <div class="grow">
        <h1 class="font-serif text-xl font-extrabold tracking-wide">Top Fives</h1>
      </div>

      <button
        type="button"
        data-testid="help-button"
        @click="openModal('help')"
        class="h-9 w-9 rounded text-xl text-white hover:opacity-75 focus:opacity-75"
      >
        <font-awesome-icon :icon="icons.help" class="h-5 w-5" />
        <span class="sr-only">How to Play</span>
      </button>

      <button
        type="button"
        data-testid="stats-button"
        @click="openModal('stats')"
        class="h-9 w-9 rounded text-xl text-white hover:opacity-75 focus:opacity-75"
      >
        <font-awesome-icon :icon="icons.stats" class="h-5 w-5" />
        <span class="sr-only">Stats</span>
      </button>

      <button
        type="button"
        data-testid="archive-button"
        @click="openModal('archive')"
        class="h-9 w-9 rounded text-xl text-white hover:opacity-75 focus:opacity-75"
      >
        <font-awesome-icon :icon="icons.archive" class="h-5 w-5" />
        <span class="sr-only">Archive</span>
      </button>
    </header>
    <div class="bg-cyan-900">
      <p class="container mx-auto px-2 text-sm font-light italic">
        <small> The Daily Spotify Popularity Guessing Game </small>
      </p>
    </div>
    <ModalPopup v-if="state.modalName === 'help' && state.modalIsOpen" @close-modal="closeModal()">
      <template v-slot:title>Help</template>
      <template v-slot:content><ModalHelp /></template>
    </ModalPopup>
    <ModalPopup v-if="state.modalName === 'stats' && state.modalIsOpen" @close-modal="closeModal()">
      <template v-slot:title>Statistics</template>
      <template v-slot:content><ModalStats /></template>
    </ModalPopup>
    <ModalPopup
      v-if="state.modalName === 'archive' && state.modalIsOpen"
      @close-modal="closeModal()"
    >
      <template v-slot:title>Archive</template>
      <template v-slot:content><ModalArchive /></template>
    </ModalPopup>
  </div>
</template>

<script setup lang="ts">
import { faCircleQuestion, faChartBar, faCalendarDays } from '@fortawesome/free-solid-svg-icons';

const route = useRoute();

const state = reactive({
  modalIsOpen: false,
  modalName: '',
});

const icons = {
  help: faCircleQuestion,
  stats: faChartBar,
  archive: faCalendarDays,
};

const openModal = (name: string = '') => {
  state.modalName = name;
  state.modalIsOpen = true;
};

const closeModal = () => {
  state.modalIsOpen = false;
};

watch(
  () => route.params.game,
  () => closeModal()
);

onMounted(async () => {
  const gameVersion = localStorage.getItem('t5');

  // Total reset of local data for Game v3
  if (gameVersion === null) {
    for (let i = 1; i <= 454; i++) {
      localStorage.removeItem(i.toString());
    }
    localStorage.removeItem('stats');
    localStorage.removeItem('new');
    localStorage.setItem('t5', '3');
  }

  const showInstructions = localStorage.getItem('new');
  if (showInstructions === null) {
    openModal('help');
    localStorage.setItem('new', '0');
  }
});
</script>

<style>
/* .modal {} */
</style>
