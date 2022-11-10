import { useState } from 'react';
import { UseFormErrors, useForm } from '../../hooks/useForm';
import { StyledRegisterVideo } from './styles';

interface FormValues {
  title: string;
  url: string;
}

export function RegisterVideo() {
  const [show, setShow] = useState(false);

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
        console.log(values);
        clear();
        setIsSubmitting(false);
      }, 1000);
    },
  });

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

            <button type="submit" disabled={registerForm.isSubmitting}>
              Cadastrar
            </button>
          </div>
        </form>
      )}
    </StyledRegisterVideo>
  );
}
