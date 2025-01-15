import React, { useState } from "react"
import styles from "./Clicker.module.scss"
import { useApi } from "../../hooks/useApi"

export const Clicker = () => {
  cconst[(coins, setCoins)] = useState(0)
  const [localClicks, setLocalClicks] = useState(0) // Local clicks counter
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    setCoins((prev) => prev + 1)
    setLocalClicks((prev) => prev + 1)

    // If collected 20 coins - Send to API
    if (localClicks + 1 >= 20) {
      try {
        setIsLoading(true)
        const response = await fetch("/api/click", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ coins: coins + 20 }), // Send total coins
        })

        if (!response.ok) {
          // If there is an error - rollback
          setCoins((prev) => prev - 20)
          throw new Error("Failed to update coins")
        }

        // Clear local state
        setLocalClicks(0)
      } catch (error) {
        console.error("Error:", error)
      } finally {
        setIsLoading(false)
      }
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
