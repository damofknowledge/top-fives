import { describe, it, expect } from 'vitest';
import { artists } from '../../data/game';

describe('Artists array', () => {
  it('should have a length greater than 0', () => {
    expect(artists.length).toBeGreaterThan(0);
  });

  it('should contain objects with id, artistId, and name properties', () => {
    artists.forEach(artist => {
      expect(artist).toHaveProperty('id');
      expect(artist).toHaveProperty('artistId');
      expect(artist).toHaveProperty('name');
    });
  });

  it('should have id as number, artistId and name as string', () => {
    artists.forEach(artist => {
      expect(typeof artist.id).toBe('number');
      expect(typeof artist.artistId).toBe('string');
      expect(typeof artist.name).toBe('string');
    });
  });
});