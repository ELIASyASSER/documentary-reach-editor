"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SearchIcon, XIcon } from "lucide-react"
import React, { useRef, useState } from "react"
// import { useSearchParams } from "@/hooks/use-search-param"
import { useSetSearch } from "@/lib/searchUtil"


const SearchInput = () => {

    const [value,setValue] = useState("");
    const inputRef = useRef<HTMLInputElement>(null)
    const  {setSearch,deleteSearch}= useSetSearch()
    // const [search] = useSearchParams()

    
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        
        setValue(e.target.value)
    }
    const handleClear = ()=>{
        setValue("")
        deleteSearch()
        inputRef.current?.blur()
    }
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        setSearch(value)
        
        inputRef.current?.blur()
    }
  return (
    <main className="flex-1 flex items-center justify-center">
        <form className="relative max-w-[728px] w-full" onSubmit={handleSubmit}>
            <Input value={value} onChange={handleChange} ref={inputRef}  placeholder="search" className="md:text-base placeholder:text-neutral-800 px-14 w-full border-none focus-visible:shadow-[0_1px_1px_0_rgba(65,69,73,0.3),0_1px_3px_1px_rgba(65,69,73,0.15)] bg-[#f0f4f8] rounded-full h-[48px] focus-visible:ring-0 focus:bg-white"/>
            <Button className="absolute left-3 top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full " type="submit" variant={"ghost"} size={"icon"}>
                <SearchIcon/>
            </Button>
            {
                value&&(
                    <Button onClick={handleClear} className="absolute right-3 top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full " type="button" variant={"ghost"} size={"icon"}>
                        <XIcon/>
                    </Button>
                )
            }
        </form>
    </main>
  )
}

export default SearchInput