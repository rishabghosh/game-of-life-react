import React, { useEffect, useState } from "react";
import {INITIAL_GEN, Cell} from "./Cell"
import {getLiveCellIDs} from "./viewUtils"
import nextGeneration from "./golLib.js";
import "./App.css";


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
