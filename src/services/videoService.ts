import { supabase } from './lib/supabaseClient';

export function videoService() {
  return {
    getAllVideos() {
      return supabase.from('video').select('*');
    },
  };
}
