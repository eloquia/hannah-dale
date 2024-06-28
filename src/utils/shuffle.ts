const SHUFFLE_STEPS = 100;

export const isInTopRow = (idx: number, numColumns: number): boolean => {
  return Math.floor(idx / numColumns) === 0;
};

export const isInLeftmostColumn = (idx: number, numColumns: number): boolean => {
  return idx === 0 || idx % numColumns === 0;
};

export const isInRightmostColumn = (idx: number, numColumns: number): boolean => {
  return (idx + 1) % numColumns === 0;
};

export const isInBottomRow = (totalItems: number, idx: number, numColumns: number): boolean => {
  const numRows = Math.floor(totalItems / numColumns);
  const lastRowLowerBound = (numRows - 1) * numColumns;
  const lastRowUpperBound = lastRowLowerBound + numColumns;
  return idx >= lastRowLowerBound && idx < lastRowUpperBound;
};

export const findPossibleMoves = (array: string[], numColumns: number) => {
  const nullIdx = array.indexOf('');
  const possibleMoves = [];

  const aboveIdx = nullIdx - numColumns;
  if (aboveIdx >= 0) {
    possibleMoves.push(nullIdx - numColumns);
  }
  if (nullIdx % numColumns !== 0 && nullIdx - 1 >= 0) {
    possibleMoves.push(nullIdx - 1);
  }
  const rightIdx = nullIdx + 1;
  if (rightIdx % numColumns !== 0 && nullIdx + 1 < array.length) {
    possibleMoves.push(nullIdx + 1);
  }
  const numRows = Math.floor(array.length / numColumns);
  const lastRowLowerBound = (numRows - 1) * numColumns;
  const lastRowUpperBound = lastRowLowerBound + numColumns;
  const isInLastRow = nullIdx >= lastRowLowerBound && nullIdx < lastRowUpperBound;
  if (!isInLastRow && nullIdx + numColumns < array.length) {
    possibleMoves.push(nullIdx + numColumns);
  }

  return possibleMoves;
}

export const isCompleted = (array: string[], numColumns: number) => {
  return array.map((content, idx) => {
    if (idx === array.length - 1 && !content) {
      return true;
    } else {
      // actual from file
      const filePath = content.split('.')[0];
      const filePathContents = filePath.split('-');
      const x = parseInt(filePathContents[filePathContents.length - 2]);
      const y = parseInt(filePathContents[filePathContents.length - 1]);

      // expected from idx
      const floor = Math.floor(idx / numColumns);
      const what = idx % numColumns

      const actualEqualsExpected = y === Math.floor(idx / numColumns) && x === idx % numColumns;
      return actualEqualsExpected;
    }
  }).filter(item => !item).length === 0;
}

const switchCell = (array: string[], idx: number, emptyIdx: number) => {
  const arrayCopy = [...array];
  arrayCopy[emptyIdx] = array[idx];
  arrayCopy[idx] = '';
  return arrayCopy;
}

export const switchCells = (array: string[], numColumns: number, idx: number): string[] => {
  // cases where to switch
  if (idx - numColumns >= 0 && array[idx - numColumns] === '') {
    return switchCell(array, idx, idx - numColumns);
  }

  if (idx - 1 >= 0 && array[idx - 1] === '') {
    return switchCell(array, idx, idx - 1);
  }

  if (idx + 1 < array.length && array[idx + 1] === '') {
    return switchCell(array, idx, idx + 1);
  }

  if (idx + numColumns < array.length && array[idx + numColumns] === '') {
    return switchCell(array, idx, idx + numColumns);
  }

  return array;
}

const shuffle = (array: string[], numColumns: number): string[] => {
  let arrayCopy = [...array];

  for (let i = 0; i < SHUFFLE_STEPS; i++) {
    const possibleMoves = findPossibleMoves(arrayCopy, numColumns);
    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    const randomMoveIdx = possibleMoves[randomIndex];
    arrayCopy = switchCells(arrayCopy, numColumns, randomMoveIdx);
  }

  return arrayCopy;
};

export default shuffle;
