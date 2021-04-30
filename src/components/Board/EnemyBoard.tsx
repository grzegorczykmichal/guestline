import React from "react";
import { Board } from "./Board";
import styles from "./EnemyBoard.module.css";
import { Cell, coords } from "../../lib";

function EnemyBaord({
  board,
  disabled = false,
  target,
  onTargetSelected,
}: {
  board: number[][];
  disabled?: boolean;
  target?: string;
  onTargetSelected: (row: number, column: number) => void;
}) {
  const tar = target ? coords(target as Cell) : [-1, -1];
  return (
    <div className={styles.enemyBaord}>
      <Board
        board={board}
        type="hidden"
        target={tar}
        disabled={disabled}
        onSquareClick={(row: number, column: number) => {
          !disabled && onTargetSelected(row, column);
        }}
      />
      {/* {!disabled &&
        (aim ? (
          <Actions>
            <Button
              disabled={disabled}
              onClick={() => {
                if (aim) {
                  const [row, column] = aim;
                  onFireClick(row, column);
                  setAim(undefined);
                }
              }}
            >
              Fire
            </Button>
          </Actions>
        ) : (
          <div className={styles.instruction}>Aim</div>
        ))} */}
    </div>
  );
}

export { EnemyBaord };
