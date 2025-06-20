"use client"

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {FontFamily} from "@tiptap/extension-text-style"
import {TextStyle} from "@tiptap/extension-text-style"
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import Image from '@tiptap/extension-image'
import { Color } from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import Link from "@tiptap/extension-link"
import TextAlign from "@tiptap/extension-text-align"
import { FontSizeExtension } from '@/extensions/font-size'
import ImageResize from "tiptap-extension-resize-image"
import {Underline} from "@tiptap/extension-underline"
import { useEditorStore } from '@/store/use-editor-store';
import { LineHeightExtension } from '@/extensions/line-height'
import { useLiveblocksExtension, } from "@liveblocks/react-tiptap";
import { useStorage } from '@liveblocks/react'
import Ruler from './ruler'
import { Threads } from './threads'

interface EditorProps{
  initialContent:string|undefined
}

const Editor = ({initialContent}:EditorProps) => {
  const liveBlocks = useLiveblocksExtension({
    initialContent,
    offlineSupport_experimental:true
  })
  
  const {setEditor} = useEditorStore();
  const leftMargin = useStorage((root)=>root.leftMargin)
  const rightMargin = useStorage((root)=>root.rightMargin)
  
  
  const editor = useEditor({
      immediatelyRender:false,
      autofocus:true,
      onCreate({editor}){
        setEditor(editor);
      },
      onDestroy(){
        setEditor(null)
      },
      
      onUpdate({editor}){
        setEditor(editor)
      }
      ,
      onSelectionUpdate({editor}){
        setEditor(editor)
      },
      onTransaction({editor}){
        setEditor(editor)
      },
      onFocus({editor}){
        setEditor(editor)
      },
      onBlur({editor}){
        setEditor(editor)
      }
      ,
      onContentError({editor}){
        setEditor(editor)
      },
        editorProps:{
            attributes:{
                style:`padding-left:${leftMargin??56}px;padding-right:${rightMargin??56}px;`,
                class:"focus:outline-none print:border-0 bg-white border border-[#c7c7c7] flex flex-col min-h-[1045px] w-[816px] pt-10 pr-14 pb-10 cursor-text"
            }
        },
      extensions: [
        liveBlocks
        ,StarterKit.configure({
          history:false
        }),
        Link.configure({
          openOnClick:false,
          autolink:true,
          defaultProtocol:"https"
        })
        ,
        LineHeightExtension.configure({
          types:["heading","paragraph"],
          defaultLineHeight:"normal"
        }),
        Table,
        TextAlign.configure({
          types:["heading","paragraph"]
        }),
        Underline,
        FontSizeExtension,
        TableCell,
        TableHeader,
        TableRow,
        Image,
        FontFamily,
        TextStyle,
        ImageResize,
        Color,
        Highlight.configure({
          multicolor:true
        }),
        TaskItem.configure({
          nested:true
        }),
        TaskList
      ],
      content:`
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th colspan="3">Description</th>
            </tr>
            <tr>
              <td>Cyndi Lauper</td>
              <td>Singer</td>
              <td>Songwriter</td>
              <td>Actress</td>
            </tr>
          </tbody>
        </table>
      `,
      
    })
  return (
    <div className='size-full overflow-x-auto bg-[#f9fbfd] px-4 print:p-0 print:bg-white overflow-visible'>
        <Ruler/>
        <div className="min-w-max flex justify-center   mx-auto w-[816px] py-4 print:py-0 print:w-full print:min-w-0 ">
        <EditorContent editor={editor} />
        <Threads editor={editor}/>
        </div>

    </div>
  )
}

export default Editor