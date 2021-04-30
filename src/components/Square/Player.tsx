import React from "react";
import styles from "./Player.module.css";
import { States } from "../../lib";
import classnames from "classnames";

function Player({
  state,
  disabled = false,
  target = false,
}: {
  state: number;
  disabled?: boolean;
  target?: boolean;
}) {
  const className = classnames(styles.player, {
    [styles.disabled]: disabled,
    [styles.miss]: state === States.Miss,
    [styles.hit]: state === States.Hit,
    [styles.target]: target,
  });

  let symbol = "";
  switch (state) {
    case States.Battleship:
      symbol = "🚢";
      break;
    case States.Destroyer:
      symbol = "⛵";
      break;
    case States.Hit:
      symbol = "🔥";
      break;
  }
  return <div className={className}>{symbol}</div>;
}

export { Player };
