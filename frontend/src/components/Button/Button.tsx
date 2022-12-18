import { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  color: "primary" | "secondary";
  center?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export function Button({
  children,
  color,
  fullWidth,
  center,
  ...otherProps
}: Props) {
  return (
    <button
      {...otherProps}
      className={styles.button}
      data-color={color}
      data-width={fullWidth}
      data-center={center}
    >
      {children}
    </button>
  );
}
