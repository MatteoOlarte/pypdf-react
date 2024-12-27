import styles from'./styles.module.css'

function GridLayout({ children }) {
  return (
    <div className={styles['grid-layout']}>
      {children}
    </div>
  )
}

export default GridLayout;