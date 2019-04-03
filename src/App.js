import React, { Component, useState } from "react";
import "./App.css";
import nextGeneration from "./golLib.js";

const COLOR = { marked: "black", unmarked: "white" };
const CURRENT_BOARD = {};

const Cell = function(props) {
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

  CURRENT_BOARD[props.id] = cellState;

  console.log(CURRENT_BOARD[props.id]);
  console.log("cell state is ", cellState);
  console.log("cell color is ", color);
  console.log(CURRENT_BOARD);

  return (
    <div
      id={props.id}
      className="cell"
      style={{ background: color }}
      onClick={toggleState}
    />
  );
};

const Row = function(props) {
  const result = [];
  for (let index = 0; index < 10; index++) {
    result.push(<Cell id={props.id + "_" + index} />);
  }
  return <div className="row">{result}</div>;
};

const Table = function() {
  const result = [];
  for (let index = 0; index < 10; index++) {
    result.push(<Row id={index} />);
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
