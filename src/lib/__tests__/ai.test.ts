import { availableNeighbourCells } from "../ai";

test.each`
  board                                | cell      | expectedNeighbours
  ${[[0, 0, 0], [0, 0, 0], [0, 0, 0]]} | ${[1, 1]} | ${JSON.stringify([[0, 1], [2, 1], [1, 0], [1, 2]])}
  ${[[0, 1, 0], [1, 0, 1], [0, 1, 0]]} | ${[1, 1]} | ${JSON.stringify([])}
  ${[[0, 1, 0], [0, 0, 0], [0, 1, 0]]} | ${[1, 1]} | ${JSON.stringify([[0, 1], [2, 1], [1, 0], [1, 2]])}
  ${[[0, 0, 0], [0, 0, 0], [0, 0, 0]]} | ${[1, 1]} | ${JSON.stringify([[0, 1], [2, 1], [1, 0], [1, 2]])}
`(
  "Should return neighbour cells that are not Hit ot Miss hits",
  ({ board, cell, expectedNeighbours }) => {
    const neighbours = availableNeighbourCells(board, cell);
    expect(JSON.stringify(neighbours)).toBe(expectedNeighbours);
  }
);
