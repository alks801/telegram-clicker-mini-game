import request from "supertest"
import express from "express"
import { Pool } from "pg"
import { createRouter } from "../../src/routes"

describe("MissionController", () => {
  let app: express.Express
  let pool: Pool

  beforeAll(() => {
    pool = new Pool({
      user: "postgres",
      host: "localhost",
      database: "clicker_game",
      password: "password",
      port: 5432,
    })
    const router = createRouter(pool)
    app = express()
    app.use(express.json())
    app.use("/api", router)
  })

  afterAll(async () => {
    await pool.end()
  })

  it("should create a new mission", async () => {
    const response = await request(app).post("/api/missions").send({ userId: 1, missionType: "click_100_times" })
    expect(response.status).toBe(201)
    expect(response.body.user_id).toBe(1)
  })

  it("should get missions by user id", async () => {
    const response = await request(app).get("/api/missions/1")
    expect(response.status).toBe(200)
    expect(response.body.length).toBeGreaterThan(0)
  })

  it("should update mission progress", async () => {
    const response = await request(app).put("/api/missions/1/progress").send({ progress: 50 })
    expect(response.status).toBe(200)
    expect(response.body.progress).toBe(50)
  })

  it("should complete a mission", async () => {
    const response = await request(app).put("/api/missions/1/complete")
    expect(response.status).toBe(200)
    expect(response.body.completed).toBe(true)
  })
})
