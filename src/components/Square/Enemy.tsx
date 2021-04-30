import React from "react";
import styles from "./Enemy.module.css";
import { States } from "../../lib";
import classnames from "classnames";

function Enemy({
  state,
  disabled = false,
  target = false,
  onClick = () => {},
}: {
  state: number;
  disabled?: boolean;
  target?: boolean;
  onClick?: () => void;
}) {
  const className = classnames(styles.enemy, {
    [styles.disabled]: disabled,
    [styles.miss]: state === States.Miss,
    [styles.hit]: state === States.Hit,
    [styles.empty]:
      state === States.Empty ||
      state === States.Battleship ||
      state === States.Destroyer,
    [styles.target]: target,
  });
  return (
    <div
      onClick={() =>
        !disabled && state !== States.Hit && state !== States.Miss && onClick()
      }
      className={className}
    >
      {state === States.Hit ? "🔥" : target ? "💣" : " "}
    </div>
  );
}

export { Enemy };
