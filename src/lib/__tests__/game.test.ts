import { evaluate } from "../index";

test.each`
  board                                                                                     | expectedEvaluation
  ${[[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]}  | ${0}
  ${[[1, 0, -1, 0, 0], [1, 1, 1, 1, 1], [0, 0, 4, 0, 0], [1, 0, 4, 0, 0], [5, 0, 0, 0, 0]]} | ${7}
  ${[[1, 1, 1, 1, 1], [0, 1, 1, 1, 1], [0, 1, 1, 1, 1], [0, 1, 1, 1, 1], [0, 1, 1, 1, 1]]}  | ${21}
  ${[[1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1]]}  | ${25}
`("Should return baord hits", ({ board, expectedEvaluation }) => {
  const hits = evaluate(board);
  expect(hits).toBe(expectedEvaluation);
});
