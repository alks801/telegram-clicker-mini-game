import React from "react"
import { Header } from "./components/Header/Header"
import { Users } from "./components/Users/Users"
import { Upgrades } from "./components/Upgrades/Upgrades"
import { Missions } from "./components/Missions/Missions"
import { Promotions } from "./components/Promotions/Promotions"
import { Payments } from "./components/Payments/Payments"
import styles from "./App.module.scss"

export const App = () => {
  return (
    <div className={styles.app}>
      <Header />
      <div className={styles.container}>
        <Users />
        <Upgrades />
        <Missions />
        <Promotions />
        <Payments />
      </div>
    </div>
  )
}
