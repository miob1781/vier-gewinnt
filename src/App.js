import React from 'react';
// import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';

import {Menue} from './features/Menue/menue.js';
// import {Anzeige} from './features/Anzeige/anzeige.js';
import {Spiel} from './features/Spiel/spiel.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Gudea&family=Special+Elite&display=swap" rel="stylesheet" /> 

      <header className="App-header">
        <h1>Vier gewinnt!</h1>
        <p>Spiele eine Partie Vier gewinnt!</p>
         {/* 
        <img src={logo} className="App-logo" alt="logo" />
        <Counter /> 
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span> */}
      </header>
      <main> 
        <Menue /> {/*
        <Anzeige /> */
        <Spiel />}
      </main>
      <footer>
        <p>Created by Michael Oberst</p>
      </footer>
    </div>
  );
}

export default App;
