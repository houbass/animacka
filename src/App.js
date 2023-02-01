import React,{useState, useEffect} from "react";
import './App.css';

import Canvas from "./components/Canvas";
import Nadpis from "./components/Nadpis";


function App() {


  return (
    <div className="App">
      <Canvas />
      <Nadpis />
    </div>
  );
}

export default App;
