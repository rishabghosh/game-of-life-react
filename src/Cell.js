import React, { useState } from "react";

const COLOR = { marked: "black", unmarked: "white" };
const CURRENT_BOARD = {};

const getCellCoordFromId = function(id) {
  const rowCellPair = id.split("_");
  const rowNumber = +rowCellPair[0];
  const cellNumber = +rowCellPair[1];
  return [rowNumber, cellNumber];
};

const getCurrentGen = function() {
  const currentGen = [];
  const allIds = Object.keys(CURRENT_BOARD);
  allIds.forEach(id => {
    const currentCell = getCellCoordFromId(id);
    if (CURRENT_BOARD[id]) currentGen.push(currentCell);
  });
  return currentGen;
};

const Cell = function(props) {
//   const [cellState, setCellState] = useState(false);
//   const [cellColor, setCellColor] = useState(COLOR.unmarked);

//   const toggleState = () => {
//     setCellState(!cellState);
//     if (cellColor === COLOR.marked) {
//       setCellColor(COLOR.unmarked);
//     } else {
//       setCellColor(COLOR.marked);
//     }
//   };

//   CURRENT_BOARD[props.id] = cellState;

//   console.log(CURRENT_BOARD[props.id]);
//   console.log("cell state is ", cellState);
//   console.log("cell color is ", cellColor);
//   console.log(CURRENT_BOARD);

  return (
    <div
      id={props.id}
      className="cell"
      style={{ background: props.color }}
    //   onClick={toggleState}
    />
  );
};

export default Cell;
