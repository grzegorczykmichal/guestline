import { FC } from "react";
import styles from "./Actions.module.css";

const Actions: FC<{}> = ({ children }) => {
  return <div className={styles.actions}>{children}</div>;
};

export { Actions };
