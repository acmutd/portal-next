import ProfileField from 'components/profile/ProfileField';
import { FindProfileQuery } from 'lib/generated/graphql';

interface ProfileViewProps {
  profile?: FindProfileQuery['profile'];
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
      <div className="flex">

      <div className='w-full px-3'>
        <ProfileField label="is acm member" text={profile.user.isMember ? "true" : "false"} />
      </div>
      <div className="w-full px-3">
        <ProfileField label="is acm officer" text={profile.user.isOfficer ? "true" : "false"} />
      </div>
      <div className="w-full px-3">
        <ProfileField label="is acm director" text={profile.user.isDirector ? "true" : "false"} />
      </div>
      </div>
      {profile.officer && (
        <div className="w-full px-3">
          <ProfileField label="division" text={profile.officer!.divisions.length === 0 ? "No divisions" : profile.officer!.divisions.map((division) => division.deptName).join(", ")} />
        </div>
      )}
    </div>
  );
}
