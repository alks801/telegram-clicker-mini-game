import request from "supertest"
import express from "express"
import { Pool } from "pg"
import { UserController } from "../../src/controllers/UserController"
import { createRouter } from "../../src/routes"

describe("UserController", () => {
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

  it("should create a new user", async () => {
    const response = await request(app).post("/api/users").send({ username: "testuser", email: "test@example.com" })
    expect(response.status).toBe(201)
    expect(response.body.username).toBe("testuser")
  })

  it("should get a user by id", async () => {
    const response = await request(app).get("/api/users/1")
    expect(response.status).toBe(200)
    expect(response.body.id).toBe(1)
  })

  it("should update user status", async () => {
    const response = await request(app).put("/api/users/1/status").send({ status: "banned" })
    expect(response.status).toBe(200)
    expect(response.body.status).toBe("banned")
  })
})
