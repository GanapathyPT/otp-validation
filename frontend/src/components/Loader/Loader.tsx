import styles from "./Loader.module.css";

interface Props {
  open?: boolean;
}

export function Loader({ open }: Props) {
  if (!open) return null;

  return (
    <div className={styles.loader}>
      <div />
      <div />
      <div />
      <div />
    </div>
  );
}
