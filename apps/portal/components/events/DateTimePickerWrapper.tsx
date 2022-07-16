import { JSXElementConstructor, ReactElement, useEffect, useState } from 'react';
import { DateTimePicker } from '@mui/x-date-pickers';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { TextFieldProps } from '@mui/material';

// DateTimePickerWrapper.tsx
interface DateTimePickerWrapperProps {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  name: string;
  label: string;
  renderInput: (props: TextFieldProps) => ReactElement<any, string | JSXElementConstructor<any>>;
}

export default function DateTimePickerWrapper({
  register,
  setValue,
  name,
  renderInput,
  label,
}: DateTimePickerWrapperProps) {
  useEffect(() => {
    register(name);
  }, [register]);
  const [date, setDate] = useState<string>(new Date().toISOString());
  useEffect(() => {
    setValue(name, date);
  }, [date]);

  return (
    <DateTimePicker
      label={label}
      value={new Date(date)}
      onChange={(newValue) => {
        setDate(newValue.toISOString());
      }}
      renderInput={renderInput}
    />
  );
}
