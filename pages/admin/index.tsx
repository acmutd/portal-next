import { useSession } from 'next-auth/react';
import Button from 'components/Button';
import { useRouter } from 'next/router';

export default function AdminToolsPage() {
  useSession({ required: true });
  const router = useRouter();
  const options = [
    {
      title: 'Create Vanity Link',
      description: 'Click here to start creating your Vanity URL with ACM domain.',
      onChosen: () => router.push('/admin/vanity'),
    },
    {
      title: 'Manage Division Application',
      description: "Click here to manage your division(s)' applications.",
      // TODO: update onChosen to match appropriate action
      onChosen: () => router.push('/opportunities'),
    },
    {
      title: 'Add officer to division',
      description: 'Add new officer into division.',
      onChosen: () => router.push('/admin/officer/add'),
    },
  ];
  return (
    <div className="p-4">
      <h1 className="text-[40px] text-white my-5 py-3">Admin Tools</h1>
      <div className="flex flex-col gap-y-6 w-full">
        {options.map(({ title, description, onChosen }, idx) => (
          <div
            key={idx}
            className="mx-auto w-4/5 lg:h-40 p-6 rounded-3xl gap-y-4 flex flex-col justify-around bg-gray-200/5 outline outline-gray-100/10"
          >
            <h2 className="text-white font-bold text-xl">{title}</h2>
            <p className="text-white">{description}</p>
            <Button onClick={onChosen} className="ml-auto">
              Select
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
