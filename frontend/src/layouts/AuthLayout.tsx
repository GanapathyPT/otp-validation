import bgImage from "../assets/bg.svg";
import styles from "./AuthLayout.module.css";

interface Props {
  title: string;
  children: React.ReactNode;
}

export function AuthLayout({ title, children }: Props) {
  return (
    <div className={styles.container}>
      <img src={bgImage} alt="Auth Image" />
      <div className={styles.authCard}>
        <h3>{title}</h3>
        {children}
      </div>
    </div>
  );
}
