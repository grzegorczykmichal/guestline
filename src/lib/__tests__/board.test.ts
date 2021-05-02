import {
  emptyBoard,
  availableCells,
  States,
  placeShip,
  canPlace,
  Ship,
} from "../board";

const rowSum = (sum: number, row: number[]) =>
  sum + row.reduce((a: number, b: number) => a + b, 0);

test("Should empty baord with all cells being State.Empty", () => {
  const newBoard = emptyBoard();

  expect(newBoard.length).toBe(10);
  expect(newBoard[0].length).toBe(10);

  const sumOfAllStates = newBoard.reduce(rowSum, 0);

  expect(sumOfAllStates).toBe(0);
});

test.each`
  board               | exceptStateFiler                                                    | expectedAvailableCells
  ${[[0, 0], [0, 0]]} | ${undefined}                                                        | ${JSON.stringify([[0, 0], [0, 1], [1, 0], [1, 1]])}
  ${[[0, 0], [0, 0]]} | ${(s: States) => s !== States.Empty}                                | ${JSON.stringify([])}
  ${[[5, 5], [4, 4]]} | ${(s: States) => s !== States.Battleship && s !== States.Destroyer} | ${JSON.stringify([])}
  ${[[5, 0], [0, 4]]} | ${(s: States) => s !== States.Battleship && s !== States.Destroyer} | ${JSON.stringify([[0, 1], [1, 0]])}
`(
  "Should return baord hits",
  ({ board, exceptStateFiler, expectedAvailableCells }) => {
    const actualAvailableCells = availableCells(board, exceptStateFiler);

    expect(JSON.stringify(actualAvailableCells)).toBe(expectedAvailableCells);
  }
);

test.each`
  board                                                                                    | cell      | ship               | direction       | updatedBoard
  ${[[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]} | ${[0, 0]} | ${Ship.Battleship} | ${"horizontal"} | ${JSON.stringify([[5, 5, 5, 5, 5], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]])}
  ${[[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]} | ${[0, 0]} | ${Ship.Battleship} | ${"verticaly"}  | ${JSON.stringify([[5, 0, 0, 0, 0], [5, 0, 0, 0, 0], [5, 0, 0, 0, 0], [5, 0, 0, 0, 0], [5, 0, 0, 0, 0]])}
  ${[[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]} | ${[1, 3]} | ${Ship.Battleship} | ${"horizontal"} | ${JSON.stringify([[0, 0, 0, 0, 0], [0, 0, 0, 5, 5], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]])}
`(
  "Should place a ship on a baord",
  ({ board, cell, ship, direction, updatedBoard }) => {
    const boardWithShip = placeShip(board, cell, ship, direction);

    expect(JSON.stringify(boardWithShip)).toBe(updatedBoard);
  }
);

test.each`
  board                                                                                    | cell      | ship               | direction       | expectedResult
  ${[[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]} | ${[0, 0]} | ${Ship.Battleship} | ${"vertical"}   | ${true}
  ${[[0, 0, 0, 0, 4], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]} | ${[0, 0]} | ${Ship.Battleship} | ${"horizontal"} | ${false}
  ${[[0, 0, 0, 4, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]} | ${[0, 0]} | ${Ship.Battleship} | ${"horizontal"} | ${false}
  ${[[0, 0, 4, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]} | ${[0, 0]} | ${Ship.Battleship} | ${"horizontal"} | ${false}
  ${[[0, 4, 4, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]} | ${[0, 0]} | ${Ship.Battleship} | ${"horizontal"} | ${false}
  ${[[4, 4, 4, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]} | ${[0, 0]} | ${Ship.Battleship} | ${"horizontal"} | ${false}
  ${[[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]} | ${[0, 1]} | ${Ship.Battleship} | ${"horizontal"} | ${false}
  ${[[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]} | ${[0, 2]} | ${Ship.Battleship} | ${"horizontal"} | ${false}
  ${[[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]} | ${[0, 3]} | ${Ship.Battleship} | ${"horizontal"} | ${false}
  ${[[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]} | ${[0, 4]} | ${Ship.Battleship} | ${"horizontal"} | ${false}
  ${[[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]} | ${[1, 0]} | ${Ship.Battleship} | ${"vertical"}   | ${false}
  ${[[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]} | ${[2, 0]} | ${Ship.Battleship} | ${"vertical"}   | ${false}
  ${[[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]} | ${[3, 0]} | ${Ship.Battleship} | ${"vertical"}   | ${false}
  ${[[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]} | ${[4, 0]} | ${Ship.Battleship} | ${"vertical"}   | ${false}
`(
  "Should determine if there is room for a ship to get palced",
  ({ board, cell, ship, direction, expectedResult }) => {
    const result = canPlace(board, cell, ship, direction);
    expect(result).toBe(expectedResult);
  }
);
