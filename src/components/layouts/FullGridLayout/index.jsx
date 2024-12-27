import styles from'./styles.module.css'

function FullGridLayout({ children }) {
  return (
    <div className={styles['grid-layout']}>
      {children}
    </div>
  )
}

export default FullGridLayout;