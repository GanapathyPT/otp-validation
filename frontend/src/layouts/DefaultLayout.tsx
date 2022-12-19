import styles from "./DefaultLayout.module.css";

interface Props {
  children: React.ReactNode;
}

export function DefaultLayout({ children }: Props) {
  return <div className={styles.layout}>{children}</div>;
}
