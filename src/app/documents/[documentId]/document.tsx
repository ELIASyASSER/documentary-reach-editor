"use client"
import { Preloaded, usePreloadedQuery } from "convex/react";
import Editor from "./editor";
import { Navbar } from "./navbar";
import { Room } from "./room";
import Toolbar from "./toolbar";
import { api } from "../../../../convex/_generated/api";
interface DocumentPageProps{
    preloadeDocument:Preloaded<typeof api.documents.getById>,
    params:Promise<{documentId:string}>
}


const Document = ({preloadeDocument}:DocumentPageProps)=>{
    const document = usePreloadedQuery(preloadeDocument)
        return (
      <Room>
        <div className="min-h-screen bg-[#fafbfd]">
          <div className="flex flex-col px-4 pt-2 gap-y-2  fixed top-0 left-0 right-0 z-10 bg-[#fafbfd] print:hidden h-[112px] ">
            <Navbar data={document}/>
            <Toolbar/>
          </div>
          <div className="pt-[114px] print:pt-0">
              <Editor initialContent={document.initialContent}/>
          </div>
        </div>
            </Room>
  )

}

export default Document