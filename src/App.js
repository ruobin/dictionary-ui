import React, { useState } from 'react';
import './App.css';
import { submitData, getAudioBuffer } from './api/api';

function App() {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState('');
  const [audioBuffer, setAudioBuffer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [fromLang, setFromLang] = useState({name: 'English', code: 'en-US'});
  const [toLang, setToLang] = useState({ name: 'English', code: 'en-US' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await submitData(fromLang.name, toLang.name, inputText);
      setResult(response);
      setAudioBuffer(null);
    } catch (error) {
      setResult('Error: ' + error.message);
    }
    setIsLoading(false);
  };

  const playAudio = async () => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const audioBufferSource = audioContext.createBufferSource();
      if (audioBuffer) {
        audioBufferSource.buffer = audioBuffer;
      } else {
        const response = await getAudioBuffer(fromLang.code, inputText);
        audioBufferSource.buffer = response;
        setAudioBuffer(response); 
      }
      audioBufferSource.connect(audioContext.destination);
      audioBufferSource.start();
    } catch (error) {
      setResult('Error: ' + error.message);
    }
    
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Dictionary Powered by AI</h1>
      </header>
      <main className="App-main">
        <form onSubmit={handleSubmit}>
          <label for="from">From:</label>
          <select value={fromLang.name} onChange={(e) => 
            setFromLang({name: e.target.value, code: e.target.options[e.target.selectedIndex].getAttribute('code')})
          }>
            <option value="English" code="en-US">English</option>
            <option value="Chinese" code="zh-CN">Chinese</option>
            <option value="Japanese" code="ja-JP">Japanese</option>
            <option value="Korean" code="ko-KR">Korean</option>
            <option value="French" code="fr-FR">French</option>
            <option value="Spanish" code="es-ES">Spanish</option>
            <option value="German" code="de-DE">German</option>
            <option value="Italian" code="it-IT">Italian</option>
            <option value="Portuguese" code="pt-BR">Portuguese</option>
            <option value="Russian" code="ru-RU">Russian</option>
            <option value="Arabic" code="ar-AR">Arabic</option>
            <option value="Hindi" code="hi-IN">Hindi</option>
            <option value="Bengali" code="bn-BD">Bengali</option>
            <option value="Dutch" code="nl-NL">Dutch</option>
            <option value="Polish" code="pl-PL">Polish</option>
            <option value="Turkish" code="tr-TR">Turkish</option>
            <option value="Vietnamese" code="vi-VN">Vietnamese</option>
            <option value="Thai" code="th-TH">Thai</option>
            <option value="Indonesian" code="id-ID">Indonesian</option>
            <option value="Malay" code="ms-MY">Malay</option>
            <option value="Filipino" code="fil-PH">Filipino</option>
          </select>
          <label for="to">To:</label>
          <select value={toLang.name} onChange={(e) => 
            setToLang({name: e.target.value, code: e.target.options[e.target.selectedIndex].getAttribute('code')})
          }>
            <option value="English" code="en-US">English</option>
            <option value="Chinese" code="zh-CN">Chinese</option>
            <option value="Japanese" code="ja-JP">Japanese</option>
            <option value="Korean" code="ko-KR">Korean</option>
            <option value="French" code="fr-FR">French</option>
            <option value="Spanish" code="es-ES">Spanish</option>
            <option value="German" code="de-DE">German</option>
            <option value="Italian" code="it-IT">Italian</option>
            <option value="Portuguese" code="pt-BR">Portuguese</option>
            <option value="Russian" code="ru-RU">Russian</option>
            <option value="Arabic" code="ar-AR">Arabic</option>
            <option value="Hindi" code="hi-IN">Hindi</option>
            <option value="Bengali" code="bn-BD">Bengali</option>
            <option value="Dutch" code="nl-NL">Dutch</option>
            <option value="Polish" code="pl-PL">Polish</option>
            <option value="Turkish" code="tr-TR">Turkish</option>
            <option value="Vietnamese" code="vi-VN">Vietnamese</option>
            <option value="Thai" code="th-TH">Thai</option>
            <option value="Indonesian" code="id-ID">Indonesian</option>
            <option value="Malay" code="ms-MY">Malay</option>
            <option value="Filipino" code="fil-PH">Filipino</option>
          </select>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask AI a word..."
            maxLength={50}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Thinking...' : 'Submit'}
          </button>
        </form>
        {result && (
          <div className="result">
            <h3>Word:</h3>
            <button onClick={playAudio}>Play Audio</button>
            <pre>{result.data.word}</pre>

            <h3>Explaination:</h3>
            <pre>{result.data.translation}</pre>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
