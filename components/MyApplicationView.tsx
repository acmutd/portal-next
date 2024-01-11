import { GetApplicationDataQuery } from 'lib/generated/graphql';

interface MyApplicationViewProps {
  appData: GetApplicationDataQuery['filledApplications'];
  typeformAppData: NonNullable<GetApplicationDataQuery['me']['profile']>['typeformSubmissions'];
}
export default function MyApplicationView({ appData, typeformAppData }: MyApplicationViewProps) {
  return appData.length !== 0 || typeformAppData.length !== 0 ? (
    <div className="w-full flex flex-col items-center lg:flex-row flex-wrap gap-[30px]">
      {[
        ...appData.map(({ status, app: { name } }) => (
          <div key={name} className="flex flex-col items-end w-fit">
            <div className="w-96 p-6 rounded-3xl space-y-2 flex flex-col justify-between bg-gray-200/5 outline outline-gray-100/10">
              <div className="w-full flex justify-between items-center gap-[20px]">
                <h4 className="text-[25px] text-white font-bold whitespace-nowrap overflow-hidden text-ellipsis">
                  {name}
                </h4>
                {status === 'accepted' ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="green"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ) : status === 'rejected' ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ) : (
                  <h4 className="text-white">{status}</h4>
                )}
              </div>
            </div>
          </div>
        )),
        ...typeformAppData.map(({ typeformName }) => (
          <div key={typeformName} className="flex flex-col items-end w-fit">
            <div className="w-96 p-6 rounded-3xl space-y-2 flex flex-col justify-between bg-gray-200/5 outline outline-gray-100/10">
              <div className="w-full flex justify-between items-center gap-[20px]">
                <h4 className="text-[25px] text-white font-bold whitespace-nowrap overflow-hidden text-ellipsis">
                  {typeformName}
                </h4>
              </div>
            </div>
          </div>
        )),
      ]}
    </div>
  ) : (
    <h3 className="px-4 text-xl text-left text-white mb-4">No applications found</h3>
  );
}
