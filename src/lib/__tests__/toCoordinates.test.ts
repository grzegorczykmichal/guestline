import { toCoordinates } from "../index"

test.each`
  cell | expectedRow| expectedColumn
  ${'A1'} | ${0} | ${0}
  ${'A2'} | ${1} | ${0}
  ${'A3'} | ${2} | ${0}
  ${'B1'} | ${0} | ${1}
  ${'B2'} | ${1} | ${1}
  ${'B3'} | ${2} | ${1}
`("Should", ({ cell, expectedRow, expectedColumn }) => {

  const [row, column] = toCoordinates(cell);

  expect(row).toBe(expectedRow)
  expect(column).toBe(expectedColumn)

})