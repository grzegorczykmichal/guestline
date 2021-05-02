import { Board, States } from "./index";
import { availableCells } from "./board";
import { pickRandom } from "./utils";

export function availableNeighbourCells(
  board: Board,
  [row, column]: number[]
): number[][] {
  const neighboursMatrix = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, +1],
  ];

  const baordSize = board.length;

  const neighbours = neighboursMatrix.reduce((acc, [dRow, dColumn]) => {
    const neighbourRow = row + dRow;
    const neighbourColumn = column + dColumn;

    if (
      neighbourRow < 0 ||
      neighbourRow >= baordSize ||
      neighbourColumn < 0 ||
      neighbourColumn >= baordSize
    ) {
      return acc;
    }

    const state = board[neighbourRow][neighbourColumn];
    if (state === States.Hit || state === States.Miss) {
      return acc;
    }

    acc.push([neighbourRow, neighbourColumn]);
    return acc;
  }, [] as number[][]);

  return neighbours;
}

let lastHit: number[][] = [];

export function next(board: Board): number[] {
  if (lastHit.length > 0) {
    return lastHit.pop()!;
  }
  const cells = availableCells(
    board,
    (state) => state !== States.Hit && state !== States.Miss
  );
  const nextCell = pickRandom<number[]>(cells);
  return nextCell;
}

export function update(board: Board, cell: number[] = []) {
  if (cell.length === 0) {
    lastHit = [];
  } else {
    lastHit = lastHit.concat(availableNeighbourCells(board, cell));
  }
}
