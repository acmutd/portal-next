import { Disclosure } from '@headlessui/react';
import { Checkbox } from '@mui/material';
import Button from 'components/Button';
import { useState } from 'react';
import { gqlQueries } from 'src/api';

interface MakeUserOfficerCardProps {
  firstName: string;
  lastName: string;
  netid: string;
  profileId: string;
  divisions: Array<{ id: string; deptName: string }>;
}

export default function MakeUserOfficerCard({
  firstName,
  lastName,
  netid,
  profileId,
  divisions,
}: MakeUserOfficerCardProps) {
  const [divisionStatus, setDivisionStatus] = useState<boolean[]>(
    Array<boolean>(divisions.length).fill(false),
  );
  const updateDivisionStatusAtIndex = (index: number, newStatus: boolean) => {
    setDivisionStatus((prev) =>
      prev.map((status, listIndex) => {
        if (index === listIndex) return newStatus;
        return status;
      }),
    );
  };

  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-200/5 px-4 py-2 text-left text-sm font-medium text-gray-100 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 hover:text-black">
            <span>{`${firstName} ${lastName} (${netid})`}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-gray-100`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
          </Disclosure.Button>
          <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-100">
            Check all division you want to add this user to:
            {divisions.map((division, index) => (
              <div className="flex gap-x-2 items-center" key={index}>
                <Checkbox
                  color="default"
                  sx={{ color: 'white' }}
                  checked={divisionStatus[index]}
                  onChange={(e) => updateDivisionStatusAtIndex(index, e.target.checked)}
                />
                <h1 className="text-gray-100">{division.deptName}</h1>
              </div>
            ))}
            <Button
              onClick={async () => {
                await Promise.all(
                  divisions.map(async (division, index) => {
                    if (divisionStatus[index])
                      await gqlQueries.addUserToDivision({
                        where: {
                          profileId,
                        },
                        create: {
                          profile: {
                            connect: {
                              id: profileId,
                            },
                          },
                          divisions: {
                            connect: [
                              {
                                id: division.id,
                              },
                            ],
                          },
                        },
                        update: {
                          divisions: {
                            connect: [
                              {
                                id: division.id,
                              },
                            ],
                          },
                        },
                      });
                  }),
                );
                alert('Successfully added user to checked division(s)');
                setDivisionStatus((prev) => prev.map(() => false));
              }}
            >
              click to add user to checked division
            </Button>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
