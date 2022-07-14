export default function EventHeader() {
  return (
    <div className="flex flex-col w-full">
      <h1 className="text-center text-xl">events</h1>
      <div className="flex justify-end">
        <button className="rounded-lg p-3 border-2">edit</button>
      </div>
    </div>
  );
}
