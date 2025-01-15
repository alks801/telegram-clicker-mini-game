import React, { useEffect, useState } from "react"
import styles from "./Missions.module.scss"
import { useApi } from "../../hooks/useApi"

interface Mission {
  id: number
  user_id: number
  mission_type: string
  progress: number
  completed: boolean
}

export const Missions = () => {
  const [missions, setMissions] = useState<Mission[]>([])
  const { fetchData } = useApi()

  useEffect(() => {
    const loadMissions = async () => {
      const response = await fetchData("/admin/missions")
      if (response.ok) {
        const data = await response.json()
        setMissions(data)
      }
    }
    loadMissions()
  }, [fetchData])

  return (
    <div className={styles.missions}>
      <h2>Missions</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Type</th>
            <th>Progress</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
          {missions.map((mission) => (
            <tr key={mission.id}>
              <td>{mission.id}</td>
              <td>{mission.user_id}</td>
              <td>{mission.mission_type}</td>
              <td>{mission.progress}</td>
              <td>{mission.completed ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
