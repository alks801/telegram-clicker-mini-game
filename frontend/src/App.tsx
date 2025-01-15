import React from "react"
import { Header } from "./components/Header/Header"
import { Clicker } from "./components/Clicker/Clicker"
import "./styles/global.scss"

export const App = () => {
  return (
    <div>
      <Header />
      <Clicker />
    </div>
  )
}
