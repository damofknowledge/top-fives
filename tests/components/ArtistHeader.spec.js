import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import ArtistHeader from '@/components/ArtistHeader.vue';

describe.skip('ArtistHeader.vue', () => {
  let wrapper;
  let mockProps = {
    image: 'test-image.jpg',
    game: {
      status: 'complete',
      artist: {
        name: 'Test Artist',
        artistId: '12345',
      },
    },
  };

  beforeEach(() => {
    mockProps = {
      image: 'test-image.jpg',
      game: {
        status: 'complete',
        artist: {
          name: 'Test Artist',
          artistId: '12345',
        },
      },
    };
    wrapper = mount(ArtistHeader, {
      shallow: true,
      propsData: mockProps,
    });
  });

  it('renders an image if props.image is provided', () => {
    console.log(wrapper.html());
    expect(wrapper.find('img').exists()).toBe(true);
    expect(wrapper.find('img').attributes('src')).toBe(mockProps.image);
  });

  it('renders artist name as alt text for image', () => {
    expect(wrapper.find('img').attributes('alt')).toBe(mockProps.game.artist.name);
  });

  it('renders a link to the artist on Spotify if game status is complete', () => {
    expect(wrapper.find('a').exists()).toBe(true);
    expect(wrapper.find('a').attributes('href')).toBe(
      `https://open.spotify.com/artist/${mockProps.game.artist.artistId}`
    );
  });

  it('does not render a link to the artist on Spotify if game status is not complete', async () => {
    await wrapper.setProps({
      game: {
        status: 'incomplete',
        artist: mockProps.game.artist,
      },
    });
    expect(wrapper.find('a').exists()).toBe(false);
  });
});
