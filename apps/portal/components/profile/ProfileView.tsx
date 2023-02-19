import { Profile } from '@generated/type-graphql';
import ProfileField from 'components/profile/ProfileField';

interface ProfileViewProps {
  profile?: Profile;
}

export default function ProfileView({ profile }: ProfileViewProps) {
  if (!profile) return <p className="text-gray-100">please set up your profile</p>;
  return (
    // view mode
    <div className="flex w-1/2 flex-wrap mb-6">
      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <ProfileField label="first name" text={profile.firstName.toLowerCase()} />
      </div>
      <div className="w-full md:w-1/2 px-3">
        <ProfileField label="last name" text={profile.lastName.toLowerCase()} />
      </div>
      <div className="w-full px-3">
        <ProfileField label="email" text={profile.email.toLowerCase()} />
      </div>
      <div className="w-full px-3">
        <ProfileField label="netid" text={profile.netid.toLowerCase()} />
      </div>
      <div className="w-full px-3">
        <ProfileField label="class standing" text={profile.classStanding.toLowerCase()} />
      </div>
      <div className="w-full px-3">
        <ProfileField label="major" text={profile.major.toLowerCase()} />
      </div>
    </div>
  );
}
