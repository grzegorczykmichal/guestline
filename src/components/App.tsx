import React, { useEffect, useState } from "react";
import { emptyBoard, fire, initialize, next, Turn, update } from "../lib";
import "./App.css";
import { EnemyBaord, PlayerBoard } from "./Board";
import { Actions } from "./Actions";
import { Button } from "./Button";
import { Result } from "./Result";

function App() {
  const [turn, setTurn] = useState<Turn>(Turn.Player);

  const [playerBoard, setPlayerBoard] = useState(() => {
    return initialize(emptyBoard());
  });
  const [playerTarget, setPlayerTarget] = useState<number[]>([]);

  const [enemyBoard, setEnemyBoard] = useState(() => {
    return initialize(emptyBoard());
  });
  const [enemyTarget, setEnemyTarget] = useState<number[]>([]);

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
    setEnemyTarget([]);
    setPlayerTarget([]);
  }

  function handleHit() {
    update(playerBoard, enemyTarget);
    const [row, column] = enemyTarget;
    const nextBaord = fire(playerBoard, row, column);
    setPlayerBoard(nextBaord);
    setEnemyTarget([]);
    setTurn(Turn.Player);
  }

  function handleMiss() {
    const [row, column] = enemyTarget;
    const nextBaord = fire(playerBoard, row, column);
    setPlayerBoard(nextBaord);
    setEnemyTarget([]);
    setTurn(Turn.Player);
  }

  function handleDestroyed() {
    update(playerBoard, []);
    const [row, column] = enemyTarget;
    const nextBaord = fire(playerBoard, row, column);
    setPlayerBoard(nextBaord);
    setEnemyTarget([]);
    setTurn(Turn.Player);
  }

  function handleFire() {
    const [row, column] = playerTarget;
    const nextBoard = fire(enemyBoard, row, column);
    setEnemyBoard(nextBoard);
    setPlayerTarget([]);
    setTurn(Turn.Computer);
  }

  function handleSelectTerget(row: number, column: number) {
    setPlayerTarget([row, column]);
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
            {playerTarget.length !== 0 ? (
              <Button onClick={handleFire}>Fire</Button>
            ) : (
              "Select you target"
            )}
          </Actions>
        )}
        <Button version="secondary" onClick={handlePlayAgain}>
          New game
        </Button>
      </div>
    </>
  );
}

export { App };
