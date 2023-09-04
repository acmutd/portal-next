import { TypeformCreateForm } from 'components/typeformApplicationSystem';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useContext } from 'react';
import { OfficerStatusContext } from 'components/context/OfficerStatus';
import AdminOnlyComponent from 'components/admin/AdminOnly';

const CreateApplicationPage: NextPage = () => {
  const router = useRouter();
  const isOfficer = useContext(OfficerStatusContext);

  if (!isOfficer) {
    return <AdminOnlyComponent />;
  }

  useSession({ required: true });

  return (
    <div className="px-16 py-[65px] w-full">
      <header className="flex items-center justify-center relative mb-[30px]">
        <h1 className="text-[48px] font-Gilroy text-white font-semibold">applications</h1>
      </header>

      <div className="w-full grid place-items-center">
        <div className="flex flex-col p-10 place-items-center">
          <div className="text-2xl font-semibold text-gray-100">Create Typeform Application</div>
        </div>
        <div className="w-full flex justify-center">
          <TypeformCreateForm />
        </div>
        <div className="flex gap-20">
          <button
            type="submit"
            className="bg-purple-600 text-gray-100 font-semibold px-12 py-2 rounded-lg"
            form="create-typeform"
            onClick={() => {
              sessionStorage.setItem('showToast', '1');
            }}
          >
            save
          </button>
          <button className="text-gray-100 font-semibold p-2 rounded-lg" onClick={router.back}>
            cancel
          </button>
        </div>
      </div>
      <div className="flex gap-x-16 px-16 justify-center"></div>
    </div>
  );
};

export default CreateApplicationPage;
