import React, { Component } from "react";
import "./App.css";

const BOUNDS = { topLeft: [1, 1], bottomRight: [4, 4] };

const CURRENT_GENERATION = [
  [1, 2],
  [1, 3],
  [2, 1],
  [2, 4],
  [3, 2],
  [3, 4],
  [4, 3]
];

const CELL_HEIGHT_IN_PX = 20;
const CELL_WIDTH_IN_PX = 20;

const inPixel = (arg) => arg + "px";

const styleCell = function(){
  const height = inPixel(CELL_HEIGHT_IN_PX);
  const width = inPixel(CELL_WIDTH_IN_PX);
  const style  = {height ,width};
  return style;
}

const styleRow = function(){
  const height = inPixel(CELL_HEIGHT_IN_PX);
  const width  = inPixel(CELL_WIDTH_IN_PX * getDimension(BOUNDS).width);
  const style = { height , width};
  return style;
}

const getDimension = function(bounds) {
  const { topLeft, bottomRight } = bounds;
  const height = bottomRight[0] - topLeft[0];
  const width = bottomRight[1] - topLeft[0];
  const dimension = { height, width };
  return dimension;
};

const getWidth = function(bounds) {
  const { width } = getDimension(bounds);
  return new Array(width).fill(0);
};

const getHeight = function(bounds) {
  const { height } = getDimension(bounds);
  return new Array(height).fill(0);
};

class Cell extends Component {
  render() {
    return <div style={styleCell()} className="cell" />;
  }
}

class Row extends Component {
  constructor(props) {
    super(props);
    this.width = getWidth(BOUNDS);
  }

  render() {
    return (
      <div className="row" style={styleRow()}>
        {this.width.map(cell => (
          <Cell />
        ))}
      </div>
    );
  }
}

class Field extends Component {
  constructor(props) {
    super(props);
    this.height = getHeight(BOUNDS);
  }
  render() {
    return (
      <div className="field">
        {this.height.map(row => (
          <Row />
        ))}
      </div>
    );
  }
}

class ViewPort extends Component {
  render() {
    return (
      <main>
        <Field />
      </main>
    );
  }
}

class App extends Component {
  render() {
    return <ViewPort />;
  }
}

export default App;
