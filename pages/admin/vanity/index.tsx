import { useSession } from 'next-auth/react';
import LoadingComponent from 'components/LoadingComponent';
import VanityForm from 'components/vanity/VanityForm';

export default function CreateVanityLinkPage() {
  const { status } = useSession({ required: true });
  if (status === 'loading') {
    return <LoadingComponent />;
  }
  return <VanityForm />;
}
