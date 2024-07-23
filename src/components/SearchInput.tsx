'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const SearchInput = () => {
    const searchParams = useSearchParams()
    const pathname = usePathname();
    const { replace } = useRouter()
    const handleSearch = useDebouncedCallback((term: string) => {

        const params = new URLSearchParams(searchParams)
        if (term) {
            params.set("query", term)
        } else {
            params.delete('query')
        }
        replace(`${pathname}?${params.toString()}`)
    }, 300)
    return (
        <input
            onChange={(e) => { handleSearch(e.target.value) }}
            defaultValue={searchParams.get("query")?.toString()}
            className='grow'
            type='text'
            placeholder='Search product ...'
        />
    )
}

export default SearchInput