import { FavoriteModel } from '../model/favorite';
import { apiClient } from './lib/apiClient';

export class FavoriteService {
  static getAllFavorites() {
    return apiClient
      .get<FavoriteModel[]>('/favorites')
      .then((response) => response.data);
  }

  static getFavoriteById(id: number) {
    return apiClient
      .get<FavoriteModel>(`/favorites/${id}`)
      .then((response) => response.data);
  }
}
