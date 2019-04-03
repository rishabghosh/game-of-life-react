import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const FIRST_GEN = [[1, 2], [2, 0], [2, 2], [3, 1], [3, 2]];
const BOUNDS = { topLeft: [0, 0], bottomRight: [9, 9] };

ReactDOM.render(
  <App gen={FIRST_GEN} bounds={BOUNDS} />,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
