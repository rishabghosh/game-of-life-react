import React, { useEffect, useState } from "react";

import { INITIAL_GEN } from "./Cell";

import World from "./World";

import { getLiveCellIDs, getCellsPerRow, getRows } from "./viewUtils";

import nextGeneration from "./golLib.js";

import "./App.css";

const LABEL = { start: "Start", pause: "Pause", resume: "Resume" };

const App = function(props) {
  const [gen, setGen] = useState(INITIAL_GEN);
  const [hasStarted, setHasStarted] = useState(false);
  const [hasPaused, setHasPaused] = useState(false);
  const [buttonText, setButtonText] = useState(LABEL.start);

  const runOnChange = function() {
    let intervalId;
    if (hasStarted && !hasPaused) {
      intervalId = setInterval(() => {
        setGen(prevGen => nextGeneration(prevGen, props.bounds));
      }, 500);
    }

    return () => {
      clearInterval(intervalId);
    };
  };

  useEffect(runOnChange, [hasStarted, hasPaused]);

  const start = function() {
    hasStarted && !hasPaused
      ? setButtonText(LABEL.resume)
      : setButtonText(LABEL.pause);
    hasStarted ? setHasPaused(!hasPaused) : setHasStarted(true);
    console.log(hasPaused);
  };

  return (
    <main>
      <World
        hasStarted={hasStarted}
        liveCellIDs={getLiveCellIDs(gen)}
        rows={getRows(props.bounds)}
        cellsPerRow={getCellsPerRow(props.bounds)}
      />
      <button onClick={start}>{buttonText}</button>
    </main>
  );
};

export default App;
