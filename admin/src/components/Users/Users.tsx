import React, { useEffect, useState } from "react"
import styles from "./Users.module.scss"
import { useApi } from "../../hooks/useApi"

interface User {
  id: number
  username: string
  email: string
  status: string
  coins: number
  crystals: number
  energy: number
}

export const Users = () => {
  const [users, setUsers] = useState<User[]>([])
  const { fetchData } = useApi()

  useEffect(() => {
    const loadUsers = async () => {
      const response = await fetchData("/admin/users")
      if (response.ok) {
        const data = await response.json()
        setUsers(data)
      }
    }
    loadUsers()
  }, [fetchData])

  return (
    <div className={styles.users}>
      <h2>Users</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Status</th>
            <th>Coins</th>
            <th>Crystals</th>
            <th>Energy</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.status}</td>
              <td>{user.coins}</td>
              <td>{user.crystals}</td>
              <td>{user.energy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
