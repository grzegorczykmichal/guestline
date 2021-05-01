import React from "react";
import style from "./Result.module.css";
import { Button } from "../Button";
import { destroyed, Board } from "../../lib";

function Result({
  playerBoard,
  enemyBord,
  onPlayAgain,
}: {
  playerBoard: Board;
  enemyBord: Board;
  onPlayAgain: () => void;
}) {
  const playerWin = destroyed(enemyBord);
  const enemyWin = destroyed(playerBoard);

  if (!playerWin && !enemyWin) {
    return null;
  }

  return (
    <div className={style.result}>
      <div className={style.banner}>
        <h1 className={style.h1}>{playerWin ? "You won!" : "Game over"}</h1>
        <p>{playerWin ? "🏆" : "💀"}</p>
        <Button version="secondary" onClick={onPlayAgain}>
          Play again
        </Button>
      </div>
    </div>
  );
}

export { Result };
