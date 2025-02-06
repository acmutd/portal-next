// components/admin/MakeUserOfficerCard.tsx
import { Disclosure } from "@headlessui/react";
import { Checkbox } from "@mui/material";
import Button from "components/Button";
import { useState } from "react";
import { gqlQueries } from "src/api";

interface MakeUserOfficerCardProps {
  firstName: string;
  lastName: string;
  netid: string;
  profileId: string;
  availableDivisions: Array<{ id: string; deptName: string }>;
}

export default function MakeUserOfficerCard({
  firstName,
  lastName,
  netid,
  profileId,
  availableDivisions,
}: MakeUserOfficerCardProps) {
  // Create a state array for the checkboxes (one per available division)
  const [divisionStatus, setDivisionStatus] = useState<boolean[]>(Array<boolean>(availableDivisions.length).fill(false));

  const updateDivisionStatusAtIndex = (index: number, newStatus: boolean) => {
    setDivisionStatus((prev) =>
      prev.map((status, listIndex) => (index === listIndex ? newStatus : status))
    );
  };

  const handleMakeOfficer = async () => {
    const selectedDivisions = availableDivisions
      .filter((_, idx) => divisionStatus[idx])
      .map((division) => ({ id: division.id }));

    if (selectedDivisions.length === 0) {
      alert("Please select at least one division.");
      return;
    }

    try {
      // Create an officer record for this profile and assign the selected divisions.
      // (The mutation name 'createOneOfficer' is assumed; adjust it to your generated mutation.)
      await gqlQueries.createOneOfficer({
        data: {
          profile: { connect: { id: profileId } },
          divisions: { connect: selectedDivisions },
        },
      });
      alert("User is now an officer and assigned to the selected division(s).");
      setDivisionStatus(Array<boolean>(availableDivisions.length).fill(false));
    } catch (error) {
      console.error("Error making user an officer:", error);
      alert("Failed to make user an officer.");
    }
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
            <p>Select divisions to assign this officer to:</p>
            {availableDivisions.map((division, index) => (
              <div key={division.id} className="flex gap-x-2 items-center">
                <Checkbox
                  color="default"
                  sx={{ color: "white" }}
                  checked={divisionStatus[index]}
                  onChange={(e) => updateDivisionStatusAtIndex(index, e.target.checked)}
                />
                <span>{division.deptName}</span>
              </div>
            ))}
            <Button onClick={handleMakeOfficer}>Make Officer</Button>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}