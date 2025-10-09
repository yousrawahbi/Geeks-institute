import React, { useState } from 'react';
import './App.css';

function App() {
  const [languages, setLanguages] = useState([
    { name: "Php", votes: 0 },
    { name: "Python", votes: 0 },
    { name: "JavaScript", votes: 0 },
    { name: "Java", votes: 0 },
  ]);

  const handleVote = (index) => {
    const updated = [...languages];
    updated[index].votes += 1;
    setLanguages(updated);
  };

  return (
    <div className="container">
      <h1>Vote For Your Favorite Language</h1>
      <div className="card-container">
        {languages.map((lang, i) => (
          <div className="card" key={i}>
            <h2>{lang.name}</h2>
            <p>{lang.votes} votes</p>
            <button onClick={() => handleVote(i)}>Vote</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

