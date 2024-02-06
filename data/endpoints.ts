const SPOTIFY_BASE = 'https://api.spotify.com/v1';

export default {
  artists: `${SPOTIFY_BASE}/artists`,
  topTracks: `top-tracks?market=US`,
  artistAlbums: `albums?market=US&include_groups=album&limit=50`,
  albums: `${SPOTIFY_BASE}/albums`,
};
