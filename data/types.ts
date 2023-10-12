export interface Artist {
  id: number;
  artistId: string;
  name: string;
}

export interface Answer {
  value: string;
  score: number | undefined;
  error: string;
}

export interface Track {
  name: string;
  album: {
    name: string;
  };
  popularity: number;
  preview_url: string;
}

export interface Distributions {
  [key: number]: number;
}
