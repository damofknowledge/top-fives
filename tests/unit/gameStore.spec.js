import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useGameStore } from '@/stores/game';

describe('game store', () => {
  const store = useGameStore();

  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('sets status', () => {
    store.setStatus('playing');
    expect(store.status).toBe('playing');
  });

  it('does not set status if empty string', () => {
    store.setStatus('ready');
    store.setStatus('');
    expect(store.status).toBe('ready');
  });

  it('sets artist', () => {
    const artist = { id: 1, artistId: '123', name: 'Test Artist' };
    store.setArtist(artist);
    expect(store.artist).toEqual(artist);
  });

  it('sets answers', () => {
    const answers = [
      { id: 1, score: 10 },
      { id: 2, score: 20 },
    ];
    store.setAnswers(answers);
    expect(store.answers).toEqual(answers);
  });

  it('sets mode', () => {
    store.setMode(false);
    expect(store.hardMode).toBe(false);
  });

  it('calculates score', () => {
    const answers = [
      { id: 1, score: 10 },
      { id: 2, score: 20 },
    ];
    store.setAnswers(answers);
    expect(store.score).toBe(30);
  });

  it('returns "--" if no scores', () => {
    store.setAnswers([]);
    expect(store.score).toBe('--');
  });
});
