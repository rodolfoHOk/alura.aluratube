import { PlaylistModel } from '../model/playlist';
import { apiClient } from './lib/apiClient';

export class PlaylistService {
  static getAllPlaylists() {
    return apiClient
      .get<PlaylistModel[]>('/playlists')
      .then((response) => response.data);
  }
}
