import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../services/lib/supabaseClient';
import { videoService } from '../../../services/videoService';

export interface ErrorResponseModel {
  status: number;
  type: string;
  message: string;
}

export interface PlaylistModel {
  id: number;
  name: string;
  created_at: Date;
}

export interface VideoModel {
  id: number;
  title: string;
  url: string;
  thumb: string;
  playlist_id: number;
  created_at: Date;
}

export interface CreateVideoDTO {
  title: string;
  url: string;
  thumb: string;
  playlist_id: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const service = videoService();
  if (req.method === 'POST') {
    const createVideoDTO: CreateVideoDTO = req.body;
    const { data, error } = await supabase.from('video').insert(createVideoDTO);
    if (error) {
      const errorResponse: ErrorResponseModel = {
        status: 400,
        type: 'Bad Request',
        message: error.details,
      };
      res.status(400).json(errorResponse);
    } else {
      res.status(201).json(data);
    }
  } else if (req.method === 'GET') {
    const { data, error } = await service.getAllVideos();
    if (error) {
      const errorResponse: ErrorResponseModel = {
        status: 500,
        type: 'Internal Server Error',
        message: error.details,
      };
      res.status(500).json(errorResponse);
    } else {
      res.status(200).json(data);
    }
  } else {
    const errorResponse: ErrorResponseModel = {
      status: 405,
      type: 'Method Not Allowed',
      message: 'Method Not Allowed',
    };
    res.status(405).json(errorResponse);
  }
}
