"use client"
import {  useOthers,useSelf } from "@liveblocks/react/suspense";
import { ClientSideSuspense } from "@liveblocks/react";
import { currentUser } from "@clerk/nextjs/server";
import { Separator } from "@/components/ui/separator";
const AVATAR_SIZE = 36;



const AvatarStack=()=>{
    const users = useOthers()
    const user = useSelf()
    if(!users || users.length ==0){
        return null
    }
    return (
        <>
            <div className="flex items-center">
                {user &&(
                    <div className="relative ml-2">
                        <Avatar src={user.info.avatar} name="You"/>
                    </div>
                )}
                <div className="flex ">
                    {
                        users.map(({connectionId,info})=>{
                            return (
                                <Avatar src={info.avatar} name={info.name} key={connectionId}/>
                            )
                        })
                    }
                </div>
            </div>
            <Separator orientation="vertical" className="h-6"/>
        </>
    )

}


export const Avatars = ()=>{
    return (
        <ClientSideSuspense fallback={null}>
            <AvatarStack/>
        </ClientSideSuspense>
    )
}




interface AvatarProps{
    src:string,
    name:string
}

const Avatar =({src,name}:AvatarProps)=>{
    return (
        <div className="group -ml-2 flex shrink-0 place-content-center relative border-4 border-white rounded-full bg-gray-400 " 
        style={{width:AVATAR_SIZE}}>
            <div className="opacity-0 group-hover:opacity-100 absolute top-full py-1 px-2 text-white text-xs rounded-lg mt-2.5 z-10 bg-black whitespace-nowrap transition-opacity">
                {name}
            </div>
            <img src={src} alt={name} className="size-full rounded-full" />
        </div>
    )
}
