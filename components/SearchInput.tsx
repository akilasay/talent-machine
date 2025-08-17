'use client';

import  {useState} from "react";
import Image from "next/image";


const SearchInput = () => {

    const [searchQuery, setSearchQuery] = useState('');


    return (
      <div className=" border border-slate-400 rounded-lg items-center flex gap-2 px-2 py-1 h-fit">
            <Image src="/icons/search.svg" alt="search" width={20} height={15} />
            <input
                placeholder="Search with skills..."
                className="outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
  )
}

export default SearchInput