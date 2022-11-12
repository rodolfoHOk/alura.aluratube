import { useEffect, useState } from 'react';
import { StyledRegisterVideo } from './styles';
import { Spinner } from '../Spinner';
import { UseFormErrors, useForm } from '../../hooks/useForm';
import { PlaylistModel } from '../../model/playlist';
import { CreateVideoDTO } from '../../model/dto/createVideo';
import { VideoService } from '../../services/VideoService';
import { PlaylistService } from '../../services/PlaylistService';

interface FormValues {
  playlist_id: number;
  title: string;
  url: string;
}

export function RegisterVideo() {
  const [show, setShow] = useState(false);
  const [playlists, setPlaylists] = useState<PlaylistModel[]>([]);
  const [thumb, setThumb] = useState('');

  const registerForm = useForm<FormValues>({
    initialValues: {
      playlist_id: 0,
      title: '',
      url: '',
    },
    validate: (values) => {
      let errors: UseFormErrors<FormValues> = {
        playlist_id: '',
        title: '',
        url: '',
      };
      if (values.playlist_id === 0) {
        errors.playlist_id = 'selecione uma playlist';
      }
      if (values.title.trim() === '') {
        errors.title = 'título é obrigatório';
      } else if (values.title.length < 3) {
        errors.title = 'título deve conter ao menos 3 caracteres';
      }
      if (values.url.trim() === '') {
        errors.url = 'url é obrigatória';
      } else if (values.url.length < 6) {
        errors.url = 'url deve conter ao menos 6 caracteres';
      }
      return errors;
    },
    onSubmit: (values, clear, setIsSubmitting) => {
      const videoDTO: CreateVideoDTO = {
        ...values,
        thumb,
        playlist_id: Number(values.playlist_id),
      };

      VideoService.createVideo(videoDTO);

      clear();
      setIsSubmitting(false);
      setShow(false);
    },
  });

  useEffect(() => {
    PlaylistService.getAllPlaylists().then((data) => setPlaylists(data));
  }, []);

  useEffect(() => {
    const url = registerForm.values.url;
    if (url.includes('youtube.com')) {
      const [_, videoId] = url.split('/watch?v=');
      setThumb(`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`);
    } else {
      setThumb('');
    }
  }, [registerForm.values.url]);

  return (
    <StyledRegisterVideo>
      <button className="add-video" onClick={() => setShow(true)}>
        +
      </button>

      {show && (
        <form onSubmit={registerForm.handleSubmit}>
          <div>
            <button
              type="button"
              className="close-modal"
              onClick={() => setShow(false)}
            >
              x
            </button>

            <h2>Adicionar novo vídeo</h2>

            <select
              name="playlist_id"
              id="playlist_id"
              defaultValue={0}
              onChange={registerForm.handleChange}
            >
              <option value={0} disabled selected>
                Selecione uma playlist...
              </option>
              {playlists.map((playlist) => (
                <option key={playlist.id} value={playlist.id}>
                  {playlist.name}
                </option>
              ))}
            </select>
            {registerForm.errors?.playlist_id && (
              <span>{registerForm.errors.playlist_id}</span>
            )}

            <input
              type="text"
              name="title"
              placeholder="Título do vídeo"
              value={registerForm.values.title}
              onChange={registerForm.handleChange}
            />
            {registerForm.errors?.title && (
              <span>{registerForm.errors.title}</span>
            )}

            <input
              type="text"
              name="url"
              placeholder="URL do vídeo"
              value={registerForm.values.url}
              onChange={registerForm.handleChange}
            />
            {registerForm.errors?.url && <span>{registerForm.errors.url}</span>}

            {thumb && <img src={thumb} alt="video image preview" />}

            <button type="submit" disabled={registerForm.isSubmitting}>
              Cadastrar
              {registerForm.isSubmitting && <Spinner />}
            </button>
          </div>
        </form>
      )}
    </StyledRegisterVideo>
  );
}
