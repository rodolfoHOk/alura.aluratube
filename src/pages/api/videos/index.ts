import { NextApiRequest, NextApiResponse } from 'next';
import { CreateVideoDTO } from '../../../model/dto/createVideo';
import { ErrorResponseDTO } from '../../../model/dto/errorReponse';
import { supabase } from '../../../services/lib/supabaseClient';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const createVideoDTO: CreateVideoDTO = req.body;
    const { data, error } = await supabase.from('video').insert(createVideoDTO);
    if (error) {
      const errorResponse: ErrorResponseDTO = {
        status: 400,
        type: 'Bad Request',
        message: error.details,
      };
      res.status(400).json(errorResponse);
    } else {
      res.status(201).json(data);
    }
  } else if (req.method === 'GET') {
    const { data, error } = await supabase.from('video').select('*');
    if (error) {
      const errorResponse: ErrorResponseDTO = {
        status: 500,
        type: 'Internal Server Error',
        message: error.details,
      };
      res.status(500).json(errorResponse);
    } else {
      res.status(200).json(data);
    }
  } else {
    const errorResponse: ErrorResponseDTO = {
      status: 405,
      type: 'Method Not Allowed',
      message: 'Method Not Allowed',
    };
    res.status(405).json(errorResponse);
  }
}
