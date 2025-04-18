import {useState} from 'react';

import './App.css';
import RichTextEditor from './components/RichTextEditor';
// import "./styles/editors.css";

function App() {
  const [value, setvalue] = useState("")
  return (
    <div className="App">
      <RichTextEditor onChange={setvalue} value={value} direction='rtl' />
    </div>
  );
}

export default App;
