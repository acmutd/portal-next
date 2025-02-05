import { GetAddDirectorPageInfoQuery } from 'lib/generated/graphql';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import PortalButton from 'components/Button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from 'components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from 'components/ui/popover';
import { cn } from 'lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from 'components/ui/command';
import { Button } from 'components/ui/button';

interface AddDirectorFormProps {
  eligibleOfficers: GetAddDirectorPageInfoQuery['officers'];
  availableDivisions: GetAddDirectorPageInfoQuery['divisions'];
  handleAddNewOfficer: (officerId: string, divisionId: string) => Promise<void>;
}

const formSchema = z.object({
  officerId: z.string(),
  divisionId: z.string(),
});

export default function AddDirectorForm({
  eligibleOfficers,
  availableDivisions,
  handleAddNewOfficer,
}: AddDirectorFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      officerId: '',
      divisionId: '',
    },
  });

  const getName = (officer: (typeof eligibleOfficers)[0]) => {
    return `${officer.profile.firstName} ${officer.profile.lastName}`;
  };

  const onFormSubmit = async (value: z.infer<typeof formSchema>) => {
    await handleAddNewOfficer(value.officerId, value.divisionId);
  };

  return (
    <div className="w-3/5 mx-auto rounded-lg p-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="officerId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-white">Officer</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          'w-full justify-between',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        {field.value
                          ? getName(eligibleOfficers.find((officer) => officer.id === field.value)!)
                          : 'Select officer'}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command className="w-[47.7vw]">
                      <CommandInput placeholder="Search officer..." />
                      <CommandList>
                        <CommandEmpty>No officer found.</CommandEmpty>
                        <CommandGroup>
                          {eligibleOfficers.map((officer) => (
                            <CommandItem
                              value={getName(officer)}
                              key={officer.id}
                              onSelect={() => {
                                form.setValue('officerId', officer.id);
                              }}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  officer.id === field.value ? 'opacity-100' : 'opacity-0',
                                )}
                              />
                              {getName(officer)}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="divisionId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-white">Division</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          'w-full justify-between',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        {field.value
                          ? availableDivisions.find((division) => division.id === field.value)?.deptName
                          : 'Select division'}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command className="w-[47.7vw]">
                      <CommandInput placeholder="Search division..." />
                      <CommandList>
                        <CommandEmpty>No division found.</CommandEmpty>
                        <CommandGroup>
                          {availableDivisions.map((division) => (
                            <CommandItem
                              value={division.deptName}
                              key={division.id}
                              onSelect={() => {
                                form.setValue('divisionId', division.id);
                              }}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  division.id === field.value ? 'opacity-100' : 'opacity-0',
                                )}
                              />
                              {division.deptName}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <PortalButton type="submit">Submit</PortalButton>
        </form>
      </Form>
    </div>
  );
}
