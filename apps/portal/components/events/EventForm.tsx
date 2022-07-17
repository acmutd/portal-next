import { ActiveEventResult } from 'lib/types/event';
import { useState } from 'react';
import { DateTimePicker } from '@mui/x-date-pickers';
import TextField from '@mui/material/TextField';
import { useForm, Resolver, Controller } from 'react-hook-form';
import DateTimePickerWrapper from './DateTimePickerWrapper';

interface EventFormProps {
  event?: ActiveEventResult;
  formAction: 'Edit' | 'Create';
  onGoBack: () => void;
  submitActionName: string;
  onFormSubmit: (form: ActiveEventResult) => Promise<void>;
}

export default function EventForm({
  formAction,
  onGoBack,
  event,
  onFormSubmit,
  submitActionName,
}: EventFormProps) {
  const [eventForm, setEventForm] = useState<ActiveEventResult>(
    event || {
      start: new Date().toISOString(),
      end: new Date().toISOString(),
      description: '',
      location: '',
      summary: '',
      url: '',
      id: '',
    },
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm();
  return (
    <div className="p-3">
      <div className="mx-auto my-3">
        <h1 className="text-2xl">{formAction} Event</h1>
      </div>
      <form
        className="flex flex-col gap-y-3"
        onSubmit={handleSubmit((vals) => {
          console.log(vals);
        })}
      >
        <input
          name="summary"
          placeholder="Event Title"
          type="text"
          {...register('summary', {
            required: 'Enter event title.',
          })}
        ></input>
        <div className="text-xs text-red-600">{errors.summary && errors.summary.message}</div>
        <textarea
          name="description"
          placeholder="Description"
          {...register('description', {
            required: 'Enter event description.',
          })}
        ></textarea>
        <div className="text-xs text-red-600">
          {errors.description && errors.description.message}
        </div>
        <input
          name="location"
          placeholder="Location"
          type="text"
          {...register('location', {
            required: 'Enter event location.',
          })}
        ></input>
        <div className="text-xs text-red-600">{errors.location && errors.location.message}</div>
        <input name="url" placeholder="Resource URL" type="text" {...register('url')}></input>
        <DateTimePickerWrapper
          register={register}
          setValue={setValue}
          name="start"
          label="Event Start Date"
          renderInput={(params) => <TextField {...params} />}
        />
        <div className="text-xs text-red-600">{errors.start && errors.start.message}</div>
        <DateTimePickerWrapper
          register={register}
          setValue={setValue}
          name="end"
          label="Event End Date"
          renderInput={(params) => <TextField {...params} />}
        />
        <div className="text-xs text-red-600">{errors.end && errors.end.message}</div>
        <input type="submit" className="cursor-pointer p-3 rounded-lg bg-green-400" />
      </form>
      {/* <div className="mx-auto flex flex-col gap-y-3 my-3">
        <input
          placeholder="Event Title"
          onChange={(e) => setEventForm((prev) => ({ ...prev, summary: e.target.value }))}
          value={eventForm.summary}
          type="text"
          className="p-3 border-1 rounded-lg"
        />
        <textarea
          placeholder="Event Description"
          rows={5}
          onChange={(e) => setEventForm((prev) => ({ ...prev, description: e.target.value }))}
          value={eventForm.description}
          className="p-3 border-1 rounded-lg"
        />
        <input
          placeholder="Location"
          onChange={(e) => setEventForm((prev) => ({ ...prev, location: e.target.value }))}
          value={eventForm.location}
          type="text"
          className="p-3 border-1 rounded-lg"
        />
        <input
          placeholder="Resource URL"
          onChange={(e) => setEventForm((prev) => ({ ...prev, url: e.target.value }))}
          value={eventForm.url}
          type="text"
          className="p-3 border-1 rounded-lg"
        />
        <DateTimePicker
          label="Event Start Date"
          value={new Date(eventForm.start)}
          onChange={(newValue) =>
            setEventForm((prev) => ({ ...prev, start: newValue.toISOString() }))
          }
          renderInput={(params) => <TextField {...params} />}
        />
        <DateTimePicker
          label="Event End Date"
          value={new Date(eventForm.end)}
          onChange={(newValue) =>
            setEventForm((prev) => ({ ...prev, end: newValue.toISOString() }))
          }
          renderInput={(params) => <TextField {...params} />}
        />
      </div> */}
      <div className="flex gap-x-3">
        <button className="p-3 rounded-lg bg-gray-200" onClick={() => onGoBack()}>
          Go back
        </button>
        {/* <button
          className="p-3 rounded-lg bg-green-400"
          onClick={async () => {
            try {
              await onFormSubmit(eventForm);
              alert('Event created');
              onGoBack();
            } catch (error) {
              alert('Unexpected error! Please try again later');
              console.error(error);
            }
          }}
        >
          {submitActionName}
        </button> */}
      </div>
    </div>
  );
}
