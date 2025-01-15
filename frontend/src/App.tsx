import React, { useState } from "react"
import { Clicker } from "./components/Clicker/Clicker"
import "./styles/global.scss"

import styles from "./App.module.scss"
import { useTelegram } from "./hooks/useTelegram"

export const App = () => {
  const { user, webApp } = useTelegram()

  const [coins, setCoins] = useState(0)
  const [crystals, setCrystals] = useState(0)
  const [energy, setEnergy] = useState(100)
  const [progress, setProgress] = useState(0)

  const handleClick = () => {
    setCoins((prev) => prev + 1)
    setProgress((prev) => (prev + 1) % 100)
  }

  return (
    <div className={styles.gameScreen}>
      <ResourceCounter coins={coins} crystals={crystals} energy={energy} />
      <MainObject />
      <Clicker onClick={handleClick} />
      <Payment webApp={webApp} />
      <ProgressBar progress={progress} />
      <Upgrades />
    </div>
  )
}
