"use client"

import { Button } from "@/components/ui/button"
import { AlertTriangleIcon } from "lucide-react"
import Link from "next/link"
interface ErrorProps{
error:Error&{digest?:string},
reset:()=>void
}
const ErrorPage =({error,reset}:ErrorProps)=>{
    return <div className="min-h-screen flex flex-col items-center justify-center space-y-6">
        <div className="text-center space-y-4">
            <div className="flex justify-center">
                <div className="bg-rose-100 p-3 rounded-full">
                <AlertTriangleIcon className="size-10 text-rose-600"/>
                </div>
            </div>
            <div className="space-y-2">
                <h2 className="text-lg font-semibold text-gray-900">Something went wrong</h2>
                <p>{error.message}</p>
            </div>
            <div className="flex items-center gap-x-3 justify-center">
                <Button className="font-medium px-6" onClick={reset}>Try Again</Button>
                <Button className="font-medium px-6" asChild 
                variant={"ghost"}>
                    <Link href={"/"}>Go Back</Link>
                </Button>
            </div>
        </div>
    </div>
}

export default ErrorPage