import request from "supertest"
import express from "express"
import { Pool } from "pg"
import { createRouter } from "../../src/routes"

describe("PaymentController", () => {
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

  it("should create a new payment", async () => {
    const response = await request(app).post("/api/payments").send({ userId: 1, paymentType: "stars", amount: 100 })
    expect(response.status).toBe(201)
    expect(response.body.user_id).toBe(1)
    expect(response.body.payment_type).toBe("stars")
    expect(response.body.amount).toBe(100)
  })

  it("should get payments by user id", async () => {
    const response = await request(app).get("/api/payments/1")
    expect(response.status).toBe(200)
    expect(response.body.length).toBeGreaterThan(0)
    expect(response.body[0].user_id).toBe(1)
  })

  it("should update payment status", async () => {
    const response = await request(app).put("/api/payments/1/status").send({ status: "completed" })
    expect(response.status).toBe(200)
    expect(response.body.status).toBe("completed")
  })

  it("should return 404 if payment not found when updating status", async () => {
    const response = await request(app).put("/api/payments/999/status").send({ status: "completed" })
    expect(response.status).toBe(404)
    expect(response.body.error).toBe("Payment not found")
  })

  it("should handle Telegram Stars payment", async () => {
    const response = await request(app).post("/api/payments/telegram-stars").send({ userId: 1, amount: 100 })
    expect(response.status).toBe(200)
    expect(response.body.message).toBe("Payment successful")
  })

  it("should handle TON payment", async () => {
    const response = await request(app)
      .post("/api/payments/ton")
      .send({ userId: 1, amount: 100, walletAddress: "TON_WALLET_ADDRESS" })
    expect(response.status).toBe(200)
    expect(response.body.message).toBe("Payment successful")
  })
})
