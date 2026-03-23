import unauthorizedI from "../../../assets/unauthorizedI.png";
import styles from './Unauthorized.module.css';

export default function Unauthorized() {
  return (
    <main className={styles.unauthorizedPage}>
      <h2 className={styles.error}>
        Unauthorized Access, You do not have permission to access this page!
      </h2>
      <img src={unauthorizedI} alt="Unauthorized" className={styles.unauthorizedImg} />
    </main>
  );
}