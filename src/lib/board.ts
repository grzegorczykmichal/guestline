export type Board = number[][];

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

export function emptyBoard(rows: number = 10, colums: number = 10): Board {
  return new Array(rows)
    .fill(States.Empty)
    .map(() => new Array(colums).fill(States.Empty));
}
