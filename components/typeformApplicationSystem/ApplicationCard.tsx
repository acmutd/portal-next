import { FC } from 'react';

interface ApplicationCardProps {
  title: string;
  description: string;
  division: string;
  buttons: JSX.Element[];
  icon?: JSX.Element;
}
const ApplicationCard: FC<ApplicationCardProps> = ({
  title,
  description,
  buttons,
  division,
  icon,
}) => {
  return (
    <div className="flex flex-col items-end w-fit">
      <h3 className="font-bold text-white mr-5 mb-[5px] text-[20px]">{division}</h3>
      <div className="w-80 h-48 p-6 rounded-3xl space-y-2 flex flex-col justify-between bg-gray-200/5 outline outline-gray-100/10">
        <div>
          <div className="w-full flex justify-between items-center gap-[20px]">
            <h4 className="text-[25px] text-white font-bold whitespace-nowrap overflow-hidden text-ellipsis">
              {title}
            </h4>
            {icon}
          </div>
          <p className="text-white text-sm">{description}</p>
        </div>
        <div className="flex gap-1 ml-auto w-fit">
          {buttons.map((button) => (
            <div className="relative w-fit">{button}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface NewApplicationCardProps {
  title: string;
  description: string;
  division: string;
  button: JSX.Element;
  icon?: JSX.Element;
}
const NewApplicationCard: FC<NewApplicationCardProps> = ({
  title,
  description,
  button,
  division,
  icon,
}) => {
  return (
    <div className=" flex flex-row w-80 h-20 p-4 rounded-2xl space-y-2 justify-between bg-gray-200/10 outline outline-gray-100/10">
      <div className='flex flex-col'>
        <h4 className='w-40 text-base text-white truncate'>
          {title}
        </h4>
        <p className='w-24 text-sm text-white truncate'>
          {division}
        </p>
      </div>
      <div className='w-fit'>
        {button}
      </div>
    </div>
  );
};

export {ApplicationCard, NewApplicationCard};
