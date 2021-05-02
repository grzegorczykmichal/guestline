import { pickRandom } from "./utils";
import {
  copy,
  Board,
  States,
  availableCells,
  Ship,
  canPlace,
  placeShip,
  Direction,
} from "./board";

export enum Turn {
  Player = "Player",
  Computer = "Computer",
}

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
    let direction = pickRandomDirection();
    let coordinates = pickRandomCoordinates(board);
    while (!canPlace(nextBoard, coordinates, ship, direction)) {
      direction = pickRandomDirection();
      coordinates = pickRandomCoordinates(board);
    }
    nextBoard = placeShip(nextBoard, coordinates, ship, direction);
  });

  return nextBoard;
}

function pickRandomDirection() {
  return pickRandom<Direction>(["horizontal", "vertical"]);
}

function pickRandomCoordinates(board: Board) {
  return pickRandom(availableEmptyCells(board));
}

function availableEmptyCells(board: Board) {
  return availableCells(board, (cell) => cell === States.Empty);
}
