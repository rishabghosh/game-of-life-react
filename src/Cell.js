import React, { useState } from "react";

const COLOR = { marked: "black", unmarked: "white" };
const CURRENT_BOARD = {};



const getCurrentGen = function() {
  const currentGen = [];
  const allIds = Object.keys(CURRENT_BOARD);
  allIds.forEach(id => {
    const currentCell = getCellCoordFromId(id);
    if (CURRENT_BOARD[id]) currentGen.push(currentCell);
  });
  return currentGen;
};




