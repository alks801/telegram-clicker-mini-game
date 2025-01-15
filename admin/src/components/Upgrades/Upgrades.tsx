import React, { useEffect, useState } from "react"
import styles from "./Upgrades.module.scss"
import { useApi } from "../../hooks/useApi"

interface Upgrade {
  id: number
  user_id: number
  upgrade_type: string
  level: number
  cost: number
}

export const Upgrades = () => {
  const [upgrades, setUpgrades] = useState<Upgrade[]>([])
  const { fetchData } = useApi()

  useEffect(() => {
    const loadUpgrades = async () => {
      const response = await fetchData("/admin/upgrades")
      if (response.ok) {
        const data = await response.json()
        setUpgrades(data)
      }
    }
    loadUpgrades()
  }, [fetchData])

  return (
    <div className={styles.upgrades}>
      <h2>Upgrades</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Type</th>
            <th>Level</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
          {upgrades.map((upgrade) => (
            <tr key={upgrade.id}>
              <td>{upgrade.id}</td>
              <td>{upgrade.user_id}</td>
              <td>{upgrade.upgrade_type}</td>
              <td>{upgrade.level}</td>
              <td>{upgrade.cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
