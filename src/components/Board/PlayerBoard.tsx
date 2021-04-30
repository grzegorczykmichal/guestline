import { Board } from "./Board";
import { Actions } from "./Actions";
import { Button } from "../Button";
import { coords, Cell } from "../../lib";
import styles from "./PlayerBoard.module.css";

function PlayerBoard({
  board,
  disabled = false,
  target = "",
  onMissClick,
  onHitClick,
  onDestroyClick,
}: {
  board: number[][];
  disabled?: boolean;
  target?: string;
  onMissClick: () => void;
  onHitClick: () => void;
  onDestroyClick: () => void;
}) {
  const tar = target ? coords(target as Cell) : [-1, -1];
  return (
    <div className={styles.playerBoard}>
      <Board board={board} type="visible" target={tar} disabled={disabled} />
      {/* <Actions>
        <Button disabled={disabled} onClick={onMissClick}>
          Miss
        </Button>
        <Button disabled={disabled} onClick={onHitClick}>
          Hit
        </Button>
        <Button disabled={disabled} onClick={onDestroyClick}>
          Destroyed
        </Button>
      </Actions> */}
    </div>
  );
}

export { PlayerBoard };
