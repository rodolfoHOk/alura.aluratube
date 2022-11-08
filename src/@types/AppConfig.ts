export interface Video {
  title: string;
  url: string;
  thumb: string;
}

export interface GithubPerson {
  username: string;
}

export interface PlayLists {
  jogos: Video[];
  'front-end': Video[];
  'back-end': Video[];
}

export interface AppConfig {
  name: string;
  job: string;
  banner: string;
  github: string;
  playlists: PlayLists;
  favorites: GithubPerson[];
}
