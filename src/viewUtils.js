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

const genId = cell => cell[0] + "_" + cell[1];

const getLiveCellIDs = function(currentGen) {
  return currentGen.map(genId);
};

const getRows = function(bound) {
  return bound.bottomRight[0] - bound.topLeft[0];
};

const getCellsPerRow = function(bound) {
  return bound.bottomRight[1] - bound.topLeft[1];
};


export { getIndex, getCellCoordFromId, getLiveCellIDs, getCellsPerRow, getRows };
