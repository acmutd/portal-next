interface EventPageHeaderProps {
  isInEditMode: boolean;
  toggleEdit: () => void;
}

export default function EventHeader(prop: EventPageHeaderProps) {
  return (
    <div className="flex flex-col w-full">
      <h1 className="text-center text-xl">events</h1>
      <div className="flex justify-end">
        <button className="rounded-lg p-3 border-2" onClick={prop.toggleEdit}>
          {prop.isInEditMode ? 'done' : 'edit'}
        </button>
      </div>
    </div>
  );
}
