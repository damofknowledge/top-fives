<template>
  <div class="leading-6">
    <h3 class="text-md mb-4 font-serif font-extrabold tracking-wide">About</h3>

    <p class="mb-4">
      Top Fives was born in a wood-paneled, Taylor, Michigan basement on October 16th, 2022.
      <a
        href="https://ko-fi.com/P5P8GC2A3"
        target="_blank"
        class="underline decoration-cyan-600 decoration-2 hover:decoration-cyan-900"
        >If you’ve enjoyed playing please consider supporting this work and my cold brew habit on
        <strong>ko-fi</strong>.</a
      >
    </p>

    <p class="mb-4">
      Contact or feedback:
      <a
        href="mailto:topfivesfyi@gmail.com"
        class="underline decoration-cyan-600 decoration-2 hover:decoration-cyan-900"
        >TopFivesFYI@gmail.com</a
      >
    </p>

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

    <p>
      A funemployment project by
      <a
        href="https://github.com/damofknowledge"
        class="underline decoration-cyan-600 decoration-2 hover:decoration-cyan-900"
      >
        @DamOfKnowledge </a
      >.
    </p>
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
