"use client"

import { ReactNode, useCallback, useEffect, useState } from "react";

import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";


import { useParams } from "next/navigation";
import Loader from "@/components/full-screen-loader";
import { getUsers ,getDocuments} from "./actions";
import { toast } from "sonner";
import { Id } from "../../../../convex/_generated/dataModel";


export function Room({ children }: { children: ReactNode }) {
  type user={

    id:string,
    name:string,
    avatar:string,
    color:string
  }
  const params = useParams()
  const [users,setUsers] = useState<user[]>([])
  
const fetchUsers = useCallback(
  async()=>{
    try {
      const list = await getUsers()
      setUsers(list)
    } catch (_) {
      toast.error("failed to fetch users")
    }
},[])

useEffect(()=>{
  fetchUsers()
},[fetchUsers])


    return (
    <LiveblocksProvider
     throttle={16} 
     authEndpoint={async()=>{
      const endpoint = "/api/liveBlocks-auth"
      const room  = params.documentId as string
      const res = await fetch(endpoint,{
        method:"POST",
        body:JSON.stringify({room})
      })
      return await res.json() 
     }}
     resolveUsers={({userIds})=>{return userIds.map((id)=>users.find((user)=>user.id == id)??undefined)}}
     resolveMentionSuggestions={({text})=>{
      let filteredUsers = users
      if(text){
        filteredUsers = users.filter((user)=>user.name.toLocaleLowerCase().includes(text.toLocaleLowerCase()))
      }
      return filteredUsers.map((user)=>user.id)
     }}
     resolveRoomsInfo={async({roomIds})=>{
      const docs = await getDocuments(roomIds as Id<"documents">[])
      return docs.map((doc)=>({
        id:doc.id,
        name:doc.name,

      }))
     }}>
      
      <RoomProvider id={params?.documentId as string}
       initialStorage={{leftMargin:56,rightMargin:56}}>
        <ClientSideSuspense fallback={<Loader label="room loading"/>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}