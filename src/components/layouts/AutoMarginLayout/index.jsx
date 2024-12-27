import styles from "./styles.module.css"

function AutoMarginLayout({ children }) {
  return (
    <div className={styles.layout}>
      {children}
    </div>
  );
}

export default AutoMarginLayout;