import Loading from 'components/Loading_Apply';
import AdminOnlyComponent from 'components/admin/AdminOnly';
import ScoreboardList from 'components/admin/scoreboard/ScoreboardList';
import { OfficerStatusContext } from 'components/context/OfficerStatus';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { useQuery } from 'react-query';
import { gqlQueries } from 'src/api';

export default function ScoreboardManagementPage() {
  const { status } = useSession({ required: true });
  const router = useRouter();
  const officerStatusData = useContext(OfficerStatusContext);
  const { data, error, isLoading } = useQuery(['scoreboardData'], () =>
    gqlQueries.getScoreboards(),
  );

  if (!officerStatusData.isDirector) {
    return <AdminOnlyComponent />;
  }

  if (isLoading || status === 'loading') {
    return <Loading />;
  }

  return (
    <div className="p-5">
      <div className="flex gap-x-2 items-center mb-6">
        <div className="cursor-pointer" onClick={() => router.push('/admin')}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="white"
            className="size-8"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </div>
        <h1 className="text-3xl text-white p-3">Scoreboard Management</h1>
      </div>
      <ScoreboardList
        scoreboards={data!.scoreboards}
        handleNewScoreboardCreation={() => {
          router.push('/admin/scoreboard/add');
        }}
      />
    </div>
  );
}
