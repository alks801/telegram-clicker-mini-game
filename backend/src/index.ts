import express from "express"
import { Pool } from "pg"
import { createRouter } from "./routes"
import logger from "./logger"

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
  console.log(`server is running on port ${PORT}`)
  logger.info(`Server is running on port ${PORT}`)
})
