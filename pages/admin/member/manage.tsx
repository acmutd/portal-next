import Loading from 'components/Loading_Apply';
import AdminOnlyComponent from 'components/admin/AdminOnly';
import MemberManagementList from 'components/admin/member/manage/MemberManagementList';
import PageTitle from 'components/admin/member/manage/PageTitle';
import { OfficerStatusContext } from 'components/context/OfficerStatus';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { gqlQueries } from 'src/api';
import { useQuery } from 'react-query';

export default function MemberManagementPage() {
  const { status } = useSession({ required: true });
  const router = useRouter();
  const officerData = useContext(OfficerStatusContext);
  const { data, isLoading, error } = useQuery(['profiles'], () => gqlQueries.getMemberList(), {
    enabled: status === 'authenticated' && officerData.isDirector,
  });

  const handleMembershipToggle = async (profileId: string, membershipStatus: boolean) => {
    try {
      await gqlQueries.toggleMembershipStatus({
        profileId,
        membershipStatus,
      });
      alert('Membership status updated successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to update membership status. Please try again later...');
    }
  };

  if (!officerData.isDirector) return <AdminOnlyComponent />;
  if (isLoading || status === 'loading') return <Loading />;
  return (
    <div className="p-5">
      <PageTitle handleGoBack={() => router.push('/admin')} />
      <MemberManagementList
        members={data!.profiles}
        handleMembershipUpdate={async (profileId, membershipStatus) =>
          handleMembershipToggle(profileId, membershipStatus)
        }
      />
    </div>
  );
}
