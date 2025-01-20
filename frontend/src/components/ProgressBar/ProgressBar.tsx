import React from "react"
import styles from "./ProgressBar.module.scss"

type Props = {
  progress: number // from 0 to 100
}

export const ProgressBar = ({ progress }: Props) => {
  return (
    <div className={styles.progressBar}>
      <div className={styles.progress} style={{ width: `${progress}%` }}></div>
    </div>
  )
}
