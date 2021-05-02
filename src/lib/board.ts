export type Board = number[][];

export enum Ship {
  Battleship = 5,
  Destroyer = 4,
}

export type Direction = "vertical" | "horizontal";

export enum States {
  Miss = -1,
  Empty = 0,
  Hit = 1,
  Battleship = 5,
  Destroyer = 4,
}

export function copy(board: Board): Board {
  return JSON.parse(JSON.stringify(board));
}

export function emptyBoard(
  rows: number = 10,
  colums: number = 10,
  state: States = States.Empty
): Board {
  return new Array(rows).fill(state).map(() => new Array(colums).fill(state));
}

export function availableCells(
  board: Board,
  filter: (state: States) => boolean = () => true
): number[][] {
  const cells = board.flatMap((states, row) => {
    return states.reduce((r, state, column) => {
      if (filter(state)) {
        r.push([row, column]);
      }
      return r;
    }, [] as number[][]);
  });

  return cells;
}

export function placeShip(
  board: Board,
  [row, column]: number[],
  ship: Ship,
  direction: Direction = "horizontal"
) {
  const nextBoard = copy(board);

  const directions = {
    horizontal: [0, 1],
    vertical: [1, 0],
  };

  const [dRow, dColumn] = directions[direction];

  const boardSize = board.length;

  let length = 0;
  let shipRow = row;
  let shipColumn = column;
  while (length < ship && shipRow < boardSize && shipColumn < boardSize) {
    nextBoard[shipRow][shipColumn] = ship;
    length++;
    shipColumn = column + length * dColumn;
    shipRow = row + length * dRow;
  }

  return nextBoard;
}

export function canPlace(
  board: Board,
  [row, column]: number[],
  ship: Ship,
  direction: Direction
) {
  const nextBoard = copy(board);

  const directions = {
    horizontal: [0, 1],
    vertical: [1, 0],
  };

  const [dRow, dColumn] = directions[direction];

  const boardSize = board.length;

  if (row + ship * dRow > boardSize || column + ship * dColumn > boardSize) {
    return false;
  }

  let length = 0;
  let shipRow = row;
  let shipColumn = column;
  while (length < ship) {
    if (nextBoard[shipRow][shipColumn] !== States.Empty) {
      return false;
    }
    length++;
    shipColumn = column + length * dColumn;
    shipRow = row + length * dRow;
  }

  return true;
}
