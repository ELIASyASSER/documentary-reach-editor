import {BsCloudCheck, BsCloudSlash} from "react-icons/bs"
import { Id } from "../../../../convex/_generated/dataModel"
import { useRef, useState } from "react"
import { useMutation } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import { Input } from "@/components/ui/input"
import { UseDebounce } from "@/hooks/use-debounce"
import { toast } from "sonner"
import { useStatus } from "@liveblocks/react"
import { LoaderIcon } from "lucide-react"
interface DocInputProps{
    title:string,
    id:Id<"documents">
}
export const DocumentInput =({title,id}:DocInputProps)=>{

    const status = useStatus()

    const [value,setValue] = useState(title)
    const [isPending,setIsPending] = useState(false)
    const [isEditing,setIsEditing] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const mutate = useMutation(api.documents.updateById)
    
    const deboundedupdate = UseDebounce((newValue:string)=>{
        if(newValue == title){return}
        setIsPending(true)
        mutate({id,title:newValue})
        .then(()=>{
            toast.success("document updated",{position:"top-center"})
        })
        .catch(()=>toast.error("something went wrong",{position:"top-center"}))
        .finally(()=>setIsPending(false))
    })
    
    const onChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const newVal=  e.target.value
        setValue(newVal)
        //to do debounced value
        deboundedupdate(newVal)
    
    }
    const onSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        setIsPending(true)
        mutate({id,title:value})
        .then(()=>{
            toast.success("document updated",{position:"top-center"})
        })
        .then(()=>setIsEditing(false))
        .catch(()=>toast.error("something went wrong",{position:"top-center"}))
        .finally(()=>setIsPending(false))
    }


    const showLoader = isPending || status =="connecting" ||status=="reconnecting";
    const showError = status =="disconnected"
    {!showError &&!showLoader && <BsCloudCheck/>}// eslint-disable-line @typescript-eslint/no-unused-expressions
    {showLoader && <LoaderIcon className="size-4 animate-spin text-muted-foreground"/>}// eslint-disable-line @typescript-eslint/no-unused-expressions
    {showError && <BsCloudSlash className="size-4"/>}// eslint-disable-line @typescript-eslint/no-unused-expressions
    return <div className="flex items-center gap-2">
        {isEditing?(
            <form className="relative w-fit max-w-[50ch]" onSubmit={onSubmit}>
                <span className="invisible whitespace-pre px-1.5  text-lg" aria-hidden>
                    {value ||" "}
                </span>
                    <Input ref={inputRef} value={value} placeholder="enter name" 
                    onChange={onChange}
                    onBlur={()=>setIsEditing(false)}
                    className="absolute inset-0 text-lg text-black px-1.5 bg-transparent truncate"
                    
                    />
            </form>
        ):(
            <span 
            onClick={()=>{
                        setIsEditing(true)
                        setTimeout(() => {
                            inputRef.current?.focus()
                        }, 0);
                    }}
            className="text-lg px-1.5 cursor-pointer truncate">{title}</span>
        )
        }
        <BsCloudCheck/>
    </div>
}