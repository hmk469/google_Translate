import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [options, setOptions] = useState([]);
  const [to, setTo] = useState("en");
  const [from, setFrom] = useState("en");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  useEffect(() => {
    axios.get("https://libretranslate.de/languages", {
      headers: { 'Accept': "application/json" }
    })
    .then(res => {
      setOptions(res.data);
    });
  }, []);

  const handleTranslate = async () => {
    try {
      const params = new URLSearchParams();
      params.append('q',input);
      params.append('source',from);
      params.append('target',to);
      params.append('api_key','xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')
      const response = await axios.post("https://libretranslate.de/translate",params, { // Change this to your server endpoint
        q: input,
        source: from,
        target: to,
      });

      // Process the response from your server as needed
      console.log(response.data.translatedText);
      setOutput(response.data.translatedText);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="App">
      <div>
        From:({from})
        <select onChange={e => setFrom(e.target.value)}>
          {options.map(opt => <option key={opt.code} value={opt.code}>{opt.name}</option>)}
        </select>
        To: ({to})
        <select onChange={e => setTo(e.target.value)}>
          {options.map(opt => <option key={opt.code} value={opt.code}>{opt.name}</option>)}
        </select>
      </div>
      <div>
        <textarea
          cols="50"
          rows="8"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
      </div>
      <div>
        <textarea
          cols="50"
          rows="8"
          value={output}
          onChange={e => setOutput(e.target.value)}
        />
      </div>
      <div>
        <button onClick={handleTranslate}>Translate</button>
      </div>
    </div>
  );
}

export default App;
