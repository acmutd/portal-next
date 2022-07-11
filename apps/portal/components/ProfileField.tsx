interface ProfileFieldProps {
  label: string;
  text: string;
}

export default function ProfileField({ label, text = '' }: ProfileFieldProps) {
  return (
    <div>
      <label className="block text-gray-700 font-semibold mb-2">{label}</label>
      <div className="appearance-none block w-full text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white">
        {text}
      </div>
    </div>
  );
}
