import React, { useState } from "react";
import { getCellCoordFromId, getIndex } from "./viewUtils";


const INITIAL_GEN = [];
const COLOURS = { marked: "black", unmarked: "white" };

const Cell = function(props) {
  const [isAlive, setIsAlive] = useState(false);

  const toggleState = function() {
    if (props.hasStarted) return;
    setIsAlive(!isAlive);
    const cell = getCellCoordFromId(props.id);
    if (getIndex(INITIAL_GEN, cell) !== -1) {
      const index = getIndex(INITIAL_GEN, cell);
      INITIAL_GEN.splice(index, 1);
      return;
    }
    INITIAL_GEN.push(cell);
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

export { INITIAL_GEN, Cell };
