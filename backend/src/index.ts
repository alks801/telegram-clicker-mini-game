import express from "express"
import { Pool } from "pg"
import { createRouter } from "./routes"

const app = express()
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "clicker_game",
  password: "password",
  port: 5432,
})

app.use(express.json())
app.use("/api", createRouter(pool))

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
