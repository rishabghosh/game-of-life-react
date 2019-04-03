import React, { useEffect, useState } from "react";
import Cell from "./Cell";
import nextGeneration from "./golLib.js";
import "./App.css";

const Row = function(props) {
  const result = [];
  for (let index = 0; index < 10; index++) {
    const ID = props.id + "_" + index;
    result.push(<Cell id={ID} color={COLOURS_OF_CELLS[ID]} />);
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

const COLOURS_OF_CELLS = {};
const genId = cell => cell[0] + "_" + cell[1];

const fillColourOfCells = function(bounds) {
  const rows = bounds.bottomRight[0] - bounds.topLeft[0];
  const cellsPerRow = bounds.bottomRight[1] - bounds.topLeft[1];
  for (let i = 0; i <= rows; i++) {
    for (let j = 0; j <= cellsPerRow; j++) {
      const id = genId([i, j]);
      COLOURS_OF_CELLS[id] = "white";
    }
  }
};

const updateColorOfCells = function(cells) {
  for (let index = 0; index < cells.length; index++) {
    const cell = cells[index];
    const id = genId(cell);
    COLOURS_OF_CELLS[id] = "black";
  }
};

const App = function(props) {
  const [gen, setGen] = useState(props.gen);
  const updateGen = function() {
    const nextGen = nextGeneration(gen, props.bounds);
    setGen(nextGen);
  };

  const setUp = function(gen) {
    fillColourOfCells(props.bounds);
    updateColorOfCells(gen);
  };

  const runOnChange = function() {
    setUp(gen);
  };

  useEffect(runOnChange);

  return (
    <main>
      <Table />
      <button onClick={updateGen}>update</button>
    </main>
  );
};

export default App;
