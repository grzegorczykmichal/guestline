import { useState, useRef, MouseEvent, useEffect } from "react";
import { Square } from "./Square";
import { Result } from "./Result";
import "./App.css";
import * as game from "../lib";

function App() {
  // const [turn, setTurn] = useState(1);
  // const [player, setPlayer] = useState(1);
  // const [playerAim, setPlayerAim] = useState<number[]>([]);

  // const [board, setBaord] = useState(() => {
  //   return game.initialize(game.emptyBoard());
  // });

  // const [hitBoard, setHitBaord] = useState(() => {
  //   const b = game.initialize(game.emptyBoard());
  //   return b;
  // });

  // function handleAim(row: number, col: number) {
  //   setPlayerAim([row, col]);
  // }

  // function handleFire() {
  //   if (player === 0 || playerAim.length === 0) {
  //     return;
  //   }
  //   const [row, col] = playerAim;
  //   const nextBoard = game.fire(hitBoard, game.cell(row, col));
  //   setHitBaord(nextBoard);
  //   setPlayer(0);
  // }

  // function f() {
  //   const nextBoard = game.aiFire(board);
  //   setBaord(nextBoard);
  //   setPlayer(1);
  // }

  // useEffect(() => {
  //   if (player === 1) {
  //     return;
  //   }
  //   f();
  // }, [player]);

  // useEffect(() => {
  //   if (turn === 1) {
  //     return;
  //   }
  //   f();
  // }, [turn]);

  // const isPlayerWinner = game.win(hitBoard);
  // const isEmenyWinner = game.win(board);

  return (
    <>
      {/* {(isPlayerWinner || isEmenyWinner) && (
        <Result
          win={isPlayerWinner}
          onPlayAgain={() => {
            setBaord(game.initialize(game.emptyBoard()));
            setHitBaord(game.initialize(game.emptyBoard()));
            setPlayer(1);
          }}
        />
      )}
      <div className="App">
        <div className="boards">
          <div>
            <div className="board">
              {board.map((row, r) => {
                return row.map((col, c) => {
                  return (
                    <Square
                      type="visible"
                      // markNext={nexts.includes(cell(r, c))}
                      state={col}
                      disabled={col === 4 || col === 3}
                    />
                  );
                });
              })}
            </div>
            <button
              disabled={player !== 0}
              onClick={() => {
                setTurn((t) => t + 1);
              }}
            >
              Turn
            </button>
          </div>
          <div>
            <div className="board board--hit">
              {hitBoard.map((row, r) => {
                return row.map((col, c) => (
                  <Square
                    type="hidden"
                    onClick={() => handleAim(r, c)}
                    markNext={
                      playerAim.length === 2 &&
                      playerAim[0] === r &&
                      playerAim[1] === c
                    }
                    disabled={col === 4 || col === 3}
                    state={col}
                  />
                ));
              })}
            </div>
            <button disabled={player !== 1} onClick={handleFire}>
              Fire
            </button>
          </div>
        </div>
      </div>
      <div className="debug">
        {player === 1 ? "Your turn" : "Computer"}
        <button
          onClick={() => {
            setTurn((t) => t + 1);
          }}
        >
          Next turn ({turn})
        </button>
      </div> */}
    </>
  );
}

export { App };
