import { GetApplicationDataQuery } from 'lib/generated/graphql';
import ApplicationCard from './typeformApplicationSystem/ApplicationCard';
import Button from './Button';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface OpenApplicationsViewProps {
  applications: GetApplicationDataQuery['returnAllOpenApp'];
  typeformApplications: GetApplicationDataQuery['typeformApplications'];
  userData: {
    email: string;
    firstName: string;
    lastName: string;
    major: string;
    netid: string;
    classStanding: string;
  };
}

const getDivisionColors = (division: string | null | undefined) => {
  const divisionLower = division?.toLowerCase() || '';
  if (divisionLower.includes('project')) {
    return {
      bg: 'bg-blue-600/20',
      text: 'text-blue-400',
      hover: 'hover:outline-blue-500/30'
    };
  }
  if (divisionLower.includes('dev')) {
    return {
      bg: 'bg-purple-600/20',
      text: 'text-purple-400',
      hover: 'hover:outline-purple-500/30'
    };
  }
  if (divisionLower.includes('research')) {
    return {
      bg: 'bg-orange-600/20',
      text: 'text-orange-400',
      hover: 'hover:outline-orange-500/30'
    };
  }
  if (divisionLower.includes('edu')) {
    return {
      bg: 'bg-green-600/20',
      text: 'text-green-400',
      hover: 'hover:outline-green-500/30'
    };
  }
  if (divisionLower.includes('community')) {
    return {
      bg: 'bg-yellow-600/20',
      text: 'text-yellow-400',
      hover: 'hover:outline-yellow-500/30'
    };
  }
  if (divisionLower.includes('industry')) {
    return {
      bg: 'bg-gray-600/20',
      text: 'text-gray-400',
      hover: 'hover:outline-gray-500/30'
    };
  }
  if (divisionLower.includes('hackutd')) {
    return {
      bg: 'bg-pink-600/20',
      text: 'text-pink-400',
      hover: 'hover:outline-pink-500/30'
    };
  }
  return {
    bg: 'bg-purple-600/20',
    text: 'text-purple-400',
    hover: 'hover:outline-purple-500/30'
  };
};

export default function OpenApplicationsView({
  applications,
  typeformApplications,
  userData,
}: OpenApplicationsViewProps) {
  const router = useRouter();

  const handleTypeformClick = (endpoint: string) => {
    // Open in new tab and prevent navigation in current window
    window.open(`/typeform/${endpoint}`, '_blank', 'noopener,noreferrer');
  };

  return typeformApplications.length !== 0 || applications.length !== 0 ? (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {typeformApplications.map(
        ({ id, typeformName, description, externalResourceUrl, division, endpoint }) => {
          const colors = getDivisionColors(division);
          return (
            <div
              key={id}
              className={`bg-gray-200/5 outline outline-gray-100/10 rounded-xl flex flex-col h-[400px] ${colors.hover} transition-all duration-300`}
            >
              <div className="p-6 flex-grow overflow-y-auto custom-scrollbar">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{typeformName}</h3>
                    <span className={`px-3 py-1 rounded-full ${colors.bg} ${colors.text} text-sm font-medium`}>
                      {division}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
                </div>
              </div>

              <div className="p-6 border-t border-gray-100/10 bg-gray-200/5 space-y-3">
                <button
                  onClick={() => handleTypeformClick(endpoint)}
                  className="w-full bg-gradient-to-r from-pink-700 to-purple-700 hover:opacity-90 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300"
                >
                  Apply Now
                </button>
                {externalResourceUrl && externalResourceUrl !== '' && (
                  <Link href={externalResourceUrl} target="_blank" className="block">
                    <button className="w-full bg-gray-200/10 hover:bg-gray-200/20 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300">
                      Learn More
                    </button>
                  </Link>
                )}
              </div>
            </div>
          );
        },
      )}
      
      {applications.map(({ id, name, externalResourceUrl, division, description }) => {
        const colors = getDivisionColors(division?.deptName || '');
        return (
          <div
            key={id}
            className={`bg-gray-200/5 outline outline-gray-100/10 rounded-xl flex flex-col h-[400px] ${colors.hover} transition-all duration-300`}
          >
            <div className="p-6 flex-grow overflow-y-auto custom-scrollbar">
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>
                  <span className={`px-3 py-1 rounded-full ${colors.bg} ${colors.text} text-sm font-medium`}>
                    {division?.deptName}
                  </span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
              </div>
            </div>

            <div className="p-6 border-t border-gray-100/10 bg-gray-200/5 space-y-3">
              <Link href={`/opportunities/${id}`} className="block">
                <button className="w-full bg-gradient-to-r from-pink-700 to-purple-700 hover:opacity-90 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300">
                  Apply Now
                </button>
              </Link>
              {externalResourceUrl && externalResourceUrl !== '' && (
                <Link href={externalResourceUrl} target="_blank" className="block">
                  <button className="w-full bg-gray-200/10 hover:bg-gray-200/20 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300">
                    Learn More
                  </button>
                </Link>
              )}
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <div className="col-span-full flex flex-col items-center justify-center py-16 px-4">
      <div className="bg-gray-200/5 rounded-xl p-8 text-center max-w-md">
        <h3 className="text-xl font-bold text-white mb-2">No Open Applications</h3>
        <p className="text-gray-400">Check back later for new opportunities!</p>
      </div>
    </div>
  );
}