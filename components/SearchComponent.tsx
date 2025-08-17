'use client';

import { useState } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import JobFilter from './JobFilter';
import SearchInput from './SearchInput';


const jobRoles = ['Software Engineer', 'Product Manager', 'Data Analyst'];
const availabilityTypes = ['Full-time', 'Part-time', 'Contract'];
const workTypes = ['Remote', 'On-site', 'Hybrid'];


export default function SearchComponent() {
  const [searchType] = useState('keywords');
  const [keywords, setKeywords] = useState('');
  const [location, setLocation] = useState('');
  const [field, setField] = useState('');
  const [jobRole, setJobRole] = useState('');
  const [visaCategory, setVisaCategory] = useState('');
  const [availability, setAvailability] = useState('');
  const [workType, setWorkType] = useState('');
  const [pageSize, setPageSize] = useState('10');

  const [openJobRole, setOpenJobRole] = useState(false);

  const handleSearch = () => {
    // Implement search logic here
    console.log({
      searchType,
      keywords,
      location,
      field,
      jobRole,
      visaCategory,
      availability,
      workType,
      pageSize,
    });
  };

  const handleClear = () => {
    setKeywords('');
    setLocation('');
    setField('');
    setJobRole('');
    setVisaCategory('');
    setAvailability('');
    setWorkType('');
    setPageSize('10');
  };

  return (
    <div className="p-4 relative z-10 max-w-7xl mx-auto">
      {/* Background blur effect */}
      <div className="absolute left-1/2 top-1/2 -z-10 flex -translate-x-1/2 -translate-y-1/2 max-lg:max-w-full max-md:hidden">
        <div className="h-[442px] w-[442px] rounded-full bg-blue-200/20 blur-[145px]"></div>
        <div className="-ml-[170px] h-[442px] w-[442px] rounded-full bg-blue-200/25 blur-[145px]"></div>
        <div className="-ml-[170px] h-[442px] w-[442px] rounded-full bg-blue-200/20 blur-[145px]"></div>
      </div>

      <div className="rounded-lg bg-white dark:bg-gray-800 p-2.5 shadow-lg">
        <div className="rounded border border-dashed border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 p-12 max-md:p-5">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
            {/* Radio Group for Search Options */}
            {/* <div className="col-span-12">
              <RadioGroup
                value={searchType}
                onValueChange={setSearchType}
                className="flex flex-row space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="keywords" id="keywords" />
                  <Label htmlFor="keywords">Use Keywords</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="jobdescription" id="jobdescription" />
                  <Label htmlFor="jobdescription">Use Own Job Description</Label>
                </div>
              </RadioGroup>
            </div> */}

            {/* Keywords Textarea */}
            <div className="col-span-12">

              <SearchInput />

            </div>
 
            {/* Location Autocomplete */}
            {/* <div className="col-span-12 md:col-span-3">
              <Popover open={openLocation} onOpenChange={setOpenLocation}>
                <PopoverTrigger asChild>
                  <div className="relative">
                    <Input
                      placeholder="Location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full bg-gray-50 dark:bg-gray-700 dark:text-gray-100 text-gray-800 placeholder:text-gray-400 dark:placeholder:text-gray-400"
                    />
                    <button
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300"
                      onClick={() => setOpenLocation(true)}
                    >
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search location..." />
                    <CommandEmpty>No location found.</CommandEmpty>
                    <CommandGroup>
                      {locations.map((loc) => (
                        <CommandItem
                          key={loc}
                          value={loc}
                          onSelect={() => {
                            setLocation(loc);
                            setOpenLocation(false);
                          }}
                        >
                          {loc}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div> */}

            {/* Field/Industry Autocomplete */}
            {/* <div className="col-span-12 md:col-span-3">
              <Popover open={openField} onOpenChange={setOpenField}>
                <PopoverTrigger asChild>
                  <div className="relative">
                    <Input
                      placeholder="Field/Industry"
                      value={field}
                      onChange={(e) => setField(e.target.value)}
                      className="w-full bg-gray-50 dark:bg-gray-700 dark:text-gray-100 text-gray-800 placeholder:text-gray-400 dark:placeholder:text-gray-400"
                    />
                    <button
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300"
                      onClick={() => setOpenField(true)}
                    >
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search field..." />
                    <CommandEmpty>No field found.</CommandEmpty>
                    <CommandGroup>
                      {fields.map((f) => (
                        <CommandItem
                          key={f}
                          value={f}
                          onSelect={() => {
                            setField(f);
                            setOpenField(false);
                          }}
                        >
                          {f}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div> */}

            {/* Job Role Autocomplete */}
            <div className="col-span-12 md:col-span-4">
              <Popover open={openJobRole} onOpenChange={setOpenJobRole}>
                <PopoverTrigger asChild>
                  <div className="relative">

                    <JobFilter />

                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search job role..." />
                    <CommandEmpty>No job role found.</CommandEmpty>
                    <CommandGroup>
                      {jobRoles.map((role) => (
                        <CommandItem
                          key={role}
                          value={role}
                          onSelect={() => {
                            setJobRole(role);
                            setOpenJobRole(false);
                          }}
                        >
                          {role}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* Visa Category Autocomplete */}
            {/* <div className="col-span-12 md:col-span-3">
              <Popover open={openVisaCategory} onOpenChange={setOpenVisaCategory}>
                <PopoverTrigger asChild>
                  <div className="relative">
                    <Input
                      placeholder="Visa Category"
                      value={visaCategory}
                      onChange={(e) => setVisaCategory(e.target.value)}
                      className="w-full bg-gray-50 dark:bg-gray-700 dark:text-gray-100 text-gray-800 placeholder:text-gray-400 dark:placeholder:text-gray-400"
                    />
                    <button
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300"
                      onClick={() => setOpenVisaCategory(true)}
                    >
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search visa category..." />
                    <CommandEmpty>No visa category found.</CommandEmpty>
                    <CommandGroup>
                      {visaCategories.map((visa) => (
                        <CommandItem
                          key={visa}
                          value={visa}
                          onSelect={() => {
                            setVisaCategory(visa);
                            setOpenVisaCategory(false);
                          }}
                        >
                          {visa}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div> */}

            {/* Divider */}
            {/* <div className="col-span-12">
              <hr className="border-gray-600 dark:border-gray-600" />
            </div> */}

            {/* Availability Types Select */}
            <div className="col-span-12 md:col-span-4">
              <Select value={availability} onValueChange={setAvailability}>
                <SelectTrigger className="w-full bg-gray-50 dark:bg-gray-700 dark:text-gray-100 text-gray-800 placeholder:text-gray-400 dark:placeholder:text-gray-400">
                  <SelectValue placeholder="Availability Types" />
                </SelectTrigger>
                <SelectContent>
                  {availabilityTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Work Types Select */}
            <div className="col-span-12 md:col-span-4">
              <Select value={workType} onValueChange={setWorkType}>
                <SelectTrigger className="w-full bg-gray-50 dark:bg-gray-700 dark:text-gray-100 text-gray-800 placeholder:text-gray-400 dark:placeholder:text-gray-400">
                  <SelectValue placeholder="Work Types" />
                </SelectTrigger>
                <SelectContent>
                  {workTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Page Size Select */}
            {/* <div className="col-span-12 sm:col-span-3">
              <Select value={pageSize} onValueChange={setPageSize}>
                <SelectTrigger className="w-full bg-gray-50 dark:bg-gray-700 dark:text-gray-100 text-gray-800 placeholder:text-gray-400 dark:placeholder:text-gray-400">
                  <SelectValue placeholder="Page Size" />
                </SelectTrigger>
                <SelectContent>
                  {pageSizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div> */}

            {/* Search and Clear Buttons */}
            <div className="col-span-12 flex justify-center mt-5 space-x-2">
              {/* <Button
                onClick={handleSearch}
                disabled={!keywords && !location && !field && !jobRole && !visaCategory}
                className="px-6 py-4 rounded-full bg-blue-600 text-white font-semibold shadow-md transition-all duration-300 ease-in-out hover:bg-blue-700 hover:shadow-lg active:scale-95 disabled:bg-gray-400 dark:disabled:bg-gray-400 disabled:cursor-not-allowed dark:bg-blue-700 dark:hover:bg-blue-800"
              >
                Search with NEW Job Description
              </Button> */}
              <Button
                variant="ghost"
                onClick={handleClear}
                disabled={!keywords && !location && !field && !jobRole && !visaCategory}
                className="text-gray-500 dark:text-gray-400"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}