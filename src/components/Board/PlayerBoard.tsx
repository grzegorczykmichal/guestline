import React from "react";
import { Board } from "./Board";
import { coords, Cell } from "../../lib";
import styles from "./PlayerBoard.module.css";

function PlayerBoard({
  board,
  disabled = false,
  target = "",
}: {
  board: number[][];
  disabled?: boolean;
  target?: string;
}) {
  const tar = target ? coords(target as Cell) : [-1, -1];
  return (
    <div className={styles.playerBoard}>
      <Board board={board} type="visible" target={tar} disabled={disabled} />
    </div>
  );
}

export { PlayerBoard };
