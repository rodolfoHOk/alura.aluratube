import { NextApiRequest, NextApiResponse } from 'next';
import { ErrorResponseDTO } from '../../../model/dto/errorReponse';
import { supabase } from '../../../services/lib/supabaseClient';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('favorite')
      .select('*')
      .order('id');
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
