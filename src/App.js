import React, { useEffect, useState } from "react";
import { INITIAL_GEN, Cell } from "./Cell";
import { getLiveCellIDs } from "./viewUtils";
import nextGeneration from "./golLib.js";
import "./App.css";

const Row = function(props) {
  const result = [];
  for (let index = 0; index < props.cellsPerRow; index++) {
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
  for (let index = 0; index < props.rows; index++) {
    result.push(
      <Row
        id={index}
        hasStarted={props.hasStarted}
        liveCellIDs={props.liveCellIDs}
        cellsPerRow={props.cellsPerRow}
      />
    );
  }
  return <div className="table">{result}</div>;
};

const getRows = function(bound) {
  return bound.bottomRight[0] - bound.topLeft[0];
};

const getCellsPerRow = function(bound) {
  return bound.bottomRight[1] - bound.topLeft[1];
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
      <Table
        hasStarted={hasStarted}
        liveCellIDs={getLiveCellIDs(gen)}
        rows={getRows(props.bounds)}
        cellsPerRow={getCellsPerRow(props.bounds)}
      />
      <button onClick={start}>Start</button>
    </main>
  );
};

export default App;
