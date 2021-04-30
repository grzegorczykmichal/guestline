import { ai2 } from "../index";

test.each`
  board               | expectedLeftoverEmptyCellsCodes
  ${[[1, 0], [0, 3]]} | ${JSON.stringify(["A2", "B1"])}
`("Should return baord hits", ({ board, expectedLeftoverEmptyCellsCodes }) => {
  const leftoverEmptyCellsCodes = ai2(board);
  expect(JSON.stringify(leftoverEmptyCellsCodes)).toBe(
    expectedLeftoverEmptyCellsCodes
  );
});
