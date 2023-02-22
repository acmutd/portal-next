import { JSXElementConstructor, ReactElement, useEffect, useState } from 'react';
import { DateTimePicker } from '@mui/x-date-pickers';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { TextFieldProps } from '@mui/material';
import moment from 'moment';

// DateTimePickerWrapper.tsx
interface DateTimePickerWrapperProps {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  name: string;
  label: string;
  renderInput: (props: TextFieldProps) => ReactElement<any, string | JSXElementConstructor<any>>;
  minDate?: string;
}

export default function DateTimePickerWrapper({
  register,
  setValue,
  name,
  renderInput,
  label,
  minDate,
}: DateTimePickerWrapperProps) {
  useEffect(() => {
    register(name);
  }, [register]);
  const [date, setDate] = useState<string>(new Date().toISOString());
  useEffect(() => {
    setValue(name, date);
  }, [date]);

  useEffect(() => {
    if (!minDate) {
      setDate(new Date().toISOString());
    } else if (new Date(minDate).getTime() > new Date(date).getTime()) {
      setDate(minDate);
    }
  }, [minDate]);

  return (
    <DateTimePicker
      label={label}
      value={new Date(date)}
      minDate={moment(minDate)}
      onChange={(newValue) => {
        setDate(newValue?.toISOString() || '');
      }}
      renderInput={renderInput}
    />
  );
}
