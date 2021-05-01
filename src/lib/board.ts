export type Board = number[][];

export function copy(board: Board): Board {
  return JSON.parse(JSON.stringify(board));
}

export function emptyBoard(
  rows: number = 10,
  colums: number = 10,
  state: number = 0
): Board {
  return new Array(rows).fill(state).map(() => new Array(colums).fill(state));
}
