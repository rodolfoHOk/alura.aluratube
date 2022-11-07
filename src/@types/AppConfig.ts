export interface Video {
  title: string;
  url: string;
  thumb: string;
}

export interface PlayLists {
  jogos: Video[];
  'front-end': Video[];
  'back-end': Video[];
}

export interface AppConfig {
  name: string;
  job: string;
  github: string;
  playlists: PlayLists;
}
