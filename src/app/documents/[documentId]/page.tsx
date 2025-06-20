
import {preloadQuery} from "convex/nextjs"
import {auth} from "@clerk/nextjs/server"
import { Id } from "../../../../convex/_generated/dataModel"
import Document from "./document";
import { api } from "../../../../convex/_generated/api";

interface DocumentPageProps{
  params:Promise<{documentId:Id<"documents">}>
}


const DocumentPage = async({params}:DocumentPageProps) => {
  const {documentId} = await params;
  const {getToken} = await auth()
  const token = await getToken({template:"convex"})??undefined

  if(!token){
    throw new Error("Unauthorized")
  }


  const preloadeDocument = await preloadQuery(api.documents.getById,{id:documentId},{token})
  
  return (
  <Document
   preloadeDocument={preloadeDocument}/>
  )


}

export default DocumentPage