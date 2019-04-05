import React, { useEffect, useState } from "react";

import nextGeneration from "./golLib.js";
import "./App.css";

const INITIAL_GEN = [];
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

const getLiveCellIDs = function(currentGen) {
  return currentGen.map(genId);
};

const App = function(props) {
  const [gen, setGen] = useState(INITIAL_GEN);
  const [hasStarted, setHasStarted] = useState(false);

  const runOnChange = function() {
    let intervalId;
    if (hasStarted) {
      intervalId = setInterval(() => {
        setGen(prevGen => nextGeneration(prevGen, props.bounds));
      }, 500);
    }

    return () => {
      clearInterval(intervalId);
    };
  };

  useEffect(runOnChange, [hasStarted]);

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
