import exp from "constants";
import { StaticImageData } from "next/image";

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

export const findPossibleMoves = (array: { src: StaticImageData | null; alt: string }[], numColumns: number) => {
  const nullIdx = array.indexOf({
    src: null,
    alt: "",
  });
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

export const isCompleted = (array: { src: StaticImageData | null, alt: string }[]): boolean => {
  // TODO: come up with more general solution and not hard-coded solution
  if (array[0].alt !== "1") {
    return false;
  } else if (array[1].alt !== "5") {
    return false;
  } else if (array[2].alt !== "9") {
    return false;
  } else if (array[3].alt !== "2") {
    return false;
  } else if (array[4].alt !== "6") {
    return false;
  } else if (array[5].alt !== "10") {
    return false;
  } else if (array[6].alt !== "3") {
    return false;
  } else if (array[7].alt !== "7") {
    return false;
  } else if (array[8].alt !== "11") {
    return false;
  } else if (array[9].alt !== "4") {
    return false;
  } else if (array[10].alt !== "8") {
    return false;
  // } else if (array[11].alt !== "12") {
  //   return false;
  } else {
    return true;
  }
}

const switchCell = (array: { src: StaticImageData | null, alt: string }[], idx: number, emptyIdx: number) => {
  const arrayCopy = [...array];
  arrayCopy[emptyIdx] = array[idx];
  arrayCopy[idx] = {
    src: null,
    alt: "",
  };
  return arrayCopy;
}

export const switchCells = (array: { src: StaticImageData | null, alt: string }[], numColumns: number, idx: number): { src: StaticImageData | null, alt: string }[] => {
  // cases where to switch
  if (idx - numColumns >= 0 && !array[idx - numColumns].src) {
    return switchCell(array, idx, idx - numColumns);
  }

  if (idx - 1 >= 0 && !array[idx - 1].src) {
    return switchCell(array, idx, idx - 1);
  }

  if (idx + 1 < array.length && !array[idx + 1].src) {
    return switchCell(array, idx, idx + 1);
  }

  if (idx + numColumns < array.length && !array[idx + numColumns].src) {
    return switchCell(array, idx, idx + numColumns);
  }

  return array;
}

const shuffle = (array: { src: StaticImageData | null, alt: string }[], numColumns: number): { src: StaticImageData | null, alt: string }[] => {
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
