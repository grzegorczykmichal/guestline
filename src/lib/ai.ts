import { Board, States, Cell, fire, coords, cell } from "./index";

let lastHit: Cell[] = [];

function pickRandom(array: string[]) {
  if (array.length === 0) {
    return "";
  }
  const index = Math.floor(Math.random() * array.length);
  return array[index];
}

function availableCells(board: Board): string[] {
  const cells = board.flatMap((row, i) => {
    const rowSymbol = i + 1;
    return row
      .map((c, i) => {
        const columnSymbol = String.fromCodePoint(i + 65);
        return c !== States.Hit && c !== States.Miss
          ? `${columnSymbol}${rowSymbol}`
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
