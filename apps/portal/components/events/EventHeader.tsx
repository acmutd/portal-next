interface EventPageHeaderProps {
  isInEditMode: boolean;
  isOfficer: boolean;
  toggleEdit: () => void;
}

export default function EventHeader(prop: EventPageHeaderProps) {
  return (
    <div className="flex flex-col w-full">
      <h1 className="text-center text-3xl font-medium">events</h1>
      <div className="flex justify-end">
        {prop.isOfficer && (
          <button className="rounded-lg p-3 m-2 border-2 border-zinc-300" onClick={prop.toggleEdit}>
            {prop.isInEditMode ? 'done' : 'edit'}
          </button>
        )}
      </div>
    </div>
  );
}
