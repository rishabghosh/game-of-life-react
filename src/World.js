import React from "react";
import Row from "./Row";

const World = function(props) {
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

export default World;
