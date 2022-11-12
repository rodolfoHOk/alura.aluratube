import { FavoriteModel } from '../model/favorite';
import { apiClient } from './lib/apiClient';

export class FavoriteService {
  static getAllFavorites() {
    return apiClient
      .get<FavoriteModel[]>('/favorites')
      .then((response) => response.data);
  }
}
