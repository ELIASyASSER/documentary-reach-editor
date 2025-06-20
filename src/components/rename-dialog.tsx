"use client"

import { Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"

import { Id } from "../../convex/_generated/dataModel"
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface RenameDialogProps{
    documentId:Id<"documents">,
    children:React.ReactNode,
    initialTitle:string,
}

export const RenameDialog = ({documentId,children,initialTitle}:RenameDialogProps)=>{

const update   =useMutation(api.documents.updateById)
const [isUpdate,setIsUpdate] = useState(false)
const [title,setTitle] = useState(initialTitle)
const [open,setOpen] = useState(false)
const onSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    setIsUpdate(true)
    update({id:documentId,title:title.trim()||"Untitled"})
    .then(()=>setOpen(false))
    .then(()=>{toast.success("document updated",{position:"top-center"});})
    .catch(()=>{
        toast.error("only admin can modify docs",{position:"top-center"})
        setOpen(false)
        })
    .finally(()=>{setIsUpdate(false);})
}
    return <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            {children}
        </DialogTrigger>
        <DialogContent onClick={(e)=>{e.stopPropagation()}}>
            <form onSubmit={onSubmit}>
                <DialogHeader>
                    <DialogTitle>
                        Rename Document
                    </DialogTitle>
                    <DialogDescription> Enter a new name for this document</DialogDescription>
                </DialogHeader>
                <div className="my-4">
                    <Input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="document name" onClick={(e)=>e.stopPropagation()}/>
                </div>
                <DialogFooter>
                    <Button type="button" variant={"ghost"} disabled={isUpdate} onClick={(e)=>{e.stopPropagation();setOpen(false)}}>Cancel</Button>
                    <Button type="submit" disabled={isUpdate} onClick={(e)=>{e.stopPropagation();}}>Save</Button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>

}