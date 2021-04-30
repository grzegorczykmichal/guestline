import { Enemy } from "./Enemy";
import { Player } from "./Player";

export type Type = "hidden" | "visible";

function Square({
  type = "visible",
  ...props
}: {
  state: number;
  target?: boolean;
  type?: Type;
  disabled?: boolean;
  pulse?: boolean;
  onClick?: () => void;
}) {
  if (type === "hidden") {
    return <Enemy {...props} />;
  }
  if (type === "visible") {
    return <Player {...props} />;
  }
  return null;
}

export { Square };
