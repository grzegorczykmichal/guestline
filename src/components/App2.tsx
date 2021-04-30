import { PlayerBoard, EnemyBaord } from "./Board";
import { Result } from "./Result";
import "./App.css";
import { useEffect, useState } from "react";

import {
  emptyBoard,
  Turn,
  initialize,
  next,
  fire,
  update,
  coords,
  Cell,
  cell,
} from "../lib";
import { Actions } from "./Board/Actions";
import { Button } from "./Button";

function App2() {
  const [turn, setTurn] = useState<Turn>(Turn.Player);

  const [playerBoard, setPlayerBoard] = useState(() => {
    return initialize(emptyBoard());
  });
  const [playerTarget, setPlayerTarget] = useState("");

  const [enemyBoard, setEnemyBoard] = useState(() => {
    return initialize(emptyBoard());
  });
  const [enemyTarget, setEnemyTarget] = useState("");

  useEffect(() => {
    if (turn === Turn.Player) {
      return;
    }
    const nextCell = next(playerBoard);
    setEnemyTarget(nextCell);
  }, [playerBoard, turn]);

  function handlePlayAgain() {
    setPlayerBoard(initialize(emptyBoard()));
    setEnemyBoard(initialize(emptyBoard()));
    setTurn(Turn.Player);
  }

  function handleHit() {
    update(enemyTarget, playerBoard);
    const [row, column] = coords(enemyTarget! as Cell);
    const nextBaord = fire(playerBoard, row, column);
    setPlayerBoard(nextBaord);
    setEnemyTarget("");
    setTurn(Turn.Player);
  }

  function handleMiss() {
    const [row, column] = coords(enemyTarget! as Cell);
    const nextBaord = fire(playerBoard, row, column);
    setPlayerBoard(nextBaord);
    setEnemyTarget("");
    setTurn(Turn.Player);
  }

  function handleDestroyed() {
    update("", playerBoard);
    const [row, column] = coords(enemyTarget! as Cell);
    const nextBaord = fire(playerBoard, row, column);
    setPlayerBoard(nextBaord);
    setEnemyTarget("");
    setTurn(Turn.Player);
  }

  function handleFire() {
    const [row, column] = coords(playerTarget! as Cell);
    const nextBoard = fire(enemyBoard, row, column);
    setEnemyBoard(nextBoard);
    setPlayerTarget("");
    setTurn(Turn.Computer);
  }

  function handleSelectTerget(row: number, column: number) {
    setPlayerTarget(cell(row, column));
  }

  return (
    <>
      <Result
        playerBoard={playerBoard}
        enemyBord={enemyBoard}
        onPlayAgain={handlePlayAgain}
      />

      <div className="App">
        <div className="boards">
          <PlayerBoard
            board={playerBoard}
            target={enemyTarget}
            disabled={turn === Turn.Player}
          />
          <EnemyBaord
            board={enemyBoard}
            target={playerTarget}
            disabled={turn === Turn.Computer}
            onTargetSelected={handleSelectTerget}
          />
        </div>
        {turn === Turn.Computer && (
          <Actions>
            <Button onClick={handleMiss}>Miss</Button>
            <Button onClick={handleHit}>Hit</Button>
            <Button onClick={handleDestroyed}>Destroyed</Button>
          </Actions>
        )}
        {turn === Turn.Player && (
          <Actions>
            <Actions>
              {playerTarget ? (
                <Button onClick={handleFire}>Fire</Button>
              ) : (
                "Select you target"
              )}
            </Actions>
          </Actions>
        )}
      </div>
    </>
  );
}

export { App2 };
