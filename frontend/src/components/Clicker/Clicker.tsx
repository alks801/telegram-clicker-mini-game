import React, { useState } from "react"
import styles from "./Clicker.module.scss"
import { useApi } from "../../hooks/useApi"
import { Payment } from "../Payment/Payment"
import { useTelegram } from "../../hooks/useTelegram"

export const Clicker = () => {
  const [coins, setCoins] = useState(0)
  const { fetchData } = useApi()
  const { user, webApp } = useTelegram()

  const handleClick = async () => {
    const response = await fetchData("/api/click", { method: "POST" })
    if (response.ok) {
      setCoins((prev) => prev + 1)
    }
  }

  return (
    <div className={styles.clicker}>
      <h2>Welcome, {user?.first_name}!</h2>
      <p>Coins: {coins}</p>
      <button onClick={handleClick}>Click Me!</button>
      <Payment webApp={webApp} />
    </div>
  )
}
