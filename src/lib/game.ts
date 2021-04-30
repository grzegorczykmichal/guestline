import { copy, Board, States } from "./board";
import { coords, Cell } from "./cell";

export enum Turn {
  Player = "Player",
  Computer = "Computer",
}
// export type Turn = "player" | "computer";

export function evaluate(board: Board): number {
  return board.flat().filter((s) => s === States.Hit).length;
}

export function destroyed(board: Board) {
  const winningPoints = 13;
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

function placeShip(
  board: Board,
  [row, column]: number[],
  ship: States.Battleship | States.Destroyer,
  direction: "vertical" | "horizontal" = "horizontal"
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

export function initialize(board: Board): Board {
  let nextBoard = copy(board);

  nextBoard = placeShip(nextBoard, coords("B2"), States.Battleship);
  nextBoard = placeShip(nextBoard, coords("B4"), States.Destroyer);
  nextBoard = placeShip(nextBoard, coords("B6"), States.Destroyer, "vertical");

  return nextBoard;
}
