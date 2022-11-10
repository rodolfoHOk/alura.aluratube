import { useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { StyledRegisterVideo } from './styles';

interface FormValues {
  title: string;
  url: string;
}

export function RegisterVideo() {
  const [show, setShow] = useState(false);

  const initialValues: FormValues = {
    title: '',
    url: '',
  };
  const registerForm = useForm<FormValues>({
    initialValues,
  });

  return (
    <StyledRegisterVideo>
      <button className="add-video" onClick={() => setShow(true)}>
        +
      </button>

      {show && (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            console.log(registerForm.values);
            registerForm.clear();
            setShow(false);
          }}
        >
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

            <input
              type="text"
              name="url"
              placeholder="URL do vídeo"
              value={registerForm.values.url}
              onChange={registerForm.handleChange}
            />

            <button type="submit">Cadastrar</button>
          </div>
        </form>
      )}
    </StyledRegisterVideo>
  );
}
