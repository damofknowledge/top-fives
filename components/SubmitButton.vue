<template>
  <button
    type="button"
    @click="$emit('checkAll')"
    class="h-9 w-full rounded bg-orange-600 text-lg leading-none text-white enabled:hover:bg-orange-900 disabled:bg-transparent disabled:opacity-50"
    :disabled="game.status === 'complete'"
  >
    <font-awesome-icon
      v-if="game.status !== 'complete'"
      :icon="icons.unlock"
      class="align-middle"
    />
    <font-awesome-icon v-else :icon="icons.lock" class="align-middle" />
    <span class="ml-2 text-sm font-bold uppercase">
      {{ game.status !== 'complete' ? 'Submit' : 'Complete' }}
    </span>
  </button>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/game';
import { faLock, faUnlock, faNotdef } from '@fortawesome/free-solid-svg-icons';

const icons = {
  lock: faLock,
  unlock: faUnlock,
  missing: faNotdef,
};

const game = useGameStore();
</script>
