"use client"
import { useRouter } from "next/navigation";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTrigger,
    AlertDialogTitle
} from "@/components/ui/alert-dialog"
import { Id } from "../../convex/_generated/dataModel"
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import {toast} from "sonner"
interface RemoveDialogProps{
    documentId:Id<"documents">,
    children:React.ReactNode;
}

export const RemoveDialog = ({documentId,children}:RemoveDialogProps)=>{
const router = useRouter()

    const remove   =useMutation(api.documents.deleteById)
const [isDeleting,setIsDeleting] = useState(false)
    return <AlertDialog>
        <AlertDialogTrigger asChild>
            {children}
        </AlertDialogTrigger>
        <AlertDialogContent onClick={(e)=>e.stopPropagation()}>
            <AlertDialogHeader>
                <AlertDialogTitle>Are You sure</AlertDialogTitle>
                <AlertDialogDescription>this action is not reverse you cant restore document</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel onClick={(e)=>e.stopPropagation()}>
                    Cancel
                </AlertDialogCancel>
                <AlertDialogAction disabled={isDeleting} onClick={(e)=>{
                    e.stopPropagation()
                    setIsDeleting(true)
                    remove({id:documentId})
                    .then(()=>{toast.success("document removed",{position:"top-center"})
                    router.replace("/")})
                    .catch(()=>{
                        toast.error("something went wrong you can't delete this doc",{position:"top-center"})
                        router.push("/")
                    }
                )
                    .finally(()=>setIsDeleting(false))
                    }}>
                    Delete
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
}