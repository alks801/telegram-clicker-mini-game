import React, { useState } from "react"
import styles from "./Upgrades.module.scss"

type Upgrade = {
  id: number
  name: string
  cost: number
}

export const Upgrades = () => {
  const [upgrades, setUpgrades] = useState<Upgrade[]>([
    { id: 1, name: "Auto Clicker", cost: 100 },
    { id: 2, name: "Double Coins", cost: 200 },
  ])

  const handleBuyUpgrade = (id: number) => {
    console.log(`Upgrade ${id} purchased`)
  }

  return (
    <div className={styles.upgrades}>
      <h3>Upgrades</h3>
      {upgrades.map((upgrade) => (
        <div key={upgrade.id} className={styles.upgrade}>
          <span>{upgrade.name}</span>
          <button onClick={() => handleBuyUpgrade(upgrade.id)}>Buy for {upgrade.cost} coins</button>
        </div>
      ))}
    </div>
  )
}
