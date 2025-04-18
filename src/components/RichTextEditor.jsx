import { useEditor, EditorContent,Editor } from '@tiptap/react';


import StarterKit from '@tiptap/starter-kit';

import Table from '@tiptap/extension-table';

import TableRow from '@tiptap/extension-table-row';

import TableCell from '@tiptap/extension-table-cell';

import TableHeader from '@tiptap/extension-table-header';

import Link from '@tiptap/extension-link';

import Image from '@tiptap/extension-image';

import Color from '@tiptap/extension-color';

import TextStyle from '@tiptap/extension-text-style';

// import Highlight from '@tiptap/extension-highlight';

import TextAlign from '@tiptap/extension-text-align';

import Underline from '@tiptap/extension-underline';

import Paragraph from '@tiptap/extension-paragraph';

import Document from '@tiptap/extension-document';

import Text from '@tiptap/extension-text';

import CodeBlock from '@tiptap/extension-code-block';

import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';

import {common, createLowlight} from "lowlight";




import FontFamily from '@tiptap/extension-font-family';

import { Highlight } from '../extensions/Highlight';

// import Superscript from '@tiptap/extension-superscript';

// import Subscript from '@tiptap/extension-subscript';



import { useState, useEffect } from 'react';



import './RichTextEditor.css';
import { Superscript } from '../extensions/Superscript';
import { Subscript } from '../extensions/Subscript';
import Toolbar from './Toolbar';
import {FontSizeWithClass} from "./../extensions/FontSizeWithClass"
import TableModal from "./TableModal";
import { TextColor } from '../extensions/TextColor';

const lowlight=createLowlight(common);






const RichTextEditor = ({ value = '<p>متن خود را اینجا بنویسید...</p>', onChange, direction = 'rtl' }) => {

  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const CustomPragraph=Paragraph.extend({
    addAttributes(){
      return {
        class:{
          default:null,
        }
      }
    }
  })
  

  


  const editor = useEditor({

    extensions: [
      
      Document,

      Text,

      StarterKit.configure({
        paragraph:false
      }),

      Superscript,

      Subscript.configure({
        HTMLAttributes:{
          class:"my-custom-class"
        }
      }),

      CustomPragraph,

      FontSizeWithClass,

      Table.configure({ resizable: true }),

      TableRow,

      TableCell,

      TableHeader,

      Link.configure({ openOnClick: true,autolink:true }),

      Image,

      TextStyle,

      Color,

      Highlight,

      TextAlign.configure({ types: ['heading', 'paragraph'],defaultAlignment:"right" }),
      
      Underline,

      FontFamily,

      CodeBlock,

      CodeBlockLowlight.configure({
        lowlight
      }),

      // TextColor,
  
    ],

    content: value,

    onUpdate: ({ editor }) => {

      if (onChange) onChange(editor.getHTML());

    },
    editorProps:{
      attributes:{
        dir:"rtl",
        style:'text-align:right;font-family: "Sego UI Emoji","Vazir","IranSans",sans-serif; '
      }
    }

  });






  useEffect(() => {

    if (editor && value !== editor.getHTML() && value !== editor.isDestroye) {

      editor.commands.setContent(value);

    }

  }, [value, editor]);



  if (!editor) return <div>is loading editor</div>;



  return (
<div className='main' >


    <div dir={direction} className="rich-text-editor">

      <Toolbar editor={editor} setIsTableModalOpen={setIsTableModalOpen} />

      {isTableModalOpen && (

        <>

          <div className="backdrop" onClick={() => setIsTableModalOpen(false)} />

          <TableModal editor={editor} setIsTableModalOpen={setIsTableModalOpen} />

        </>

      )}

      <EditorContent editor={editor} className="editor-content" />

    </div>
    </div>

  );

};












export default RichTextEditor;




















































// import React, { FC } from 'react';
// import {useEditor,EditorContent} from "@tiptap/react";
// import StarterKit from '@tiptap/starter-kit';
// import Toolbar from './Toolbar';
// import Table from '@tiptap/extension-table';
// import TableRow from '@tiptap/extension-table-row';
// import TableCell from '@tiptap/extension-table-cell';
// import TableHeader from '@tiptap/extension-table-header';
// import Link from '@tiptap/extension-link';

// const  RichTextEditor:FC=()=> {
//     const editor=useEditor({
//         extensions:[
//             StarterKit,
//             Table.configure({resizable:true}),
//             TableRow,
//             TableCell,
//             TableHeader,
//             Link.configure({openOnClick:false})

//         ],
//         content:'<p>This is sample text</p>',
//     });
//     if(!editor) return null;
//   return (
//     <div className='rich-text-editor' >
//         <Toolbar editor={editor} />  
//         <EditorContent editor={editor} />
//     </div>
//   )
// }

// export default  RichTextEditor




