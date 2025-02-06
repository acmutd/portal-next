import Button from 'components/Button';
import Loading from 'components/Loading_Apply';
import AdminOnlyComponent from 'components/admin/AdminOnly';
import ScoreboardParticipantsTable from 'components/admin/scoreboard/[id]/participants/ScoreboardParticipantsTable';
import { OfficerStatusContext } from 'components/context/OfficerStatus';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { useQuery } from 'react-query';
import { gqlQueries } from 'src/api';

export default function ScoreboardParticipantsManagementPage() {
  const { status } = useSession({ required: true });
  const officerStatusData = useContext(OfficerStatusContext);
  const router = useRouter();
  const { data, isLoading, error } = useQuery([`scoreboardParticipant${router.query.id}`], () =>
    gqlQueries.getScoreboardParticipantsByIdPageData({
      where: {
        id: router.query.id as string,
      },
    }),
  );
  const removeUserFromScoreboardHandler = async (participantId: string) => {
    try {
      await gqlQueries.removeParticipantFromScoreboard({
        where: {
          id: participantId,
        },
      });
      alert('Successfully removed participant from scoreboard');
    } catch (error) {
      alert('Failed to remove participant from scoreboard. Please try again later...');
      console.error(error);
    }
  };
  const updateUserScoreHandler = async (participantId: string, scoreDelta: number) => {
    try {
      await gqlQueries.manualUpdateScoreEntry({
        data: {
          manualDelta: {
            increment: scoreDelta,
          },
        },
        where: {
          id: participantId,
        },
      });
      alert('Score successfully updated');
    } catch (err) {
      alert('Error updating user score. Please try again...');
      console.error(err);
    }
  };
  if (isLoading || status === 'loading') {
    return <Loading />;
  }
  if (!data?.scoreboard || !officerStatusData.isDirector) {
    return <AdminOnlyComponent />;
  }
  return (
    <div className="p-5 w-full flex flex-col gap-y-4">
      <h1 className="text-2xl text-white">Participants of {data.scoreboard.scoreboardName} </h1>
      <ScoreboardParticipantsTable
        removeUserFromScoreboardHandler={removeUserFromScoreboardHandler}
        participants={data.scoreboard.scoreEntries.map((entry) => ({
          firstName: entry.participant.profile.firstName,
          lastName: entry.participant.profile.lastName,
          participantId: entry.id,
          netid: entry.participant.profile.netid,
          score: entry.totalScore,
        }))}
        updateScoreForUserHandler={updateUserScoreHandler}
      />
      <div className="flex gap-x-3">
        <Button onClick={() => router.push(`/admin/scoreboard/${router.query.id}/`)}>
          go back
        </Button>
        <Button
          onClick={() => router.push(`/admin/scoreboard/${router.query.id}/participants/add`)}
        >
          add new participant
        </Button>
      </div>
    </div>
  );
}
