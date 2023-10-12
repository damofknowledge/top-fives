<template>
  <div class="leading-6">
    <h3 class="text-md mb-4 font-serif font-extrabold tracking-wide">What is This?</h3>

    <p class="mb-4">
      Top Fives is a daily game that challenges you to guess a musical artist’s most popular songs,
      as told by Spotify.
      <strong
        >Important to note: an artist’s most popular songs are often, but not always, their most
        played.</strong
      >
      For example, songs off a new album from a popular artist may currently be trending and place
      higher than greatest hits.
    </p>

    <h3 class="text-md mb-4 font-serif font-extrabold tracking-wide">How to Play?</h3>

    <p class="mb-4">
      Fill in the form with your guesses of songs from the artist, <strong>#1</strong> being the
      most popular, <strong>#5</strong> being less so.
    </p>

    <p class="mb-4">
      When you are satisfied with your guesses and order enter them in by clicking the
      <button
        type="button"
        class="h-9 w-auto rounded bg-cyan-600 px-2 text-lg leading-none text-white"
        disabled
        aria-label="Submit button"
      >
        <font-awesome-icon :icon="icons.unlock" class="align-middle" />
        <span class="ml-2 text-sm font-bold uppercase"> Submit </span>
      </button>
      button at the bottom.
    </p>

    <h3 class="text-md mb-4 font-serif font-extrabold tracking-wide">Scoring</h3>

    <p class="mb-4">🟩 = <strong>1 point</strong>, woo! You put the song in its correct place.</p>

    <p class="mb-4">
      🟨 = <strong>½ point</strong>, the song is in the top five, but you’ve guessed it in the wrong
      spot, try it elsewhere!
    </p>

    <p class="mb-4">
      ⬜️ = <strong>0 points</strong>, you may like this song but the algorithm disagrees on its
      popularity.
    </p>

    <h3 class="text-md mb-4 font-serif font-extrabold tracking-wide">
      Autocomplete is Your Friend
    </h3>

    <p class="mb-4">
      Never heard of this artist, or can’t quite think of that one song’s name (“something breakup
      something Taylor’s Version?”)? Use the dropdown of suggestions that appears when you start
      typing. Correct spelling and exact punctuation are required so don’t go rogue and type it all
      out yourself.
    </p>

    <p class="mb-4">
      Top Fives saves your number of games played, scores, and max play streak in your browser.
      There is currently no way to transfer your stats to another device or save them to an account.
      If you erase your browser’s history and storage your stats will be lost 🤷🏻‍♂️.
    </p>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/game';
import { faUnlock } from '@fortawesome/free-solid-svg-icons';

const icons = {
  unlock: faUnlock,
};

const game = useGameStore();

const setMode = (value: boolean) => {
  game.setMode(value);
  localStorage.setItem('hardMode', `${value ? '1' : '0'}`);
};
</script>

<style></style>
