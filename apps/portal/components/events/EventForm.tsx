import { ActiveEventResult } from 'lib/types/event';
import { useState } from 'react';
import { DateTimePicker } from '@mui/x-date-pickers';
import TextField from '@mui/material/TextField';

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
  return (
    <div className="p-3">
      <div className="mx-auto my-3">
        <h1 className="text-2xl">{formAction} Event</h1>
      </div>
      <div className="mx-auto flex flex-col gap-y-3 my-3">
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
      </div>
      <div className="flex gap-x-3">
        <button className="p-3 rounded-lg bg-gray-200" onClick={() => onGoBack()}>
          Go back
        </button>
        <button
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
        </button>
      </div>
    </div>
  );
}
