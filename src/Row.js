import React from "react";
import { Cell } from "./Cell";

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

export default Row;
