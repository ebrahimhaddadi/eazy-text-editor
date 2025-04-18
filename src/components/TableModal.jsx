import { useState } from "react";

const TableModal = ({ editor, setIsTableModalOpen }) => {

    const [rows, setRows] = useState(2);
  
    const [cols, setCols] = useState(3);
  
  
  
    const insertTable = () => {
  
      editor.chain().focus().insertTable({ rows, cols }).run();
  
      setIsTableModalOpen(false);
  
    };
  
  
  
    return (
  
      <div className="modal">
  
        <label>تعداد ردیف‌ها: <input type="number" value={rows} onChange={(e) => setRows(parseInt(e.target.value,10))} /></label>
  
        <label>تعداد ستون‌ها: <input type="number" value={cols} onChange={(e) => setCols(parseInt(e.target.value,10))} /></label>
  
        <button className="create-btn" onClick={insertTable}>ایجاد</button>
  
        <button onClick={() => setIsTableModalOpen(false)}>انصراف</button>
  
      </div>
  
    );
  
  };
  export default TableModal;