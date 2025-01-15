import React from "react"
import styles from "./ProgressBar.module.scss"

interface ProgressBarProps {
  progress: number // from 0 to 100
}

export const ProgressBar = ({ progress }: ProgressBarProps) => {
  return (
    <div className={styles.progressBar}>
      <div className={styles.progress} style={{ width: `${progress}%` }}></div>
    </div>
  )
}
