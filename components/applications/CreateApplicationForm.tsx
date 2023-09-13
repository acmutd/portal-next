import { TextField } from '@mui/material';
import Button from 'components/Button';
import DateTimePickerWrapper from 'components/events/DateTimePickerWrapper';
import { useRouter } from 'next/router';
import { useForm, useFieldArray } from 'react-hook-form'; 
import { gqlQueries } from 'src/api'

interface CreateApplicationFormProps {
    divisions: Array<{ deptName: string; id: string; }>;
}

interface CreateApplicationFormPayload {
    createdAt: string;
    description: string;
    divisionId: string;
    expireDate: string;
    externalResourceUrl: string;
    name: string;
    questions: { value: string; }[];
}

export default function CreateApplicationForm({ divisions } : CreateApplicationFormProps) {
    const { register, handleSubmit, setValue, watch, control } = useForm<CreateApplicationFormPayload>();
    const { fields, append, remove } = useFieldArray<CreateApplicationFormPayload, "questions", "id">({
        control,
        name: "questions"
    });
    const router = useRouter();
    const watchStartDate = watch('createdAt', new Date().toISOString());
    return (
        <div className="flex justify-center md:flex-row-reverse w-full md:w-[50%]">
          <form
            id="create-application-form"
            className="justify-between min-h-full h-full"
            onSubmit={handleSubmit(async (vals) => {
              await gqlQueries
                .createApplication({
                  data: {
                    createdAt: new Date(vals.createdAt || new Date().toISOString()),
                    description: vals.description,
                    division: {
                        connect: {
                            id: vals.divisionId
                        }
                    },
                    expireDate: vals.expireDate,
                    externalResourceUrl: vals.externalResourceUrl,
                    name: vals.name,
                    questions: {
                        set: vals.questions.map((q) => q.value)
                    }
                  },
                });
                alert("Application successfully created");
                router.push('/opportunities');
            })}
          >
            <div className="flex flex-wrap gap-8 -mx-3 mb-6 text-gray-200">
              <div className="grid gap-y-4 w-full px-3">
                <label className="block text-2xl font-semibold mb-2">Application Name</label>
                <p>
                  Provide the name of the application that you wish to be added to the Portal. 
                </p>
                <input
                  className="appearance-none block w-full rounded-2xl py-3 px-4 mb-3 leading-tight focus:outline-none bg-transparent border border-gray-300"
                  type="text"
                  {...register('name')}
                />
              </div>
              <div className="grid gap-y-4 w-full px-3">
                <label className="block text-2xl font-semibold mb-2">Description</label>
                <p>
                  Attach a description to be used alongside your form in Portal. We recommend about 50
                  words or a sentence and a half maximum. Example: Join the organizing team of the
                  largest hackathon in Texas! The HackUTD organizing team has roles for logistics,
                  marketing and more.
                </p>
                <input
                  className="appearance-none block w-full rounded-2xl py-3 px-4 mb-3 leading-tight focus:outline-none bg-transparent border border-gray-300"
                  type="text"
                  {...register('description')}
                />
              </div>
              <div className="grid gap-y-4 w-full px-3">
                <label className="block text-2xl font-semibold mb-2">Expire Date</label>
                <p>
                  Please enter a date that will automatically make the application inactive. 
                </p>
                <DateTimePickerWrapper
                    register={register}
                    setValue={setValue}
                    name="expireDate"
                    label=""
                    renderInput={(params) => (
                        <TextField
                        {...params}
                        sx={{
                            label: { color: '#fff' },
                            svg: { color: '#fff' },
                            input: { color: '#fff' },
                        }}
                        />
                    )}
                    minDate={watchStartDate}
                />
              </div>
              <div className="grid gap-y-4 w-full px-3">
                <label className="block text-2xl font-semibold mb-2">External URL</label>
                <p>
                  If you would like the "Learn More" button to redirect to additional resources, please
                  enter a valid link here.
                </p>
                <input
                  className="appearance-none block w-full rounded-2xl py-3 px-4 mb-3 leading-tight focus:outline-none bg-transparent border border-gray-300"
                  type="text"
                  {...register('externalResourceUrl')}
                />
              </div>
              <div className="grid gap-y-4 w-full px-3">
                <label className="block text-2xl text-gray-200 font-semibold mb-2">Division</label>
                <select
                  className="appearance-none block w-full text-gray-100 rounded-2xl py-3 px-4 mb-3 leading-tight focus:outline-none bg-transparent border border-gray-300"
                  {...register('divisionId')}
                >
                  {divisions.map((division) => (
                    <option value={division.id}>{division.deptName}</option>
                  ))}
                </select>
              </div>
              <div className="grid gap-y-4 w-full px-3">
                <label className="block text-2xl text-gray-200 font-semibold mb-2">Questions</label>
                {fields.length === 0 ? 
                (<Button onClick={(e) => {
                    append({ value: "" });
                }}>add a new question</Button>) : 
                (fields.map((field, index) => (
                    <div key={field.id} className="border border-gray-100 rounded-xl p-5">
                        <input 
                            className="appearance-none block w-full rounded-2xl py-3 px-4 mb-3 leading-tight focus:outline-none bg-transparent border border-gray-300"
                            type="text"
                            {...register(`questions.${index}.value`)}
                        />
                        <button onClick={(e) => {
                            e.preventDefault();
                            remove(index);
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </button>
                        {index == fields.length - 1 && (
                            <button onClick={(e) => {
                                e.preventDefault();
                                append({ value: "" });
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </button>
                        )}
                    </div>
                )))}
              </div>
            </div>
          </form>
        </div>
      );
}