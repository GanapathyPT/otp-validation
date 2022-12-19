import { Loader } from "../components/Loader/Loader";
import styles from "./DefaultLayout.module.css";

interface Props {
  loading?: boolean;
  children: React.ReactNode;
}

export function DefaultLayout({ loading, children }: Props) {
  return (
    <div className={styles.layout} data-loading={loading}>
      <Loader open={loading} />
      {children}
    </div>
  );
}
