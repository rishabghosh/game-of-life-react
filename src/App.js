import React, { useEffect, useState } from "react";

import { INITIAL_GEN } from "./Cell";

import World from "./World";

import { getLiveCellIDs, getCellsPerRow, getRows } from "./viewUtils";

import nextGeneration from "./golLib.js";

import "./App.css";



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
      <World
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
