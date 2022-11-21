import { FC } from 'react';

interface ApplicationCardProps {
  title: string;
  description: string;
  division: string;
  button: JSX.Element;
  icon?: JSX.Element;
}
const ApplicationCard: FC<ApplicationCardProps> = ({
  title,
  description,
  button,
  division,
  icon,
}) => {
  return (
    <div className="flex flex-col items-end w-fit">
      <h3 className="font-bold text-white mr-5 mb-[5px] text-[20px]">{division}</h3>
      <div className="bg-gray-200/10 outline outline-gray-100/10 w-80 h-48 p-6 rounded-3xl space-y-2 flex flex-col justify-between">
        <div>
          <div className="w-full flex justify-between items-center gap-[20px]">
            <h4 className="text-[25px] text-white font-bold whitespace-nowrap overflow-hidden text-ellipsis">
              {title}
            </h4>
            {icon}
          </div>
          <p className="text-white text-sm">{description}</p>
        </div>
        <div className="relative w-fit ml-auto">{button}</div>
      </div>
    </div>
  );
};

export default ApplicationCard;
