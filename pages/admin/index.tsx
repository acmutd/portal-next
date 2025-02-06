import { useSession } from 'next-auth/react';
import Button from 'components/Button';
import { useRouter } from 'next/router';
import { OfficerStatusContext } from 'components/context/OfficerStatus';
import { useContext } from 'react';
import AdminOnlyComponent from 'components/admin/AdminOnly';

interface AdminFunctionalityOptionType {
  title: string;
  description: string;
  onChosen: () => void;
  directorOnly: boolean;
  // flag is true if functionality is reserved for either ACM executive or Development Director only
  devDirectorOrExecOnly: boolean;
}

export default function AdminToolsPage() {
  useSession({ required: true });
  const router = useRouter();
  const officerStatusData = useContext(OfficerStatusContext);
  const options: AdminFunctionalityOptionType[] = [
    {
      title: 'ACM Events',
      description: 'Manage events: create, edit, and view statistics',
      onChosen: () => router.push('/admin/events'),
      directorOnly: false,
      devDirectorOrExecOnly: false,
    },
    {
      title: 'Applications',
      description: 'Click here to manage all Typeform applications',
      onChosen: () => router.push('/admin/typeform/'),
      directorOnly: true,
      devDirectorOrExecOnly: false,
    },
    {
      title: 'Create Vanity Link',
      description: 'Click here to start creating your Vanity URL with ACM domain.',
      onChosen: () => router.push('/admin/vanity'),
      directorOnly: false,
      devDirectorOrExecOnly: false,
    },
    {
      title: 'Add Participant To Division',
      description: 'Click here to add participant into your division',
      onChosen: () => router.push('/admin/participant/add'),
      directorOnly: true,
      devDirectorOrExecOnly: false,
    },
    {
      title: 'Add Officer To Division',
      description: 'Add new officer into division.',
      onChosen: () => router.push('/admin/officer/add'),
      directorOnly: true,
      devDirectorOrExecOnly: false,
    },
    {
      title: 'Manage Membership Status',
      description: 'Click here to manage membership of ACM Portal users',
      onChosen: () => router.push('/admin/member/manage'),
      directorOnly: true,
      devDirectorOrExecOnly: true,
    },
    // {
    //   title: 'Create Division Application',
    //   description: 'Click here to create new application for your division',
    //   onChosen: () => router.push('/admin/opportunities/create'),
    //   directorOnly: true
    // },
    {
      title: 'Onboard New Officers',
      description: 'Onboard new officers to GSuite. Automatically creates ACM email and sends welcome email.',
      onChosen: () => router.push('/admin/officer-onboarding'),
      directorOnly: true,
      devDirectorOrExecOnly: false,
    },
    {
      title: 'ACM Directors',
      description: 'View and Manage ACM Directors',
      onChosen: () => router.push('/admin/director/view'),
      directorOnly: true,
      devDirectorOrExecOnly: false,
    },
    {
      title: 'Manage Scoreboard',
      description: 'Manage Scoreboard owned by your division',
      onChosen: () => router.push('/admin/scoreboard/'),
      directorOnly: true,
      devDirectorOrExecOnly: false,
    },
  ];
  const isDevDirectorOrExec = () => {
    return (
      officerStatusData.directorOfDivisions.includes('Development') ||
      officerStatusData.directorOfDivisions.includes('Executive')
    );
  };
  if (!officerStatusData.isOfficer) {
    return <AdminOnlyComponent />;
  }
  return (
    <div className="p-4 h-screen">
      <h1 className="text-[32px] text-white mb-4">Admin Tools</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {options
          .filter(({ directorOnly }) => (officerStatusData.isDirector ? true : !directorOnly))
          .filter(({ devDirectorOrExecOnly }) =>
            isDevDirectorOrExec() ? true : !devDirectorOrExecOnly,
          )
          .map(({ title, description, onChosen }, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-3xl gap-y-4 flex flex-col justify-around bg-gray-200/5 outline outline-gray-100/10 ${
          idx === 6 ? 'ring-2 ring-yellow-300 ring-offset-2 ring-offset-black animate-pulse' : ''
              }`}
            >
              <div>
          <h2 className="text-white font-bold text-xl mb-2">{title}</h2>
          <p className="text-white">{description}</p>
              </div>
              <Button onClick={onChosen} className="ml-auto">
                Select
              </Button>
            </div>
          ))}
      </div>
    </div>
  );
}
