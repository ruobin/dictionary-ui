import React, { useState } from 'react';
import './App.css';
import { submitData } from './api/api';

function App() {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [fromLang, setFromLang] = useState('');
  const [toLang, setToLang] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await submitData(fromLang, toLang, inputText);
      setResult(response);
    } catch (error) {
      setResult('Error: ' + error.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Dictionary Powered by AI</h1>
      </header>
      <main className="App-main">
        <form onSubmit={handleSubmit}>
          <label for="from">From:</label>
          <select value={fromLang} onChange={(e) => setFromLang(e.target.value)}>
            <option value="English">English</option>
            <option value="Chinese">Chinese</option>
            <option value="Japanese">Japanese</option>
            <option value="Korean">Korean</option>
            <option value="French">French</option>
            <option value="Spanish">Spanish</option>
            <option value="German">German</option>
            <option value="Italian">Italian</option>
            <option value="Portuguese">Portuguese</option>
            <option value="Russian">Russian</option>
            <option value="Arabic">Arabic</option>
            <option value="Hindi">Hindi</option>
            <option value="Bengali">Bengali</option>
            <option value="Dutch">Dutch</option>
            <option value="Polish">Polish</option>
            <option value="Turkish">Turkish</option>
            <option value="Vietnamese">Vietnamese</option>
            <option value="Thai">Thai</option>
            <option value="Indonesian">Indonesian</option>
            <option value="Malay">Malay</option>
            <option value="Filipino">Filipino</option>
          </select>
          <label for="to">To:</label>
          <select value={toLang} onChange={(e) => setToLang(e.target.value)}>
            <option value="English">English</option>
            <option value="Chinese">Chinese</option>
            <option value="Japanese">Japanese</option>
            <option value="Korean">Korean</option>
            <option value="French">French</option>
            <option value="Spanish">Spanish</option>
            <option value="German">German</option>
            <option value="Italian">Italian</option>
            <option value="Portuguese">Portuguese</option>
            <option value="Russian">Russian</option>
            <option value="Arabic">Arabic</option>
            <option value="Hindi">Hindi</option>
            <option value="Bengali">Bengali</option>
            <option value="Dutch">Dutch</option>
            <option value="Polish">Polish</option>
            <option value="Turkish">Turkish</option>
            <option value="Vietnamese">Vietnamese</option>
            <option value="Thai">Thai</option>
            <option value="Indonesian">Indonesian</option>
            <option value="Malay">Malay</option>
            <option value="Filipino">Filipino</option>
          </select>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask AI the word..."
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Thinking...' : 'Submit'}
          </button>
        </form>
        {result && (
          <div className="result">
            <h3>Word:</h3>
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
