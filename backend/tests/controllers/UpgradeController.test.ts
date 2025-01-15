import request from "supertest"
import express from "express"
import { Pool } from "pg"
import { createRouter } from "../../src/routes"

describe("UpgradeController", () => {
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

  it("should create an upgrade", async () => {
    const response = await request(app).post("/api/upgrades").send({ userId: 1, upgradeType: "click_income", cost: 100 })
    expect(response.status).toBe(201)
    expect(response.body.user_id).toBe(1)
  })

  it("should get upgrades by user id", async () => {
    const response = await request(app).get("/api/upgrades/1")
    expect(response.status).toBe(200)
    expect(response.body.length).toBeGreaterThan(0)
  })

  it("should upgrade level", async () => {
    const response = await request(app).put("/api/upgrades/1/level")
    expect(response.status).toBe(200)
    expect(response.body.level).toBe(2)
  })
})
