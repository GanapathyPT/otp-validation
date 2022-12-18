import { InputHTMLAttributes } from "react";
import styles from "./Input.module.css";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Input({ label, ...otherProps }: Props) {
  return (
    <label className={styles.label}>
      <p>{label}</p>
      <input {...otherProps} />
    </label>
  );
}
