import bgImage from "../assets/bg.svg";
import { Loader } from "../components/Loader/Loader";
import styles from "./AuthLayout.module.css";

interface Props {
  title: string;
  loading?: boolean;
  error?: string;
  children: React.ReactNode;
}

export function AuthLayout({ title, loading, error, children }: Props) {
  return (
    <div className={styles.container} data-loading={loading}>
      <Loader open={loading} />
      <img src={bgImage} alt="Auth Image" />
      <div className={styles.authCard}>
        <h3>{title}</h3>
        <span data-hidden={!error}>{error}</span>
        {children}
      </div>
    </div>
  );
}
