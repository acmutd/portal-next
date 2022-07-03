/**
 *
 * Profile Page
 *
 * Route: /profile
 *
 */
import { ACMButton } from '@acmutd/acm-ui';

export default function ProfilePage() {
  return (
    <div className="w-screen grid place-items-center gap-2">
      <div className="flex flex-col w-[25%] p-10 place-items-center">
        <div className="text-3xl font-semibold">my account</div>
        <div className="m-3">
          <ACMButton theme="light">edit</ACMButton>
        </div>
      </div>
      <div className=" flex flex-col ">
        <div className="flex flex-col"></div>
        <form className="w-full max-w-lg">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block text-gray-700 font-semibold mb-2">first name</label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="Jane"
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block text-gray-700 font-semibold mb-2">last name</label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
                placeholder="Doe"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block text-gray-700 font-semibold mb-2">email</label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder="temoc@utdallas.edu"
              />
            </div>

            <div className="w-full px-3">
              <label className="block text-gray-700 font-semibold mb-2">netID</label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder="SWG120200"
              />
            </div>
            <div className="w-full px-3">
              <label className="block text-gray-700 font-semibold mb-2">class standing</label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder="freshman"
              />
            </div>
            <div className="w-full px-3">
              <label className="block text-gray-700 font-semibold mb-2">major</label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder="computer science"
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3"></div>
            <label className="md:w-2/3 block text-gray-500 font-bold">
              <input className="mr-2 leading-tight" type="checkbox" />
              <span className="text-sm">utd student</span>
            </label>
          </div>
        </form>
      </div>
    </div>
  );
}
