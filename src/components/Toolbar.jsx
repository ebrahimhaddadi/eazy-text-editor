 import TableGridPicker from './TableGridPicker';
 import { useState } from 'react';

 
 // eslint-disable-next-line @typescript-eslint/no-unused-vars
 import { FaBold,FaTh, FaItalic, FaStrikethrough, FaListUl, FaListOl, FaLink, FaImage, FaTable, FaUndo, FaRedo, FaAlignLeft, FaAlignCenter, FaAlignRight, FaAlignJustify,FaUnderline } from 'react-icons/fa';
import ColorPickerButton from './ColorPickerButton';
import { IoMdColorFill } from "react-icons/io";
import { TiArrowSortedDown } from "react-icons/ti";
import Picker from "emoji-picker-react";
import "./Toolbar.css";
import "./RichTextEditor.css"
 
 
 
 
 const Toolbar = ({ editor, setIsTableModalOpen }) => {
  const [textColor, setTextColor] = useState("");
  const [fontFamily, setFontFamily] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [url, setUrl] = useState(false);
  // console.log(editor.commands);
  const [showTableGrid, setShowTableGrid] = useState(false);

  const fontFamilies=[
    "Arial",
    "Time New Roma",
    "Tahoma",
    "IranSans",
    "Vazir"

  ]
  const addLink = () => {
    if(url){
      editor.chain().focus().toggleLink({ href: url }).run();
      setShowLinkInput(false);
      setUrl("");
    }
   


    

  };

const handleFontSize=(size)=>{
  
  
   editor.chain().focus().setFontSize(size).run();
}


const onHandleBtnToggel =(event,editor)=>{
  
  const item = editor.chain().focus();
  item.toggleSubscript().run();
}
const onHandleBtnToggelSuper =(event,editor)=>{
  const item = editor.chain().focus();
  item.toggleSuperscript().run();
}


  const handleImageUpload=(event)=>{
    const file=event.target.files[0];
    if(file){
      const reader=new FileReader();
      reader.onload=(e)=>{
        const base64=e.target.result;
        editor.chain().focus().setImage({src:base64}).run();
      };
      reader.readAsDataURL(file);
    }
  }
  
 
  const handleTableInsert=({rows,cols})=>{
      editor.chain().focus().insertTable({rows,cols,withHeaderRow:true}).run();
      setShowTableGrid(false)
  }
  const handleSetHighlight=(e)=>{
    console.log(e.target.value,"eee");
    console.log(editor.getAttributes("highlight"),"editor.chain().focus()");
    
    
    editor.chain().focus().setHighlight({ color: e.target.value }).run()
  }
  const handleFontFamily=(e)=>{
    editor.chain().focus().setFontFamily(e.target.value).run();
  }
  const handleColor=(e)=>{
    editor.chain().focus().setColor(e.target.value).run();
    setTextColor(e.target.value);
  }

  const onEmojiClick=(emojiObject)=>{
    editor.chain().focus().insertContent(emojiObject.emoji).run();
    setShowEmojiPicker(false);
  }
  const handleCodeBlock=()=>{
    console.log( editor.chain().focus().toggleCodeBlock());
    
    editor.chain().focus().toggleCodeBlock().run();
  }

  if(!editor){
    return null;
  }

  return (

    <div className="toolbar">

      <button onClick={() => editor.chain().focus().toggleBold().run()}><FaBold /></button> 

      <button onClick={() => editor.chain().focus().toggleItalic().run()}><FaItalic /></button>

       <button onClick={() => editor.chain().focus().toggleUnderline().run()}> <FaUnderline /></button> 

       <button onClick={() => editor.chain().focus().toggleStrike().run()}><FaStrikethrough /></button>

      <select
        className='option'
        onChange={(e) => {

          const level = parseInt(e.target.value);

          if (level) editor.chain().focus().toggleHeading({ level:level }).run();

          else editor.chain().focus().setParagraph().run();

        }}

      >

        <option value="">پاراگراف</option>

        <option value="1">H1</option>

        <option value="2">H2</option>

        <option value="3">H3</option>

        <option value="4">H4</option>

        <option value="5">H5</option>

        <option value="6">H6</option>

      </select>
      <select
        className='option'
        onChange={(e) => handleFontSize(e.target.value)}

      >

        <option value="">اندازه قلم</option>

        <option value="10px">10px</option>

        <option value="12px">12px</option>

        <option value="14px">14px</option>

        <option value="16px">16px</option>

        <option value="18px">18px</option>

        <option value="20px">20px</option>

        <option value="22px">22px</option>

        <option value="24px">24px</option>

        <option value="26px">26px</option>

        <option value="30px">30px</option>

        <option value="34px">34px</option>

        <option value="38px">38px</option>

        <option value="42px">42px</option>

        <option value="44px">44px</option>

      </select>

      <select
      className='option'
       onChange={(e)=>handleFontFamily(e)}
       value={editor.getAttributes("textStyle").setFontFamily}
       >
        <option className='option' value={""} disabled >انتخاب فونت</option>
        {
          fontFamilies.map((font)=>(
            <option key={font} value={font} >{font}</option>
          ))
        }
      </select>
      <div className='input-container' >
      {/* <IoMdColorFill /> */}
      
       <p style={{color:textColor,fontWeight:"bold",fontSize:18,}} >A</p>
      <input
        type="color"
        onChange={(e)=> handleColor(e)}
        value={editor.getAttributes('textStyle').color || '#000000'}
        className='color-input'
       />
      </div>
     
      {/* <ColorPickerButton editor={editor} /> */}
      <div className='input-container'>
     <IoMdColorFill /> 
      <input

        type="color"

        onChange={(e) => handleSetHighlight(e)}

        value={editor.getAttributes('highlight').color || '#ffffff'}

        className='highlight-input'

      />
      </div>
      <button
        className={editor.isActive("subscript") ? "is-active":""}
        onClick={(e)=>onHandleBtnToggel(e,editor)} 
        disabled={editor.isActive("subscript")}
       >
      x<sub>2</sub>

      </button>
       <button onClick={(e)=>onHandleBtnToggelSuper(e,editor)} title='Superscript'  >
        x<sup>2</sup>
      </button>
         {/*
      <button onClick={()=>execCom("subscript")} title='Subscript'  >
        x<sub>2</sub>
      </button> */}

       <button onClick={() => editor.chain().focus().setTextAlign('right').run()}><FaAlignRight/></button>

      <button onClick={() => editor.chain().focus().setTextAlign('center').run()}><FaAlignCenter /></button>

      <button onClick={() => editor.chain().focus().setTextAlign('left').run()}><FaAlignLeft /></button>

      <button onClick={() => editor.chain().focus().setTextAlign('justify').run()}><FaAlignJustify /></button>

      <button onClick={() => editor.chain().focus().toggleBulletList().run()}><FaListUl /></button>

      <button onClick={() => editor.chain().focus().toggleOrderedList().run()}><FaListOl /></button>

      <div style={{position:"relative",display:"inline-block"}} >
         <button 
         onClick={()=>setShowLinkInput(!showLinkInput)}
         className={editor.isActive("link")? "is-active":""}
         title='add link'
         >
          <FaLink/>
         </button>
      </div>
      {
        showLinkInput &&(
          <div style={{
            position:"absolute",
            zIndex:1000,
            background:"#fff",
            border:"1px solid #ccc",
            borderRadius:"4px",
            padding:"10px",
            display:"flex",
            flexDirection:"column",
            gap:"5px"
          }} >
             <input
               type='text'
               onChange={(e)=>setUrl(e.target.value)}
               placeholder='add link'
               style={{
                padding:"5px",
                border:"1px solid #ccc",
                borderRadius:"4px",
                width:"200px",
               }}
             
             />
             <div style={{display:"flex",gap:"5px",justifyContent:"center",alignItems:"center",marginTop:"4px"}} >
               <button
                 onClick={addLink}
                 style={{
                  padding:"5px 10px",
                  background:"#007bff",
                  color:"#fff",
                  border:"none",
                  borderRadius:"4px",
                  cursor:"pointer",
                  width:"55px"
                  
                 }}
               >اضافه</button>
               <button
                 onClick={()=>setShowLinkInput(false)}
                 style={{
                  padding:"5px 10px",
                  background:"#dc3545",
                  color:"#fff",
                  border:"none",
                  borderRadius:"4px",
                  cursor:"pointer",
                   width:"55px"
                 }}
               >حذف</button>
             </div>
          </div>
        )
      }
      

      <button >
      <label htmlFor='image-upload' style={{cursor:"pointer"}} >
         <FaImage />
      </label>
      <input
        id='image-upload'
        type='file'
        accept='image/'
        style={{display:"none"}}
        onChange={handleImageUpload}
      
      />

      </button>
      <div style={{ position: 'relative' }}>
      <button onClick={() => setShowTableGrid((prev) => !prev)}>
      <FaTh />
      </button>

      {showTableGrid && (
        <div style={{ position: 'absolute', top: '100%', left: 0, marginTop: '8px', zIndex: 100 }}>
          <TableGridPicker onSelect={handleTableInsert} />
        </div>
      )}
    </div>
      <button onClick={() => setIsTableModalOpen(true)}><FaTable /></button>

      <button onClick={() => editor.chain().focus().undo().run()}><FaUndo /></button>

      <button onClick={() => editor.chain().focus().redo().run()}><FaRedo /></button> 

      <div className='emoji-container' >
         <button
         title='select emoji'
         onClick={()=>setShowEmojiPicker(!showEmojiPicker)} >
             😄
         </button>
         {
          showEmojiPicker &&(
            <div className='modal-emoji' >
               <Picker onEmojiClick={onEmojiClick} /> 
            </div>
          )
         }
      </div>
      <button 
      title='code block'
       onClick={handleCodeBlock}
       className={editor.isActive("codeBlock") ? "is-active" : ""}
      >
         <code>{"</>"}</code>
      </button>

    </div>

  );

};

export default Toolbar;