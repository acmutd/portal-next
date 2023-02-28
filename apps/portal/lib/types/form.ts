import type { FieldValues, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';

export interface ReactHookFormProps<T extends FieldValues> {
  handleSubmit: UseFormHandleSubmit<T>;
  register: UseFormRegister<T>;
}
