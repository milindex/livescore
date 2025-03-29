import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>&copy; 2025 Live Cricket Score</p>
      </div>
    </footer>
  );
};

export default Footer;
