import React, { useState } from "react"
import styles from "./Clicker.module.scss"
import { useApi } from "../../hooks/useApi"

export const Clicker = () => {
  const [coins, setCoins] = useState(0)
  const { fetchData } = useApi()

  const handleClick = async () => {
    const response = await fetchData("/api/click", { method: "POST" })
    if (response.ok) {
      setCoins((prev) => prev + 1)
    }
  }

  return (
    <div className={styles.clicker}>
      <h2>Welcome, {user?.first_name}!</h2>
      <button className={styles.clickButton} onClick={handleClick}>
        Click Me!
      </button>
      <p className={styles.coins}>Coins: {coins}</p>
    </div>
  )
}
