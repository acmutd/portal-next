import { FC } from 'react';

const AddNewApplicationCard: FC<{} & React.ComponentPropsWithoutRef<'div'>> = (props) => {
  return (
    <div
      className="bg-gray-200/5 outline outline-gray-100/10 w-80 h-48 p-6 mt-8 rounded-3xl space-y-2"
      {...props}
    >
      <p className="text-xl text-gray-100 font-bold basis-3/4">add new</p>
      <div className="grid place-content-center">
        <p className="text-7xl text-gray-100 font-bold basis-3/4">+</p>
      </div>
    </div>
  );
};

export default AddNewApplicationCard;
