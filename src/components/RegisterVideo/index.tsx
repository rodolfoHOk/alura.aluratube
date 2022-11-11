import { useEffect, useState } from 'react';
import { UseFormErrors, useForm } from '../../hooks/useForm';
import { Spinner } from '../Spinner';
import { StyledRegisterVideo } from './styles';

interface VideoDTO {
  title: string;
  url: string;
  thumb: string;
}

interface FormValues {
  title: string;
  url: string;
}

export function RegisterVideo() {
  const [show, setShow] = useState(false);
  const [thumb, setThumb] = useState('');

  const registerForm = useForm<FormValues>({
    initialValues: {
      title: '',
      url: '',
    },
    validate: (values) => {
      let errors: UseFormErrors<FormValues> = { title: '', url: '' };
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
      setTimeout(() => {
        const videoDTO: VideoDTO = {
          ...values,
          thumb,
        };
        console.log(videoDTO);
        clear();
        setIsSubmitting(false);
      }, 1000);
    },
  });

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
