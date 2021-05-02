import React from "react";
import { Board } from "./Board";

function EnemyBaord({
  board,
  disabled = false,
  target,
  onTargetSelected,
}: {
  board: number[][];
  disabled?: boolean;
  target?: number[];
  onTargetSelected: (row: number, column: number) => void;
}) {
  return (
    <Board
      board={board}
      type="disguised"
      target={target}
      disabled={disabled}
      onSquareClick={(row: number, column: number) => {
        !disabled && onTargetSelected(row, column);
      }}
    />
  );
}

export { EnemyBaord };
