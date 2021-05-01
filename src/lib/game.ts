import { pickRandom } from "./utils";
import { copy, Board } from "./board";
import { Cell, coords, cell } from "./cell";

export enum Ship {
  Battleship = 5,
  Destroyer = 4,
}

export enum States {
  Miss = -1,
  Empty = 0,
  Hit = 1,
  Battleship = 5,
  Destroyer = 4,
}

export enum Turn {
  Player = "Player",
  Computer = "Computer",
}

type Direction = "vertical" | "horizontal";

export function evaluate(board: Board): number {
  return board.flat().filter((s) => s === States.Hit).length;
}

export function destroyed(board: Board) {
  const winningPoints = 13; // overall number of squares with ships
  return evaluate(board) === winningPoints;
}

export function fire(board: Board, row: number, column: number) {
  const nextBoard = copy(board);

  const state = nextBoard[row][column];

  if (state === States.Battleship || state === States.Destroyer) {
    nextBoard[row][column] = States.Hit;
    return nextBoard;
  }

  if (state === States.Empty) {
    nextBoard[row][column] = States.Miss;
    return nextBoard;
  }

  return nextBoard;
}

export function initialize(board: Board): Board {
  let nextBoard = copy(board);

  const ships = [Ship.Battleship, Ship.Destroyer, Ship.Destroyer];

  ships.forEach((ship) => {
    let stop = false;
    while (!stop) {
      const direction = pickRandomDirection();
      const coordinates = pickRandomCoordinates(board);
      if (canPlace(nextBoard, coordinates, ship, direction)) {
        nextBoard = placeShip(nextBoard, coordinates, ship, direction);
        stop = true;
      }
    }
  });

  return nextBoard;
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

function pickRandomDirection() {
  return pickRandom<Direction>(["horizontal", "vertical"]);
}

function pickRandomCoordinates(board: Board) {
  return pickRandom<number[]>(availableEmptyCells(board));
}

function availableEmptyCells(board: Board) {
  return availableCells(board, (cell) => cell === States.Empty);
}

function placeShip(
  board: Board,
  [row, column]: number[],
  ship: Ship,
  direction: Direction = "horizontal"
) {
  const nextBoard = copy(board);

  if (direction === "horizontal") {
    for (let i = column; i < column + ship; i++) {
      nextBoard[row][i] = ship;
    }
  }

  if (direction === "vertical") {
    for (let i = row; i < row + ship; i++) {
      nextBoard[i][column] = ship;
    }
  }

  return nextBoard;
}

export function canPlace(
  board: Board,
  [row, column]: number[],
  ship: Ship,
  direction: Direction
) {
  if (direction === "horizontal") {
    if (column + ship > 10) {
      return false;
    }

    for (let i = column; i < column + ship; i++) {
      if (board[row][i] !== States.Empty) {
        return false;
      }
    }
  }

  if (direction === "vertical") {
    if (row + ship > 10) {
      return false;
    }
    for (let i = row; i < row + ship; i++) {
      if (board[i][column] !== States.Empty) {
        return false;
      }
    }
  }

  return true;
}
