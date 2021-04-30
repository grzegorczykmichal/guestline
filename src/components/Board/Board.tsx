import styles from "./Board.module.css";
import { Square, Type } from "../Square";

function Row({
  columns,
  row,
  type = "visible",
  target,
  disabled = false,
  onSquareClick,
}: {
  columns: number[];
  row: number;
  type?: Type;
  target?: number[];
  disabled?: boolean;
  onSquareClick?: (row: number, column: number) => void;
}) {
  const [targetRow, targetColumn] = target || [-1, -1];

  function handleClick(column: number) {
    onSquareClick && onSquareClick(row, column);
  }

  return (
    <>
      <span className={styles.numbers}>{row + 1}</span>
      {columns.map((state, column) => {
        return (
          <Square
            key={column}
            state={state}
            type={type}
            target={targetRow === row && targetColumn === column}
            disabled={disabled}
            onClick={() => handleClick(column)}
          />
        );
      })}
    </>
  );
}

function Board({
  board,
  target,
  type = "visible",
  disabled = false,
  onSquareClick,
}: {
  board: number[][];
  target?: number[];
  type?: Type;
  disabled?: boolean;
  onSquareClick?: (row: number, column: number) => void;
}) {
  return (
    <div className={styles.board}>
      <span className={styles.letters}></span>
      <span className={styles.letters}>A</span>
      <span className={styles.letters}>B</span>
      <span className={styles.letters}>C</span>
      <span className={styles.letters}>D</span>
      <span className={styles.letters}>E</span>
      <span className={styles.letters}>F</span>
      <span className={styles.letters}>G</span>
      <span className={styles.letters}>H</span>
      <span className={styles.letters}>I</span>
      <span className={styles.letters}>J</span>
      {board.map((columns, row) => (
        <Row
          key={row}
          columns={columns}
          row={row}
          type={type}
          disabled={disabled}
          target={target}
          onSquareClick={onSquareClick}
        />
      ))}
    </div>
  );
}

export { Board };
