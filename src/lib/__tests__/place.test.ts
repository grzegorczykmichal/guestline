import { placeShip, Board } from "../index";

test.each`
  ship | cell    | direction       | expectedUpdatedBoard
  ${5} | ${"A1"} | ${"horizontal"} | ${"[[1,1,1,1,1],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]"}
  ${5} | ${"A1"} | ${"vertical"}   | ${"[[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0]]"}
  ${4} | ${"A1"} | ${"horizontal"} | ${"[[1,1,1,1,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]"}
  ${4} | ${"A1"} | ${"vertical"}   | ${"[[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[0,0,0,0,0]]"}
`(
  "Should place a ship on the bord $direction at cell $cell",
  ({ ship, cell, direction, expectedUpdatedBoard }) => {
    const baord: Board = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ];
    const updatedBoard = placeShip(baord, ship, cell, direction);

    expect(JSON.stringify(updatedBoard)).toBe(expectedUpdatedBoard);
  }
);
