import ProfileField from 'components/profile/ProfileField';
import { FindProfileQuery } from 'lib/generated/graphql';

interface ProfileViewProps {
  profile?: FindProfileQuery['profile'];
}

export default function ProfileView({ profile }: ProfileViewProps) {
  if (!profile) return <p className="text-gray-100">please set up your profile</p>;

  const getHighestPosition = () => {
    if (profile.user.isDirector) return "Director";
    if (profile.user.isOfficer) return "Officer";
    if (profile.user.isMember) return "Member";
    return "Non-Member";
  };

  return (
    <div className="w-full max-w-4xl bg-gray-200/5 outline outline-gray-100/10 rounded-xl p-8">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="text-4xl text-white font-bold">
            {profile.firstName} {profile.lastName}
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-3 py-1 rounded-full bg-purple-600/20 text-purple-400 text-sm font-medium">
            {getHighestPosition()}
          </span>
          {profile.officer && profile.officer.divisions.length > 0 && (
            <span className="px-3 py-1 rounded-full bg-blue-600/20 text-blue-400 text-sm font-medium">
              {profile.officer.divisions.map(d => d.deptName).join(", ")}
            </span>
          )}
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        <div className="space-y-1">
          <div className="text-gray-400 text-sm font-medium">Email</div>
          <div className="text-white truncate">{profile.email}</div>
        </div>
        <div className="space-y-1">
          <div className="text-gray-400 text-sm font-medium">NetID</div>
          <div className="text-white truncate">{profile.netid}</div>
        </div>
        <div className="space-y-1">
          <div className="text-gray-400 text-sm font-medium">Class Standing</div>
          <div className="text-white truncate">{profile.classStanding}</div>
        </div>
        <div className="space-y-1">
          <div className="text-gray-400 text-sm font-medium">Major</div>
          <div className="text-white truncate">{profile.major}</div>
        </div>
      </div>
    </div>
  );
}
