<template>
  <div class="leading-6">
    <h3 class="text-md mb-4 font-serif font-extrabold tracking-wide">Release Notes</h3>

    <ul class="list-disc px-4">
      <li class="mb-2">v2.1.0: Hard Mode enabled for all, settings removed</li>
      <li class="mb-2">v2.0.0: Game data added, dependencies updated, Yarn 3, Node 20</li>
      <li class="mb-2">v1.9.0: Google Analytics added</li>
      <li class="mb-2">v1.8.0: Improves/nerfs autocomplete searching</li>
      <li class="mb-2">v1.7.0: Adds Hard Mode</li>
      <li class="mb-2">v1.6.1: Scoring fix for different versions of songs</li>
      <li class="mb-2">v1.6.0: Style updates, Hard Mode work in progress</li>
      <li class="mb-2">
        v1.5.0: 🐛 fix for Lil Nas X hint, scoring updates for similar song titles
      </li>
      <li class="mb-2">v1.4.0: Info and release notes added</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/game';

const game = useGameStore();

const setMode = (value: boolean) => {
  game.setMode(value);
  localStorage.setItem('hardMode', `${value ? '1' : '0'}`);
};
</script>

<style></style>
