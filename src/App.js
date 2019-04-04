import React, { useEffect, useState } from "react";

import nextGeneration from "./golLib.js";
import "./App.css";

let hasGameYetToStart = true;
const INITIAL_GEN = [];
const COLOURS_OF_CELLS = {};
const COLOURS = { marked: "black", unmarked: "white" };
const genId = cell => cell[0] + "_" + cell[1];



const getCellCoordFromId = function(id) {
  const rowCellPair = id.split("_");
  const rowNumber = +rowCellPair[0];
  const cellNumber = +rowCellPair[1];
  return [rowNumber, cellNumber];
};



const Cell = function(props) {
  const [cellColor, setCellColor] = useState(COLOURS.unmarked);

  const toggleState = function() {
    if (!hasGameYetToStart) return;

    COLOURS_OF_CELLS[props.id] === COLOURS.unmarked
      ? (COLOURS_OF_CELLS[props.id] = COLOURS.marked)
      : (COLOURS_OF_CELLS[props.id] = COLOURS.unmarked);

    cellColor === COLOURS.unmarked
      ? setCellColor(COLOURS.marked)
      : setCellColor(COLOURS.unmarked);
    const id = getCellCoordFromId(props.id);
    INITIAL_GEN.push(id);
  };

  let backgroundColor = props.color;
  if (hasGameYetToStart) {
    backgroundColor = cellColor;
  }

  return (
    <div
      id={props.id}
      className="cell"
      style={{ background: backgroundColor }}
      onClick={toggleState}
    />
  );
};

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

const fillColourOfCells = function(bounds) {
  const rows = bounds.bottomRight[0] - bounds.topLeft[0];
  const cellsPerRow = bounds.bottomRight[1] - bounds.topLeft[1];
  for (let i = 0; i <= rows; i++) {
    for (let j = 0; j <= cellsPerRow; j++) {
      const id = genId([i, j]);
      COLOURS_OF_CELLS[id] = COLOURS.unmarked;
    }
  }
};

const updateColorOfCells = function(cells) {
  for (let index = 0; index < cells.length; index++) {
    const cell = cells[index];
    const id = genId(cell);
    COLOURS_OF_CELLS[id] = COLOURS.marked;
  }
};

const App = function(props) {
  const [gen, setGen] = useState(INITIAL_GEN);
  const updateGen = function() {
    console.log("updating gen");
    const nextGen = nextGeneration(gen, props.bounds);
    setGen(nextGen);
  };

  const setUp = function(gen) {
    fillColourOfCells(props.bounds);
    updateColorOfCells(gen);
  };

  const tearDown = () => {
    hasGameYetToStart = false;
  };

  const runOnChange = function() {
    setUp(gen);
    return () => tearDown();
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
