import Button from 'components/Button';
import Loading from 'components/Loading_Apply';
import AdminOnlyComponent from 'components/admin/AdminOnly';
import ScoreboardParticipantsTable from 'components/admin/scoreboard/[id]/participants/add/ScoreboardParticipantsTable';
import { OfficerStatusContext } from 'components/context/OfficerStatus';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { useQuery } from 'react-query';
import { gqlQueries } from 'src/api';

export default function AddNewParticipantToScoreboardPage() {
  const { status } = useSession({ required: true });
  const officerStatusData = useContext(OfficerStatusContext);
  const router = useRouter();
  const { data, isLoading, error } = useQuery(
    [`scoreboard${router.query.id}EligibleParticipants`],
    () =>
      gqlQueries.getScoreboardEligibleParticipants({
        where: {
          id: router.query.id as string,
        },
      }),
  );
  if (isLoading || status === 'loading') {
    return <Loading />;
  }
  if (!data?.scoreboard || !officerStatusData.isDirector) {
    return <AdminOnlyComponent />;
  }

  const addParticipantHandler = async (participantId: string) => {
    try {
      await gqlQueries.addParticipantToScoreboard({
        data: {
          participant: {
            connect: {
              id: participantId,
            },
          },
          scoreboard: {
            connect: {
              id: router.query.id as string,
            },
          },
          manualDelta: 0,
        },
      });
      alert('Successfully added participant to scoreboard');
    } catch (error) {
      alert('Error adding participant to scoreboard. Please try again later...');
      console.error(error);
    }
  };

  return (
    <div className="p-5 w-full flex flex-col gap-y-4">
      <h1 className="text-2xl text-white">Add participants to {data.scoreboard.scoreboardName} </h1>
      <ScoreboardParticipantsTable
        participants={data.scoreboard.division.participants.map((entry) => ({
          firstName: entry.profile.firstName,
          lastName: entry.profile.lastName,
          participantId: entry.id,
          netid: entry.profile.netid,
        }))}
        addParticipantHandler={addParticipantHandler}
      />
      <div className="flex gap-x-3">
        <Button onClick={() => router.push(`/admin/scoreboard/${router.query.id}/participants`)}>
          go back
        </Button>
      </div>
    </div>
  );
}
