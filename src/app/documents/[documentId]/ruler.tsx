import { useRef, useState } from "react"

import {FaCaretDown} from "react-icons/fa"
import { useStorage,useMutation } from "@liveblocks/react"

const markers = Array.from({length:83},(_,i)=>i)
const Ruler = () => {
const leftMargin = useStorage((root)=>root.leftMargin)??56


const setLeftMargin = useMutation(({storage},position:number)=>{
    storage.set("leftMargin",position)
},[])
const rightMargin = useStorage((root)=>root.rightMargin)??56

const setRightMargin = useMutation(({storage},position:number)=>{
    storage.set("rightMargin",position)
},[])  
    
    const [isDraggingLeft,setIsDraggingLeft] = useState(false)
    const [isDraggingRight,setIsDraggingRight] = useState(false)
    
    const rullerRef = useRef<HTMLDivElement>(null)
    
    const handleLeftMouseDown = ()=>{
        setIsDraggingLeft(true)
    }

    const handleRightMouseDown = ()=>{
        setIsDraggingRight(true)
    }

    const handleMouseMove = (e:React.MouseEvent)=>{
        if((isDraggingLeft || isDraggingRight) && rullerRef.current){
            const container = rullerRef.current.querySelector("#ruler-container")
            if(container){
                const containerRect = container.getBoundingClientRect();

                const relativeX = e.clientX - containerRect.left
                const rowPos = Math.max(0,Math.min(816,relativeX))
                if(isDraggingLeft){
                    const maxLeftPos = 816 -rightMargin - 100
                    const newLeftPos = Math.min(rowPos,maxLeftPos)
                    setLeftMargin(newLeftPos)// make it collaborative
                }else if(isDraggingRight){
                    const maxRightPos = 816-(leftMargin+100)
                    const newRightPos = Math.max(816-rowPos,0)
                    const constraintRightPos = Math.min(newRightPos,maxRightPos)
                    setRightMargin(constraintRightPos)
                }
            }
        }
    }
    const handleMouseUp =()=>{
        setIsDraggingLeft(false)
        setIsDraggingRight(false)
    }
    const handleLeftDoubleClick  =()=>{
        setLeftMargin(56)
    }
    const handleRightDoubleClick  =()=>{
        setRightMargin(56)
    }

  return (
    <div className="w-[816px] mx-auto h-6 border-b  border-gray-300 flex items-end relative select-none print:hidden" ref={rullerRef} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
        <div id="ruler-container" className=" w-full h-full relative">
            <Marker position={leftMargin} isLeft={true} isDragging={isDraggingLeft} onMouseDown={handleLeftMouseDown} onDoubleClick={handleLeftDoubleClick}/>
            <Marker position={rightMargin} isLeft={false} isDragging={isDraggingRight} onMouseDown={handleRightMouseDown} onDoubleClick={handleRightDoubleClick} />

            <div className="absolute inset-x-0 bottom-0 h-full">
                <div className="relative h-full w-[816px] ">
                {
                    markers.map((marker)=>{
                        const pos = (marker*816 )/82;
                        return (
                            <div className="absolute bottom-0 " style={{left:`${pos}px`}} key={marker}>
                                {marker%10 === 0 &&(
                                    <>
                                        <div className="absolute bottom-0 w-[1px] h-3 bg-neutral-500"/>
                                        <span className="absolute bottom-2  text-[10px] text-neutral-500 transform -translate-x-1/2">{(marker/10) +1}</span>
                                    </>

                                )}
                                {marker%5 ==0  && marker%10 !=0 && (
                                    <div className="absolute bottom-0 w-[1px]  h-2.5 bg-neutral-500"/>
                                )}
                                {
                                    marker%5 !==0 &&(
                                        <div className="absolute bottom-0 w-[1px]  h-1 bg-neutral-500"/>
                                    )
                                }
                            </div>
                        )
                        
                    })
                    
                    }
                </div>
            </div>



        </div>
    </div>
  )
}
interface MarkerProps{
    position:number,
    isLeft:boolean,
    isDragging:boolean,
    onMouseDown:()=>void,
    onDoubleClick:()=>void
}
const Marker = ({
    position,
    isLeft,
    onMouseDown,
    onDoubleClick,
    isDragging
}:MarkerProps)=>{
    return <div className="absolute top-0 w-4 h-full cursor-ew-resize z-[5] group -ml-2 " 
    style={{[isLeft?"left":"right"]:`${position}px`}}
    onMouseDown={onMouseDown}
    onDoubleClick={onDoubleClick}

    >
        <FaCaretDown className="absolute left-1/2 top-0 h-full fill-blue-500 transform -translate-x-1/2"/>
        <div className="absolute left-1/2 top-4 transform -translate-x-1/2  " style={{
            height:"100vh",
            width:"1px",
            transform:"scaleX(0.5)",
            backgroundColor:"#3b82f6",
            display:isDragging?"block":"none"
        }}/>
    </div> 
}

export default Ruler