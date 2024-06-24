'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
  //useSearchParams hook, captures the url that has been embeded with the search parameter
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const {replace} = useRouter();


  const handleSearch = useDebouncedCallback((term) =>{

    //addding a debouncing code: captures search input and prints
    console.log(`Searching ...${term}`)
    //URLSearchParams: this is an API that manipulates search queries into friendly url search parameters
    const params = new URLSearchParams(searchParams);

    params.set('page', '1');

    //the block below sets the url parameter based on the user's search input.
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`); //replaces the current URL with the new one
  }, 300)
  

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e)=>{
          handleSearch(e.target.value)
        }}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
