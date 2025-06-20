import { PaginationStatus } from "convex/react"
import { Doc } from "../../../convex/_generated/dataModel"
import {Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
    TableCell,
} from "@/components/ui/table"
import {  LoaderIcon } from "lucide-react"
import { DocumentRow } from "./document"
import { Button } from "@/components/ui/button"
interface DocumentTableProps{
    documents:Doc<"documents">[]|undefined,
    loadMore:(numItems:number)=>void,
    status:PaginationStatus,
}

export const DocumentTable = ({documents,loadMore,status}:DocumentTableProps)=>{
    return <div className="max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-5">
          {documents ==undefined ?(
            <div>
                <LoaderIcon className="animate-spin "/>
            </div>
          ):(
            <div>
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent border-none">
                            <TableHead>Name</TableHead>
                            <TableHead>&nbsp;</TableHead>
                            <TableHead>Shared</TableHead>
                            <TableHead>Created At</TableHead>
                        </TableRow>
                    </TableHeader>
                    {documents.length ==0?(
                        <TableBody>
                            <TableRow className="hover:bg-transparent">
                                <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">No Documents found</TableCell>
                            </TableRow>
                        </TableBody>
                    ):(
                        <TableBody>
                            {documents.map((doc)=>{
                                return <DocumentRow key={doc._id} document={doc}/>
                            })}
                        </TableBody>
                    )}
                    
                </Table>
            </div>
          )}
          <div className="flex  items-center justify-center">
            <Button variant={"ghost"} size={"sm"} onClick={()=>loadMore(5)} disabled={status!=="CanLoadMore"}>
                {status=="CanLoadMore"?"Load More":"End Of Results"}
            </Button>
          </div>
    </div>
}