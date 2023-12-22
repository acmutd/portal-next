interface EventPageHeaderProps {
  isInEditMode: boolean;
  isOfficer: boolean;
}

export default function EventHeader(prop: EventPageHeaderProps) {
  return (
    <div className="flex flex-col w-full">
      <h1 className="text-center text-3xl font-medium">events</h1>
    </div>
  );
}
