"use client"

type useSetSearchType = {
  setSearch:(value:string)=>void;
  deleteSearch:()=>void;
}

import { useRouter, useSearchParams } from "next/navigation"
export const useSetSearch = ():useSetSearchType=>{
  
  const searchParams= useSearchParams()
  const router = useRouter()
  
  const setSearch = (value:string):void=>{
    const params = new URLSearchParams(searchParams.toString())
    params.set("search",value)
    router.replace(`?${params.toString()}`)
  } 

  const deleteSearch = ():void=>{
    const params = new URLSearchParams(searchParams.toString())
    params.delete("search")
    router.replace(`?${params.toString()}`)

  }
 
  return {setSearch,deleteSearch}

}