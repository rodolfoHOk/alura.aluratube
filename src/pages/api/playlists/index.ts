import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../services/lib/supabaseClient';
import { ErrorResponseModel } from '../videos';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('playlist')
      .select('*')
      .order('id');
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
