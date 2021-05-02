import React from "react";
import { Board } from "./Board";

function PlayerBoard({
  board,
  disabled = false,
  target = [-1, -1],
}: {
  board: number[][];
  disabled?: boolean;
  target?: number[];
}) {
  return (
    <Board board={board} type="visible" target={target} disabled={disabled} />
  );
}

export { PlayerBoard };
