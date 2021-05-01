import { availableCells, States } from "../game";

test.each`
  board               | exceptStateFiler                                                    | expectedAvailableCells
  ${[[0, 0], [0, 0]]} | ${undefined}                                                        | ${JSON.stringify(["A1", "B1", "A2", "B2"])}
  ${[[0, 0], [0, 0]]} | ${(s: States) => s !== States.Empty}                                | ${JSON.stringify([])}
  ${[[5, 5], [4, 4]]} | ${(s: States) => s !== States.Battleship && s !== States.Destroyer} | ${JSON.stringify([])}
  ${[[5, 0], [0, 4]]} | ${(s: States) => s !== States.Battleship && s !== States.Destroyer} | ${JSON.stringify(["B1", "A2"])}
`(
  "Should return baord hits",
  ({ board, exceptStateFiler, expectedAvailableCells }) => {
    const actualAvailableCells = availableCells(board, exceptStateFiler);

    expect(JSON.stringify(actualAvailableCells)).toBe(expectedAvailableCells);
  }
);
