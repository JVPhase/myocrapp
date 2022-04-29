import { useRef, useState, ChangeEvent } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Tesseract from 'tesseract.js';
import './App.css';

const Ocr = () => {
  const [lang, setLang] = useState('rus');
  const [text, setText] = useState('');
  const img = useRef<HTMLInputElement>(null);
  const changeLang = (e: ChangeEvent<HTMLSelectElement>) => {
    setLang(e.target.value);
  };
  const recognize = () => {
    const files = img.current?.files;
    if (files) {
      Tesseract.recognize(files[0], lang)
        .then((res) => {
          setText(res.data.text);
          return true;
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };
  return (
    <div>
      <h3>Text recognition</h3>
      <select value={lang} onChange={changeLang}>
        <option value="rus">Русский</option>
        <option value="eng">English</option>
      </select>
      <input type="file" ref={img} />
      <div id="log">{text}</div>
      <button type="button" onClick={recognize}>
        Начать обработку
      </button>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Ocr />} />
      </Routes>
    </Router>
  );
}
