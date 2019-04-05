import React, { useState } from "react";

const INITIAL_GEN = [];
const COLOURS = { marked: "black", unmarked: "white" };

const getIndex = function(_2dArray, cell) {
  for (let index = 0; index < _2dArray.length; index++) {
    const subArr = _2dArray[index];
    if (subArr[0] === cell[0] && subArr[1] === cell[1]) {
      return index;
    }
  }
  return -1;
};

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
