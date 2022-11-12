import { CreateVideoDTO } from '../model/dto/createVideo';
import { VideoModel } from '../model/video';
import { apiClient } from './lib/apiClient';

export class VideoService {
  static getAllVideos() {
    return apiClient
      .get<VideoModel[]>('/videos')
      .then((response) => response.data);
  }

  static getVideoById(id: number) {
    return apiClient
      .get<VideoModel>(`/videos/${id}`)
      .then((response) => response.data);
  }

  static createVideo(videoDto: CreateVideoDTO) {
    return apiClient
      .post<VideoModel>('/videos', videoDto)
      .then((response) => response.data);
  }
}
