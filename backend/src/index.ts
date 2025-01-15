import express from "express"
import { Pool } from "pg"
import rateLimit from 'express-rate-limit';
import { createRouter } from "./routes"
import logger from "./logger"

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, // Limit each IP to 100 requests per windowMs
});


const app = express()
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "clicker_game",
  password: "password",
  port: 5432,
})

app.use(limiter);
app.use(express.json())
app.use("/api", createRouter(pool))

const PORT = 3000
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`)
  logger.info(`Server is running on port ${PORT}`)
})
