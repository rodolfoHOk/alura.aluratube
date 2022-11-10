import { ChangeEvent, useState } from 'react';

interface UseFormData<T> {
  initialValues: T;
}

export function useForm<T>({ initialValues }: UseFormData<T>) {
  const [values, setValues] = useState(initialValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fieldName = event.target.name;
    setValues({ ...values, [fieldName]: event.target.value });
  };

  const clear = () => setValues(initialValues);

  return { values, handleChange, clear };
}
