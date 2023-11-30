import { defineStore } from 'pinia';
import type { Answer, Artist } from '@/data/types';

export const useGameStore = defineStore('game', {
  state: () => {
    return {
      hardMode: true,
      status: 'ready',
      artist: {
        id: 0,
        artistId: '',
        name: '',
      },
      answers: [] as Array<Answer>,
    };
  },
  actions: {
    setStatus(status: string) {
      if (status !== '') {
        this.status = status;
      }
    },
    setArtist(artist: Artist = { id: 0, artistId: '', name: '' }) {
      this.artist = artist;
    },
    initAnswer(a: Answer) {
      this.answers.push(a);
    },
    setAnswers(answers: Array<Answer> = []) {
      this.answers = answers;
    },
    setMode(mode: boolean = true) {
      this.hardMode = mode;
    },
  },
  getters: {
    score: (state) => {
      const scores = state.answers.filter((a) => a.score !== undefined).map((a) => a.score);
      if (!scores.length) {
        return '--';
      }
      return scores.reduce((a, b) => (a || 0) + (b || 0));
    },
  },
});
