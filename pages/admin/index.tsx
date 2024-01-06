import { useSession } from 'next-auth/react';
import Button from 'components/Button';
import { useRouter } from 'next/router';
import { OfficerStatusContext } from 'components/context/OfficerStatus';
import { useContext } from 'react';
import AdminOnlyComponent from 'components/admin/AdminOnly';

export default function AdminToolsPage() {
  useSession({ required: true });
  const router = useRouter();
  const isOfficer = useContext(OfficerStatusContext);
  const options = [
    {
      title: 'Create Vanity Link',
      description: 'Click here to start creating your Vanity URL with ACM domain.',
      onChosen: () => router.push('/admin/vanity'),
    },
    {
      title: 'Manage Division Application',
      description: "Click here to manage your division(s)' applications.",
      onChosen: () => router.push('/admin/opportunities'),
    },
    {
      title: 'Add officer to division',
      description: 'Add new officer into division.',
      onChosen: () => router.push('/admin/officer/add'),
    },
    {
      title: 'Create Division Application',
      description: 'Click here to create new application for your division',
      onChosen: () => router.push('/admin/opportunities/create'),
    },
    {
      title: 'Manage Typeform Application',
      description: 'Click here to manage all Typeform application',
      onChosen: () => router.push('/admin/typeform/'),
    },
    {
      title: 'Add Event',
      description: 'Click here to create an event for your division(s)',
      onChosen: () => router.push('/admin/opportunities'),
    },
  ];
  if (!isOfficer) {
    return <AdminOnlyComponent />;
  }
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
