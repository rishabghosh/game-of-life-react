import React, { useEffect, useState } from "react";

import nextGeneration from "./golLib.js";
import "./App.css";

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
  const [isAlive, setIsAlive] = useState(false);

  const toggleState = function() {
    if (props.hasStarted) return;
    setIsAlive(!isAlive);
    const id = getCellCoordFromId(props.id);
    INITIAL_GEN.push(id);
  };

  if (props.hasStarted && isAlive !== props.isAlive) {
    setIsAlive(props.isAlive);
  }

  const backgroundColor = isAlive ? COLOURS.marked : COLOURS.unmarked;

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
    result.push(
      <Cell
        id={ID}
        color={COLOURS_OF_CELLS[ID]}
        hasStarted={props.hasStarted}
        isAlive={props.liveCellIDs.includes(ID)}
      />
    );
  }
  return <div className="row">{result}</div>;
};

const Table = function(props) {
  const result = [];
  for (let index = 0; index < 10; index++) {
    result.push(
      <Row
        id={index}
        hasStarted={props.hasStarted}
        liveCellIDs={props.liveCellIDs}
      />
    );
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

const resetColorOfCells = function() {
  const allIds = Object.keys(COLOURS_OF_CELLS);
  allIds.forEach(id => {
    COLOURS_OF_CELLS[id] = COLOURS.unmarked;
  });
};

const getLiveCellIDs = function(currentGen) {
  return currentGen.map(gen => gen[0] + "_" + gen[1]);
};

const App = function(props) {
  const [gen, setGen] = useState(INITIAL_GEN);
  const [hasStarted, setHasStarted] = useState(false);

  const runOnChange = function() {
    console.log("running", hasStarted);

    let intervalId;
    if (hasStarted) {
      intervalId = setInterval(() => {
        console.log("getting invoked");
        setGen(prevGen => nextGeneration(prevGen, props.bounds));
      }, 500);
    }

    return () => {
      console.log("interval got cleared", hasStarted);
      clearInterval(intervalId);
    };
  };

  useEffect(() => {
    if (!hasStarted) fillColourOfCells(props.bounds);
  });

  useEffect(runOnChange, [hasStarted]);

  useEffect(() => {
    updateColorOfCells(gen);
    return () => {
      resetColorOfCells();
    };
  });

  const start = function() {
    setHasStarted(true);
  };

  return (
    <main>
      <Table hasStarted={hasStarted} liveCellIDs={getLiveCellIDs(gen)} />
      <button onClick={start}>Start</button>
    </main>
  );
};

export default App;
