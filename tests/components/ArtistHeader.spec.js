import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import ArtistHeader from '@/components/ArtistHeader.vue';
import { createTestingPinia } from '@pinia/testing';
import { useGameStore } from '@/stores/game';

const mockProps = {
  image: 'test-image.jpg',
};

const wrapper = mount(ArtistHeader, {
  global: {
    plugins: [createTestingPinia()],
  },
  props: mockProps,
});

const game = useGameStore();

describe('ArtistHeader.vue', () => {
  beforeEach(() => {
    game.status = 'incomplete';
    game.artist = {
      name: 'Test Artist',
      artistId: '12345',
    };
  });

  it('exists', () => {
    expect(wrapper.html()).toBeTruthy();
  });

  it('renders an image if props.image is provided', () => {
    expect(wrapper.find('img').exists()).toBe(true);
    expect(wrapper.find('img').attributes('src')).toBe(mockProps.image);
  });

  it('renders artist name as alt text for image', () => {
    expect(wrapper.find('img').attributes('alt')).toBe(game.artist.name);
  });

  it('does not render a link to the artist on Spotify if game status is not complete', async () => {
    expect(wrapper.find('a').exists()).toBe(false);
  });

  it('renders a link to the artist on Spotify if game status is complete', async () => {
    await game.$patch({ status: 'complete' });
    expect(wrapper.find('a').exists()).toBe(true);
    expect(wrapper.find('a').attributes('href')).toBe(
      `https://open.spotify.com/artist/${game.artist.artistId}`
    );
  });
});
