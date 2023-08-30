import { useSession } from 'next-auth/react';
import LoadingComponent from 'components/LoadingComponent';
import VanityForm from 'components/vanity/VanityForm';
import { OfficerStatusContext } from 'components/context/OfficerStatus';
import { useContext } from 'react';
import AdminOnlyComponent from 'components/admin/AdminOnly';

export default function CreateVanityLinkPage() {
  const { status } = useSession({ required: true });
  const isOfficer = useContext(OfficerStatusContext);
  if (status === 'loading') {
    return <LoadingComponent />;
  }
  if (!isOfficer) return <AdminOnlyComponent />;
  return <VanityForm />;
}
