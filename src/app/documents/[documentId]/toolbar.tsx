"use client";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import { Separator } from "@/components/ui/separator";
import {  AlignCenterIcon, AlignJustifyIcon, AlignLeftIcon, AlignRightIcon, BoldIcon, ChevronDownIcon, HighlighterIcon, ImageIcon, ItalicIcon, Link2Icon, ListCollapseIcon, ListIcon, ListOrderedIcon, ListTodoIcon, LucideIcon, MessageSquarePlusIcon, MinusIcon, PlusIcon, PrinterIcon, Redo2Icon, RemoveFormattingIcon, SearchIcon, SpellCheck, StrikethroughIcon, UnderlineIcon, Undo2Icon, UploadIcon } from "lucide-react";

import { DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger } from "@/components/ui/dropdown-menu";


import { Dialog,DialogContent,DialogFooter,DialogHeader,DialogTitle } from "@/components/ui/dialog";

import {type Level} from "@tiptap/extension-heading"
import{ type ColorResult, SketchPicker} from "react-color"
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ToolBarBtnProps{
    onClick?:()=>void;
    isActive?:boolean;
    icon:LucideIcon;
}



const TextColorBtn = ()=>{
    const {editor} = useEditorStore()
    const value = editor?.getAttributes("textStyle").color ||"#000000";
    
    const onChange = (color:ColorResult)=>{
        editor?.chain().focus().setColor(color.hex).run()
    }


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="h-7 w-[120px] shrink-0 flex flex-col items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
                        <span className="text-xs">A</span>
                        <div className="h-0.5 w-full " style={{backgroundColor:value}}></div>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-0 ">
                <SketchPicker 
                color={value}
                onChange={onChange}
                />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const HighLightColorBtn = ()=>{
    const {editor} = useEditorStore()
    const value = editor?.getAttributes("highlight").color ||"#ffffff"
    const onChange = (color:ColorResult)=>{
        editor?.chain().focus().setHighlight({color:color.hex}).run()
    }
    

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="h-7 w-[120px] shrink-0 flex flex-col items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
                    <HighlighterIcon className="size-4"/>
                </button>

            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-0 ">
                <SketchPicker 
                onChange={onChange}
                color={value}
                />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const AlignButton = ()=>{
    const {editor} = useEditorStore()

    const alignments = [
        {
            label:"Align left",
            value:"left",
            icon:AlignLeftIcon,
        },
        {
            label:"Align center",
            value:"center",
            icon:AlignCenterIcon,
        },
        {
            label:"Align right",
            value:"right",
            icon:AlignRightIcon,
        },
        {
            label:"Align justify",
            value:"justify",
            icon:AlignJustifyIcon,
        },
    ]
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="h-7 w-[120px] shrink-0 flex flex-col items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
                    <AlignLeftIcon className="size-4"/>
                </button>

            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 flex flex-col gap-y-1 ">
                {
                    alignments.map(({label,value,icon:Icon})=>{
                        return <button className={
                            cn(
                                "flex items-center gap-x-2 px-2 py-1 rounded-sm  hover:bg-neutral-200/80",
                                editor?.isActive({textAlign:value})&& "bg-neutral-200/80"
                            )
                        }  key={value} onClick={()=>editor?.chain().focus().setTextAlign(value).run()}>
                            <Icon className="size-4"/>
                            <span className="text-sm">{label}</span>
                        </button>
                    })
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}


const ListButton = ()=>{
    const {editor} = useEditorStore()

    const lists = [
        {
            label:"bullet list",
            icon:ListIcon,
            isActive:()=>editor?.isActive("bulletList"),
            onClick:()=>editor?.chain().focus().toggleBulletList().run()
        },
        {
            label:"ordered list",
            icon:ListOrderedIcon,
            isActive:()=>editor?.isActive("orderedList"),
            onClick:()=>editor?.chain().focus().toggleOrderedList().run()

        },
        
    ]
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="h-7 w-[120px] shrink-0 flex flex-col items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
                    <ListIcon className="size-4"/>
                </button>

            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 flex flex-col gap-y-1 ">
                {
                    lists.map(({label,icon:Icon,onClick,isActive})=>{
                        return <button className={
                            cn(
                                "flex items-center gap-x-2 px-2 py-1 rounded-sm  hover:bg-neutral-200/80",
                                isActive()&& "bg-neutral-200/80"
                            )
                        }  key={label} onClick={onClick}>
                            <Icon className="size-4"/>
                            <span className="text-sm">{label}</span>
                        </button>


                    })
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}



const FontSizeBtn = ()=>{
    const {editor} = useEditorStore()
    const currentSize = editor?.getAttributes("textStyle").fontSize
    ?editor?.getAttributes("textStyle").fontSize.replace("px",""):"16px";


    const [fontSize,setFontSize] = useState(currentSize)
    const [inputValue,setInputValue] = useState(fontSize)
    const [isEditing,setIsEditing] = useState(false)

    const updateFontSize = (newSize:string)=>{
        const size = parseInt(newSize)

        if(!isNaN(size) && size>0 ){
            editor?.chain().focus().setFontSize(`${size}px`).run()
            setFontSize(newSize)
            setInputValue(newSize)
            setIsEditing(false)
        }
    }

    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setInputValue(e.target.value)
    }
   

    const handleInputBlur = ()=>{
        updateFontSize(inputValue)
    }

    const handleKeyDown =(e:React.KeyboardEvent<HTMLInputElement>)=>{
        if(e.key =="Enter"){
            e.preventDefault()
            updateFontSize(inputValue)
            editor?.commands.focus()
        }
    }
    const increment = ()=>{
        const newSize = parseInt(fontSize)+1;
        updateFontSize(newSize.toString())
    }
const decrement = ()=>{
        const newSize = parseInt(fontSize)-1;
        if(newSize>0){
            updateFontSize(newSize.toString())
        }
    }
    return (
        <div className="flex items-center gap-x-0.5">
            <button onClick={decrement} className="h-7 w-7 shrink-0 flex  items-center justify-between rounded-sm bg-transparent focus:outline-none focus:ring-0">
                <MinusIcon className="size-4 " />
            </button>
            {
                isEditing?(
                    <input  type="text" value={inputValue} onChange={handleInputChange} onBlur={handleInputBlur} onKeyDown={handleKeyDown} className="border text-center  border-neutral-400 h-7 w-10 text-sm  rounded-sm hover:bg-neutral-200/80 "/>
                ):(
                    <button onClick={()=>{setIsEditing(true);setFontSize(currentSize)}} className="border text-center  border-neutral-400 h-7 w-10 text-sm  rounded-sm bg-transparent cursor-text">
                        {currentSize}
                    </button>
                )
            }
            <button onClick={increment} className="h-7 w-7 shrink-0 flex  items-center justify-between rounded-sm bg-transparent focus:outline-none focus:ring-0">
                <PlusIcon className="size-4 " />
            </button>
        </div>
    )
}
const AlignHeightButton = ()=>{
    const {editor} = useEditorStore()

    const lineHeights = [
        {
            label:"Default",
            value:"normal",
        },
        {
            label:"single",
            value:"1",
        },
        {
            label:"1.16",
            value:"1.16",
        },
        {
            label:"1.5",
            value:"1.5",
        },
        {
            label:"double",
            value:"2",
        },
    ]
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="h-7 w-[120px] shrink-0 flex flex-col items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
                    <ListCollapseIcon className="size-4"/>
                </button>

            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 flex flex-col gap-y-1 ">
                {
                    lineHeights.map(({label,value})=>{
                        return <button className={
                            cn(
                                "flex items-center gap-x-2 px-2 py-1 rounded-sm  hover:bg-neutral-200/80",
                                editor?.getAttributes("paragraph").lineHeight == value&& "bg-neutral-200/80"
                            )
                        }  key={value} onClick={()=>editor?.chain().focus().setLineHeight(value).run()}>
                            <span className="text-sm">{label}</span>
                        </button>
                    })
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}




const LinkButton =()=>{
    const {editor} = useEditorStore()
    const [value,setValue] = useState(editor?.getAttributes("link").href ||"")

    const onChange = (href:string)=>{
        editor?.chain().focus().extendMarkRange("link").setLink({href}).run()
        setValue("")
    }




        return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="h-7 w-[120px] shrink-0 flex flex-col items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
                    <Link2Icon className="size-4"/>
                </button>

            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-2.5 flex items-center gap-x-2">
                <Input placeholder="https://example.com" value={value} onChange={(e)=>setValue(e.target.value)}/>
                <Button onClick={()=>onChange(value)}>Apply</Button>
            </DropdownMenuContent>
        </DropdownMenu>
    )

}


const ImgButton =()=>{
    const {editor} = useEditorStore()
    const [imgUrl,setImgUrl] = useState("")
    const [isDialogOpen,setIsDialogOpen] = useState(false)

    const onChange = (src:string)=>{
        editor?.chain().focus().setImage({src}).run()
    }

    const onUpload = ()=>{
        const input = document.createElement("input")
        input.type = "file";
        input.accept = "image/*"
        input.onchange = (e)=>{
            const file  = (e.target as HTMLInputElement ).files?.[0]
            if(file){
                const imgUrl = URL.createObjectURL(file)
                onChange(imgUrl)
            }
        }

        input.click()

    }

    const handleImgUrlSubmit = ()=>{
        if(imgUrl){
            onChange(imgUrl)
            setImgUrl("")
            setIsDialogOpen(false)
        }
    }



        return (
            <>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="h-7 w-[120px] shrink-0 flex flex-col items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
                            <ImageIcon className="size-4"/>
                        </button>

                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={onUpload}>
                            <UploadIcon className="size-4 mr-2 "/>
                            Upload
                        </DropdownMenuItem>
                    
                        <DropdownMenuItem onClick={()=>setIsDialogOpen(true)}>
                            <SearchIcon className="size-4 mr-2 "/>
                            Paste Image Url
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Insert Image Url</DialogTitle>
                        </DialogHeader>
                        <Input placeholder="insert image url" value={imgUrl} onChange={(e)=>setImgUrl(e.target.value)} onKeyDown={(e)=>{
                            if(e.key =="Enter"){
                                handleImgUrlSubmit()
                            }
                        }}/>
                    <DialogFooter>
                        <Button onClick={handleImgUrlSubmit}>Insert</Button>
                    </DialogFooter>
                    </DialogContent>
                </Dialog>
            </>
    )

}

const FontFamilyBtn =()=>{
    const {editor}  = useEditorStore();
    const fonts = [
        {
            label:"Arial",
            value:"Arial"
        },
        {
            label:"Times New Roman",
            value:"Times new Roman"
        },
        {
            label:"Courier New",
            value:"Courier New"
        },
        {
            label:"Georgia",
            value:"Georgia"
        },
        {
            label:"Verdana",
            value:"Verdana"
        },
        
    ];
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className={cn(
                    "h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
                )}>
                    <span className="truncate">
                        {editor?.getAttributes("textStyle").fontFamily||"Arial"}
                    </span>
                    <ChevronDownIcon className="ml-2 size-4 shrink-0"/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
                {
                    fonts.map(({label,value})=>{
                        return <button key={value} className={cn(
                            "flex items-center px-2 py-1 gap-y-1 gap-x-2  rounded-sm hover:bg-neutral-200/80 ",
                            editor?.getAttributes("textStyle").fontFamily === value && "bg-neutral-200/80"

                        )}
                        style={{fontFamily:value}} onClick={()=>editor?.chain().focus().setFontFamily(value).run()}>
                            <span className="text-sm">{label}</span>
                        </button>
                    })
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const HeadingBtn = ()=>{
    const {editor} = useEditorStore()
    const headings = [
        {label:"Normal ",value:0,fontSize:"16px"},
        {label:"Heading 1 ",value:1,fontSize:"36px"},
        {label:"Heading 2",value:2,fontSize:"32px"},
        {label:"Heading 3",value:3,fontSize:"27px"},
        {label:"Heading 4",value:4,fontSize:"22px"},
        {label:"Heading 5",value:5,fontSize:"19px"},
        {label:"Heading 6",value:6,fontSize:"15px"},
    ]
    const getHead =()=>{
        for (let i = 1; i <= 6; i++) {
            if(editor?.isActive("heading",{i}))
                return `Heading ${i}`
        }
        return "Normal"
    }

    return <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className={cn(
                    "h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
                )}>
                    <span className="truncate">
                     {getHead()}
                    </span>
                    <ChevronDownIcon className="ml-2 size-4 shrink-0"/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex flex-col p-1 gap-y-1">
                {
                    headings.map(({label,value,fontSize})=>{
                        return <button key={value} style={{fontSize}} 
                           className={cn(
                            "flex items-center px-2 py-1 gap-y-1 gap-x-2  rounded-sm hover:bg-neutral-200/80",
                            !editor?.isActive("heading") || value ==0 || editor?.isActive("heading",{i:value}) && "bg-neutral-200/80"
                           )}
                        onClick={()=>{
                            if(value ==0){
                                editor?.chain().focus().setParagraph().run();
                            }else{
                                editor?.chain().focus().toggleHeading({level:value as Level}).run();
                                
                            }
                        }}>{label}</button>
                    })
                    
                }
            </DropdownMenuContent>
    </DropdownMenu>

}

const ToolBarButton  = ({
    onClick,
    isActive,
    icon:Icon,
}:ToolBarBtnProps)=>{
    return (
        <button onClick={onClick} className={cn(
            "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 ",
            isActive&&"bg-neutral-200/80" ,
            
        )} >

            <Icon className="size-4 "/>
        </button>
    )
} 

const Toolbar = () => {
    const {editor} = useEditorStore()
    const sections:{label:string;
        icon:LucideIcon;
        onClick:()=>void;
        isActive?:boolean
    }[][] = [
        [
            {
                label:"Undo",
                icon:Undo2Icon,
                onClick:()=>editor?.chain().focus().undo().run(),
            },{
                label:"Redo",
                icon:Redo2Icon,
                onClick:()=>editor?.chain().focus().redo().run(),
            },
            {
                label:"Print",
                icon:PrinterIcon,
                onClick:()=>window.print(),
            },
            {
                label:"Spell Check",
                icon:SpellCheck,
                onClick:()=>{
                    const current = editor?.view.dom.getAttribute("spellcheck");
                    editor?.view.dom.setAttribute("spellcheck",current ==="false"?"true":"false")
                },
            },
        ],
        [
            {
                label:"Bold",
                icon:BoldIcon,
                isActive:editor?.isActive("bold"),
                onClick:()=>editor?.chain().focus().toggleBold().run(),
            },
            {
                label:"Italic",
                icon:ItalicIcon,
                isActive:editor?.isActive("italic"),
                onClick:()=>editor?.chain().focus().toggleItalic().run(),
            },
            {
                label:"UnderLine",
                icon:UnderlineIcon,
                isActive:editor?.isActive("underline"),
                onClick:()=>editor?.chain().focus().toggleUnderline().run(),
            },
            {
                label:"Strike",
                icon:StrikethroughIcon,
                isActive:editor?.isActive("strike"),
                onClick:()=>editor?.chain().focus().toggleStrike().run(),
            },
        ],
        [
            {
                label:"comment",
                icon:MessageSquarePlusIcon,
                onClick:()=>editor?.chain().focus().addPendingComment().run(),
                isActive:editor?.isActive("liveblocksCommentMark"),
            },
            {
                label:"list todo",
                icon:ListTodoIcon,
                onClick:()=>editor?.chain().focus().toggleTaskList().run(),
                isActive:editor?.isActive("taskList"),
            },
            {
                label:"remove formatting",
                icon:RemoveFormattingIcon,
                onClick:()=>editor?.chain().focus().unsetAllMarks().run(),
            },
        ]
    ]

  return (
    <div className="bg-[#f1f4f9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-0.5 overflow-x-auto overflow-y-hidden">
        {
            sections[0].map(item=>{
                return <ToolBarButton key={item.label} {...item}/>
            })
        }
        <Separator orientation="vertical" className="h-6 bg-neutral-300 "/>
            {/* todo font family*/}
            <FontFamilyBtn/>
            {/* todo headings */}
            <HeadingBtn/>
        <Separator orientation="vertical" className="h-6 bg-neutral-300 "/>
            {/* todo font size */}
            <FontSizeBtn/>
        <Separator orientation="vertical" className="h-6 bg-neutral-300 "/>
            {
                sections[1].map(item=>{
                    return <ToolBarButton key={item.label} {...item}/>
                })
            }
            {/* text color  */}
            <TextColorBtn/>
            <Separator orientation="vertical" className="h-6 bg-neutral-300 "/>
            {/* highlight color */}
            <HighLightColorBtn/>
            {/* link */}
            <LinkButton/>
            {/* image */}
            <ImgButton/>
            {/* align */}
            <AlignButton/>
            {/* list*/}
            <ListButton/>
            {/* line height  */}
            <AlignHeightButton/>

            {
                sections[2].map((item)=>{
                    return <ToolBarButton key={item.label} {...item}/>
                })
            }
    </div>
  )
}

export default Toolbar