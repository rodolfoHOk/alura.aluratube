import { NextApiRequest, NextApiResponse } from 'next';
import { ErrorResponseDTO } from '../../../model/dto/errorReponse';
import { supabase } from '../../../services/lib/supabaseClient';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { id } = req.query;
    const { data, error } = await supabase
      .from('video')
      .select('*')
      .eq('id', id)
      .single();
    if (error) {
      const errorResponse: ErrorResponseDTO = {
        status: 404,
        type: 'Not Found',
        message: error.details,
      };
      res.status(404).json(errorResponse);
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
