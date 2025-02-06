import Button from 'components/Button';
import { Input } from 'components/ui/input';
import { ScrollArea } from 'components/ui/scroll-area';
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from 'components/ui/table';
import Fuse from 'fuse.js';
import { GetAttendanceInfoQuery } from 'lib/generated/graphql';
import debounce from 'lodash.debounce';
import { useEffect, useMemo, useState } from 'react';

interface EventParticipantListViewProps {
  currentEvent: GetAttendanceInfoQuery['events'][0] | null;
}

export default function EventParticipantListView({ currentEvent }: EventParticipantListViewProps) {
  const [filteredProfiles, setFilteredProfiles] = useState(currentEvent?.profiles || []);
  const [searchQuery, setSearchQuery] = useState('');
  const debounceSearchQuery = useMemo(() => {
    return debounce((e) => setSearchQuery(e.target.value), 300);
  }, []);
  const updateFilteredProfiles = () => {
    if (!currentEvent) return;
    if (searchQuery === '') {
      setFilteredProfiles(currentEvent.profiles);
    } else {
      const fuse = new Fuse(currentEvent.profiles, {
        keys: ['profile.firstName', 'profile.lastName'],
      });
      setFilteredProfiles(fuse.search(searchQuery).map((res) => res.item));
    }
  };
  useEffect(() => {
    updateFilteredProfiles();
  }, [searchQuery]);
  useEffect(() => {
    if (currentEvent) {
      updateFilteredProfiles();
    }
  }, [currentEvent]);

  useEffect(() => {
    return () => debounceSearchQuery.cancel();
  });

  return (
    <ScrollArea className="h-full rounded-md border text-white">
      {currentEvent === null ? (
        <div className="text-white p-5">
          <h1>Choose any event to view its statistics attendance.</h1>
        </div>
      ) : (
        <div className="p-5">
          {currentEvent.profiles.length === 0 ? (
            <h1>This event does not have any attendance</h1>
          ) : (
            <>
              <div className="my-2 flex gap-x-2 items-center">
                <Input
                  className="rounded-xl text-black"
                  placeholder="Search for participant"
                  onChange={debounceSearchQuery}
                />
                <Button
                  className="rounded-xl"
                  onClick={() => {
                    const value = Math.floor(Math.random() * filteredProfiles.length);
                    alert(
                      filteredProfiles[value]?.profile?.firstName +
                        ' ' +
                        filteredProfiles[value]?.profile?.lastName,
                    );
                  }}
                >
                  Choose a random participant
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>First Name</TableHead>
                    <TableHead>Last Name</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProfiles.map(({ profile }, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{profile?.firstName}</TableCell>
                      <TableCell>{profile?.lastName}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          )}
        </div>
      )}
    </ScrollArea>
  );
}
