import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  SyntheticEvent,
  useEffect,
  useState,
} from 'react';

export type UseFormErrors<T> = {
  [K in keyof T]: string;
};

interface UseFormData<T> {
  initialValues: T;
  validate?: (values: T) => UseFormErrors<T>;
  onSubmit: (
    values: T,
    clear: () => void,
    setIsSubmitting: Dispatch<SetStateAction<boolean>>
  ) => void;
}

export function useForm<T>({
  initialValues,
  validate,
  onSubmit,
}: UseFormData<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<UseFormErrors<T> | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const fieldName = event.target.name;
    setValues({ ...values, [fieldName]: event.target.value });
  };

  const clear = () => setValues(initialValues);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    if (validate) {
      setErrors(validate(values));
    } else {
      setErrors(null);
    }
  };

  useEffect(() => {
    if (isSubmitting) {
      let hasError = false;
      for (let error in errors) {
        if (errors[error] !== '') {
          hasError = true;
        }
      }
      if (!hasError) {
        onSubmit(values, clear, setIsSubmitting);
      } else {
        setIsSubmitting(false);
      }
    }
  }, [errors]);

  return {
    values,
    handleChange,
    clear,
    errors,
    handleSubmit,
    isSubmitting,
  };
}
