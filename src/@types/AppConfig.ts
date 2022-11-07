export interface Video {
  title: string;
  url: string;
  thumb: string;
}

export interface PlayLists {
  games: Video[];
  frontend: Video[];
}

export interface AppConfig {
  name: string;
  job: string;
  github: string;
  playlists: PlayLists;
}
