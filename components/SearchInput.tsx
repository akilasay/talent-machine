'use client';

import { useState} from "react";
import Image from "next/image";


const SearchInput = () => {
  
    // const pathname = usePathname();
    // const router = useRouter();
    // const searchParams = useSearchParams();

    const [searchQuery, setSearchQuery] = useState('');

    // useEffect(() => {
    //     const delayDebounceFn = setTimeout(() => {
    //         if(searchQuery) {
    //             const newUrl = formUrlQuery({
    //                 params: searchParams.toString(),
    //                 key: "topic",
    //                 value: searchQuery,
    //             });

    //             router.push(newUrl, { scroll: false });
    //         } else {
    //             if(pathname === '/candidates') {
    //                 const newUrl = removeKeysFromUrlQuery({
    //                     params: searchParams.toString(),
    //                     keysToRemove: ["topic"],
    //                 });

    //                 router.push(newUrl, { scroll: false });
    //             }
    //         }
    //     }, 500)
    // }, [searchQuery, router, searchParams, pathname]);


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