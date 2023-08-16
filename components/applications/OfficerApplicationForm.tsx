import { useState } from 'react';
import QuestionComponent from './QuestionComponent';
import Button from 'components/Button';

interface OfficerApplicationFormResponse {
  notes: string;
  status: string;
  score: number;
}

interface OfficerApplicationFormProps {
  onSubmit: (formResponse: OfficerApplicationFormResponse) => Promise<void>;
  applicantName: string;
  originalNotes?: string;
  originalStatus?: string;
  originalScore?: number;
}

export default function OfficerApplicationForm({
  onSubmit,
  applicantName,
  originalNotes,
  originalStatus,
  originalScore,
}: OfficerApplicationFormProps) {
  const [notes, setNotes] = useState<string>(originalNotes || '');
  const [status, setStatus] = useState<string>(originalStatus || 'pending');
  const [score, setScore] = useState<number>(originalScore || 1);
  const [disableSubmit, setDisableSubmit] = useState<boolean>(false);

  return (
    <div className="w-full p-5">
      <h1 className="text-3xl text-center mx-auto text-gray-100">{applicantName}</h1>
      <div className="w-full mx-auto">
        <QuestionComponent
          question={`Notes:`}
          response={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <div>
          <label>Status:</label>
          <select
            className="appearance-none block w-full text-gray-100 rounded-2xl py-3 px-4 mb-3 leading-tight focus:outline-none bg-transparent border border-gray-300"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="notselected">Not Selected</option>
          </select>
        </div>
        <div>
          <label>Score:</label>
          <select
            className="appearance-none block w-full text-gray-100 rounded-2xl py-3 px-4 mb-3 leading-tight focus:outline-none bg-transparent border border-gray-300"
            value={score}
            onChange={(e) => setScore(Number(e.target.value))}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>
      </div>
      <div className="flex gap-x-4">
        <Button
          disabled={disableSubmit}
          onClick={async () => {
            setDisableSubmit(true);
            await onSubmit({
              notes,
              status,
              score,
            });
          }}
        >
          submit
        </Button>
      </div>
    </div>
  );
}
