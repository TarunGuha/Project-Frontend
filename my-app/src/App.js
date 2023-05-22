import React, { useState, useEffect } from "react";
import axios from 'axios';
import './styles.css';

function App() {
  const [inputText, setInputText] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [utterance, setUtterance] = useState(null);

  const base_url = "http://34.238.193.169/"

  const endpoint = base_url + "get_caption"

  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(responseData);
    setUtterance(u);
    return () => {
      synth.cancel();
    };
  }, [responseData]);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handlePlay = () => {
    const synth = window.speechSynthesis;
    synth.speak(utterance);
  };

  const handleButtonClick = () => {
    axios
      .post(endpoint, { image_url: inputText })
      .then(response => {

        setResponseData(response.data);
        setError(null);
      })
      .catch(error => {

        setResponseData(null);
        setError(error.message);
      });
  };

  return (
    <div className="container">
      <h1>Image Caption Generator</h1>
      <div className="input">
      <label htmlFor="urlInput">Enter The URL : </label>
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
        />
      </div>
      <div className="dynamic_buttons">
        <button className="button" onClick={handleButtonClick}>Generate Caption</button>
        {responseData && <button className="button" onClick={handlePlay}>Speak</button>}
      </div>
      {inputText && <img className="image1" src={inputText} alt="User Image"/>}
      {responseData && <div className="response">Generated Caption : {responseData}</div>}
      {error && <div className="error">Error: {error}</div>}
    </div>
  );
}

export default App;