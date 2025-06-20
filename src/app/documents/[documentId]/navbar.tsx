"use client"

import Image from "next/image"
import Link from "next/link"
import { DocumentInput } from "./document-input"
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger
} from "@/components/ui/menubar"

import { BoldIcon, FileIcon, FileJsonIcon, FilePenIcon, FilePlusIcon, FileTextIcon, GlobeIcon,  ItalicIcon, PrinterIcon, Redo2Icon, RemoveFormattingIcon, Strikethrough, StrikethroughIcon, TextIcon, TrashIcon, UnderlineIcon, Undo2Icon } from "lucide-react"
import { BsFilePdf } from "react-icons/bs"
import { useEditorStore } from "@/store/use-editor-store"
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"

import { Avatars } from "./avatars"
import { Inbox } from "./inbox"
import { Doc } from "../../../../convex/_generated/dataModel"
import { useMutation } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { RemoveDialog, } from "@/components/remove-dialog"
import { RenameDialog } from "@/components/rename-dialog"
interface NavbarProps{
    data:Doc<"documents">;
}
export const Navbar = ({data}:NavbarProps)=>{
    const {editor} = useEditorStore()
    const insertTable = ({rows,cols}:{rows:number,cols:number})=>{
        editor?.chain()
        .focus()
        .insertTable({rows,cols,withHeaderRow:false}).
        run()
    }

const onDownload =(blob:Blob,filename:string) =>{
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    a.click()
}
const onSaveJson = ()=>{
    if(!editor)return;
    const content = editor.getJSON()
    const blob = new Blob([JSON.stringify(content)],{type:"application/json"})
    onDownload(blob,`${data.title}.json`)// todo use document name


}
const onSaveHTML = ()=>{
    if(!editor)return;
    const content = editor.getHTML()
    const blob = new Blob([content],{type:"text/html"})
    onDownload(blob,`${data.title}.html`)// todo use document name
    

}


const onSaveText = ()=>{
    if(!editor)return;
    const content = editor.getText()
    const blob = new Blob([content],{type:"text/plain"})
    onDownload(blob,`${data.title}.txt`)// todo use document name
    

}

    const mutation = useMutation(api.documents.create)
    const router = useRouter()
    const onNewDoc = ()=>{
        mutation({
            title:"Untitled Document",
            initialContent:"",

        }).
        then((id)=>{
            toast.success("document created")
            router.push(`documents/${id}`)
        })
        .catch(()=>toast.error("something went wrong "))
    }


    return <nav className="flex items-center  justify-between">
        <div className="flex gap-2 items-center">
            <Link href={"/"}>
                <Image src={"/logo.svg"} alt="logo" width={36} height={36}/>
            </Link>
            <div className="flex flex-col">
                {/* document input */}
                <DocumentInput title={data.title} id={data._id}/>
                {/* menu bar */}
                <div className="flex">
                    <Menubar className="border-none bg-transparent shadow-none p-0 h-auto">
                        
                        <MenubarMenu>
                            <MenubarTrigger>
                                file
                            </MenubarTrigger>
                            <MenubarContent className="print:hidden">
                                <MenubarSub>
                                    <MenubarSubTrigger>
                                       <FileIcon className="size-4 mr-2"/>
                                        save
                                       </MenubarSubTrigger>
                                       <MenubarSubContent>
                                        <MenubarItem onClick={onSaveJson}>
                                            <FileJsonIcon className="size-4 mr-2"/>
                                            Json
                                        </MenubarItem>
                                        <MenubarItem onClick={onSaveHTML}>
                                            <GlobeIcon className="size-4 mr-2"/>
                                            Html
                                        </MenubarItem>
                                        <MenubarItem onClick={onSaveText}>
                                            <FileTextIcon className="size-4 mr-2"/>
                                            text
                                        </MenubarItem>
                                        <MenubarItem onClick={()=>window.print()}>
                                            <BsFilePdf className="size-4 mr-2"/>
                                            Pdf
                                        </MenubarItem>
                                       </MenubarSubContent>
                                </MenubarSub>
                                <MenubarItem onClick={onNewDoc}>
                                    <FilePlusIcon className="size-4 mr-2"/>
                                    New Document
                                </MenubarItem>
                                <MenubarSeparator/>
                                <RenameDialog documentId={data._id} initialTitle={data.title}>
                                    <MenubarItem onClick={(e)=>e.stopPropagation()} onSelect={(E)=>E.preventDefault()}>
                                        <FilePenIcon className="size-4 mr-2"/>
                                        Rename
                                    </MenubarItem>
                                </RenameDialog>
                                <RemoveDialog documentId={data._id}>
                                    <MenubarItem onClick={(e)=>e.stopPropagation()} onSelect={(E)=>E.preventDefault()}>
                                        <TrashIcon className="size-4 mr-2"/>
                                        Remove
                                    </MenubarItem>
                                </RemoveDialog>
                                <MenubarSeparator/>
                                <MenubarItem onClick={()=>window.print()}>
                                    <PrinterIcon className="size-4 mr-2"/>
                                    Print<MenubarShortcut>xp</MenubarShortcut>
                                </MenubarItem>
                            </MenubarContent>
                        </MenubarMenu>

                        <MenubarMenu>
                            <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                                Edit
                            </MenubarTrigger>
                            <MenubarContent>
                                <MenubarItem onClick={()=>editor?.chain().focus().undo().run()}>
                                    <Undo2Icon className="size-4 mr-2"/>
                                    Undo<MenubarShortcut>xZ</MenubarShortcut>
                                </MenubarItem>
                                <MenubarItem onClick={()=>editor?.chain().focus().redo().run()}>
                                    <Redo2Icon className="size-4 mr-2"/>
                                    Redo<MenubarShortcut>xY</MenubarShortcut>
                                </MenubarItem>
                            </MenubarContent>

                        </MenubarMenu>
                        <MenubarMenu>
                            <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                                Insert
                            </MenubarTrigger>
                            <MenubarContent>
                                <MenubarSub>
                                    <MenubarSubTrigger>
                                        Table    
                                    </MenubarSubTrigger>
                                    <MenubarSubContent>
                                        <MenubarItem onClick={()=>insertTable({rows:1,cols:1})}>
                                            1 x 1
                                        </MenubarItem>
                                        <MenubarItem onClick={()=>insertTable({rows:2,cols:2})}>
                                            2 x 2
                                        </MenubarItem>
                                        <MenubarItem onClick={()=>insertTable({rows:3,cols:3})}>
                                            3 x 3
                                        </MenubarItem>

                                        <MenubarItem onClick={()=>insertTable({rows:4,cols:4})}>
                                            4 x 4
                                        </MenubarItem>
                                    </MenubarSubContent>
                                </MenubarSub>
                            </MenubarContent>

                        </MenubarMenu>
                        <MenubarMenu>
                            <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                                Format
                            </MenubarTrigger>
                            <MenubarContent>
                                <MenubarSub>
                                    <MenubarSubTrigger>
                                        <TextIcon className="size-4 mr-2"/>
                                        Text
                                    </MenubarSubTrigger>
                                    <MenubarSubContent>
                                        <MenubarItem onClick={()=>editor?.chain().focus().toggleBold().run()}>
                                            <BoldIcon className="size-4 mr-2"/>
                                            Bold <MenubarShortcut>xB</MenubarShortcut>
                                        </MenubarItem >
                                        <MenubarItem onClick={()=>editor?.chain().focus().toggleItalic().run()}>
                                            <ItalicIcon className="size-4 mr-2"/>
                                            Italic<MenubarShortcut>xI</MenubarShortcut>
                                        </MenubarItem>
                                        <MenubarItem onClick={()=>editor?.chain().focus().toggleUnderline().run()}>
                                            <UnderlineIcon className="size-4 mr-2"/>
                                            Underline<MenubarShortcut>xU</MenubarShortcut>
                                        </MenubarItem>
                                        <MenubarItem onClick={()=>editor?.chain().focus().toggleStrike().run()}>
                                            <StrikethroughIcon className="size-4 mr-2"/>
                                            Strike Throw<MenubarShortcut>xS</MenubarShortcut>
                                        </MenubarItem>
                                        
                                    </MenubarSubContent>
                                </MenubarSub>
                                <MenubarSub>
                                    <MenubarItem onClick={()=>{editor?.chain().focus().unsetAllMarks().run()}}>
                                      <RemoveFormattingIcon className="size-4 mr-2"/>
                                      Clear Formatting
                                    </MenubarItem>
                                </MenubarSub>
                            </MenubarContent>

                        </MenubarMenu>




                    </Menubar>
                </div>

            </div>
        </div>
         <div className="flex gap-3 items-center pl-6  flex-wrap">
            <Avatars/>
            <Inbox/>
            <OrganizationSwitcher 
            afterCreateOrganizationUrl={"/"} 
            afterLeaveOrganizationUrl="/" 
            afterSelectOrganizationUrl={"/"}
            afterSelectPersonalUrl={"/"}/>
            <UserButton/>
        </div>
    </nav>
}