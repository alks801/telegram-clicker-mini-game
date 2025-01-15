import React from "react"
import styles from "./Header.module.scss"

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1>Admin Panel</h1>
      </div>
    </header>
  )
}
