import React, { Component, useState } from "react";
import "./App.css";
import nextGeneration from "./golLib.js";

const COLOR = { marked: "black", unmarked: "white" };

const Cell = function() {
  const [cellState, setCellState] = useState(false);
  const [color, setCellColor] = useState(COLOR.unmarked);

  const toggleState = () => {
    setCellState(!cellState);
    if (color === COLOR.marked) {
      setCellColor(COLOR.unmarked);
    } else {
      setCellColor(COLOR.marked);
    }
  };
  console.log("cell state is ", cellState);
  console.log("cell color is ", color);
  return <div className="cell" style={{background: color}} onClick={toggleState} />;
};

const Row = function() {
  const result = [];
  for (let index = 0; index < 10; index++) {
    result.push(<Cell />);
  }
  return <div className="row">{result}</div>;
};

const Table = function() {
  const result = [];
  for (let index = 0; index < 10; index++) {
    result.push(<Row />);
  }
  return <div className="table">{result}</div>;
};

const App = function() {
  return (
    <main>
      <Table />
    </main>
  );
};

export default App;
