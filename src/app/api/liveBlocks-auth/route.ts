import {Liveblocks} from "@liveblocks/node"
import { ConvexHttpClient } from "convex/browser"
import { auth,currentUser } from "@clerk/nextjs/server"
import { api } from "../../../../convex/_generated/api"
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)
const liveBlocks= new Liveblocks({
    secret:process.env.LIVEBLOCKS_SECRET_KEY!
})
export async function POST(req:Request){
    const {sessionClaims   } :any =  await auth()
    if(!sessionClaims){
        return new Response("Unauthorized session claims",{status:401})
    }
    const user = await currentUser()
    if(!user){
        return new Response("Unauthorized user",{status:401})

    }

    const {room } = await req.json()
    const doc = await convex.query(api.documents.getById,{id:room})

    if(!doc){
        return new Response("Unauthorized document not found",{status:401})
    }
    const isOwner  = doc.ownerId == user.id
    
    const orgMember =doc.organizationId && doc.organizationId == sessionClaims.o.id  

    if(!isOwner && !orgMember){
        return new Response("Unauthorized to access ",{status:401})
    }

          const name = user?.fullName?.trim()|| user.username ||user.primaryEmailAddress?.emailAddress ||"user"  
          const  nameToNumber = name.split("").reduce((acc,curr)=>acc+curr.charCodeAt(0),0)
          const hue = Math.abs(nameToNumber)%360
          const color = `hsl(${hue},80%,60%)`

    const session = liveBlocks.prepareSession(user.id,{
        
        userInfo:{
            name:name,
            avatar:user?.imageUrl,
            color:color
        }
    })
    session.allow(room,session.FULL_ACCESS)
    const {body,status} = await session.authorize()

    return new Response(body,{status})

};

