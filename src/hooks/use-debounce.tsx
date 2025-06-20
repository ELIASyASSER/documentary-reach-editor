import { useCallback,useRef } from "react";

export function UseDebounce<T extends (...args:Parameters<T>)=>ReturnType<T>,
>(callback:T,delay:number = 500){
    const timeOUtRef  = useRef<NodeJS.Timeout>(null)
    return useCallback(
    (...args:Parameters<T>)=>{
        if(timeOUtRef.current){
            clearTimeout(timeOUtRef.current)
        }

        timeOUtRef.current = setTimeout(() => {
            callback(...args)
        }, delay);

    },[callback,delay]
    
    )
}