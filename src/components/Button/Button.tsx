import React from "react";
import styles from "./Button.module.css";
import { FC, ButtonHTMLAttributes } from "react";
import classnames from "classnames";

const Button: FC<
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> & {
    version?: "primary" | "secondary";
  }
> = ({ children, version = "primary", disabled, ...props }) => {
  return (
    <button
      disabled={disabled}
      className={classnames(styles.button, {
        [styles.disabled]: disabled,
        [styles.primary]: version === "primary",
        [styles.secondary]: version === "secondary",
      })}
      {...props}
    >
      {children}
    </button>
  );
};

export { Button };
