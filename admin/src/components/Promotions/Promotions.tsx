import React, { useEffect, useState } from "react"
import styles from "./Promotions.module.scss"
import { useApi } from "../../hooks/useApi"

interface Promotion {
  id: number
  title: string
  description: string
  start_date: string
  end_date: string
  reward_coins: number
  reward_crystals: number
}

export const Promotions = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([])
  const { fetchData } = useApi()

  useEffect(() => {
    const loadPromotions = async () => {
      const response = await fetchData("/admin/promotions")
      if (response.ok) {
        const data = await response.json()
        setPromotions(data)
      }
    }
    loadPromotions()
  }, [fetchData])

  return (
    <div className={styles.promotions}>
      <h2>Promotions</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Reward Coins</th>
            <th>Reward Crystals</th>
          </tr>
        </thead>
        <tbody>
          {promotions.map((promotion) => (
            <tr key={promotion.id}>
              <td>{promotion.id}</td>
              <td>{promotion.title}</td>
              <td>{promotion.description}</td>
              <td>{promotion.start_date}</td>
              <td>{promotion.end_date}</td>
              <td>{promotion.reward_coins}</td>
              <td>{promotion.reward_crystals}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
