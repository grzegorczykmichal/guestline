import { Board, States, Cell, fire, coords, cell } from "./index";
import { pickRandom } from "./utils";

let lastHit: Cell[] = [];

function availableCells(board: Board): string[] {
  const cells = board.flatMap((states, row) => {
    return states
      .map((state, column) => {
        return state !== States.Hit && state !== States.Miss
          ? cell(row, column)
          : "";
      })
      .filter((x) => x !== "");
  });

  return cells;
}

function availableNeighbourCells(c: Cell, board: Board): Cell[] {
  const [row, column] = coords(c);
  const neighbours = [];
  if (row - 1 >= 0) {
    if (
      board[row - 1][column] !== States.Hit &&
      board[row - 1][column] !== States.Miss
    ) {
      neighbours.push(cell(row - 1, column));
    }
  }
  if (row + 1 < 10) {
    if (
      board[row + 1][column] !== States.Hit &&
      board[row + 1][column] !== States.Miss
    ) {
      neighbours.push(cell(row + 1, column));
    }
  }
  if (column - 1 >= 0) {
    if (
      board[row][column - 1] !== States.Hit &&
      board[row][column - 1] !== States.Miss
    ) {
      neighbours.push(cell(row, column - 1));
    }
  }
  if (column + 1 < 10) {
    if (
      board[row][column + 1] !== States.Hit &&
      board[row][column + 1] !== States.Miss
    ) {
      neighbours.push(cell(row, column + 1));
    }
  }
  return neighbours as Cell[];
}

export function next(board: Board): string {
  if (lastHit.length > 0) {
    return lastHit.pop() || "";
  } else {
    const cells = availableCells(board);
    const nextCell = pickRandom(cells);
    return nextCell;
  }
}

export function update(cell: string, board: Board) {
  if (cell === "") {
    lastHit = [];
  } else {
    lastHit = lastHit.concat(availableNeighbourCells(cell as Cell, board));
  }
}

export function aiFire(board: Board) {
  const cell = next(board) as Cell;
  const [row, column] = coords(cell);
  const state = board[row][column];
  if (state === States.Hit) {
    lastHit = lastHit.concat(availableNeighbourCells(cell, board));
  }
  return fire(board, row, column);
}
