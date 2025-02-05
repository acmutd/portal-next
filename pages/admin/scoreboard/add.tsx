import Loading from 'components/Loading_Apply';
import AdminOnlyComponent from 'components/admin/AdminOnly';
import NewScoreboardForm from 'components/admin/scoreboard/add/NewScoreboardForm';
import { OfficerStatusContext } from 'components/context/OfficerStatus';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import { gqlQueries } from 'src/api';

interface ScoreboardRule {
  eventCategoryId: string;
  maxClaimCount: number;
  scoreValue: number;
  maxClaimEnabled: boolean;
}

export default function AddNewScoreboardPage() {
  const { status } = useSession({ required: true });
  const officerStatusData = useContext(OfficerStatusContext);
  const { data, error, isLoading } = useQuery(['addOfficerPageData'], () =>
    gqlQueries.getCreateScoreboardPageData(),
  );
  const [scoreboardName, setScoreboardName] = useState<string>('');
  const [scoreRules, setScoreRules] = useState<ScoreboardRule[]>([]);
  const [divisionId, setDivisionId] = useState<string>('');
  const router = useRouter();
  const handleOnSubmit = async () => {
    try {
      await gqlQueries.createScoreboard({
        data: {
          scoreboardName,
          scoreRules: {
            create: scoreRules.map((rule) => ({
              scoreValue: rule.scoreValue,
              eventCategory: {
                connect: {
                  id: rule.eventCategoryId,
                },
              },
              ...(rule.maxClaimEnabled ? { maxClaimCount: rule.maxClaimCount } : {}),
            })),
          },
          division: {
            connect: {
              id: divisionId,
            },
          },
        },
      });
      alert('Scoreboard created successfully');
      router.push('/admin/scoreboard');
    } catch (error) {
      alert('Error creating new scoreboard. Please try again later...');
      console.error(error);
    }
  };

  const scoreboardUpdateHandler = {
    updateEventCategoryId: (ruleIndex: number, value: string) =>
      setScoreRules((prev) =>
        prev.map((rule, idx) => {
          if (idx === ruleIndex) {
            return {
              ...rule,
              eventCategoryId: value,
            };
          } else {
            return rule;
          }
        }),
      ),
    updateMaxClaimCount: (ruleIndex: number, value: number) =>
      setScoreRules((prev) =>
        prev.map((rule, idx) => {
          if (idx === ruleIndex) {
            return {
              ...rule,
              maxClaimCount: value,
            };
          } else {
            return rule;
          }
        }),
      ),
    updateScoreValue: (ruleIndex: number, value: number) =>
      setScoreRules((prev) =>
        prev.map((rule, idx) => {
          if (idx === ruleIndex) {
            return {
              ...rule,
              scoreValue: value,
            };
          } else {
            return rule;
          }
        }),
      ),
    toggleMaxClaimEnabled: (ruleIndex: number) =>
      setScoreRules((prev) =>
        prev.map((rule, idx) => {
          if (idx === ruleIndex) {
            return {
              ...rule,
              maxClaimEnabled: !rule.maxClaimEnabled,
            };
          } else {
            return rule;
          }
        }),
      ),
    updateScoreboardName: (newScoreboardName: string) => setScoreboardName(newScoreboardName),
    updateDivision: (divisionId: string) => setDivisionId(divisionId),
  };
  const addScoreboardRule = () => {
    setScoreRules((prev) => [
      ...prev,
      {
        scoreValue: 0,
        eventCategoryId: '',
        maxClaimCount: 0,
        maxClaimEnabled: false,
      },
    ]);
  };
  const removeScoreboardRule = (ruleIndex: number) => {
    setScoreRules((prev) => prev.filter((rule, idx) => idx !== ruleIndex));
  };

  if (!officerStatusData.isDirector) {
    return <AdminOnlyComponent />;
  }

  if (isLoading || status === 'loading') {
    return <Loading />;
  }

  return (
    <div className="p-5 w-full">
      <h1 className="text-2xl text-white">Add New Scoreboard</h1>
      <NewScoreboardForm
        divisionList={data!.me.profile!.officer!.divisions}
        onAddRule={addScoreboardRule}
        onSubmitForm={handleOnSubmit}
        onRemoveRule={removeScoreboardRule}
        scoreboardUpdateHandler={scoreboardUpdateHandler}
        scoreboardData={{
          scoreboardName,
          divisionId,
          scoreRules,
        }}
        eventCategories={data!.eventCategories}
      />
    </div>
  );
}
