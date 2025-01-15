import request from "supertest"
import { Pool } from "pg"
import { app } from "../index"

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "clicker_game",
  password: "password",
  port: 5432,
})

describe("User API", () => {
  it("should create a new user", async () => {
    const response = await request(app).post("/api/users").send({ username: "testuser", email: "test@example.com" })
    expect(response.status).toBe(201)
    expect(response.body.username).toBe("testuser")
  })

  it("should get a user by id", async () => {
    const response = await request(app).get("/api/users/1")
    expect(response.status).toBe(200)
    expect(response.body.username).toBe("testuser")
  })
})

describe("Payment API", () => {
  it("should create a new payment with Telegram Stars", async () => {
    const response = await request(app).post("/api/payments").send({ userId: 1, paymentType: "stars", amount: 100 })
    expect(response.status).toBe(200)
    expect(response.body.message).toBe("Payment successful")
  })

  it("should create a new payment with TON", async () => {
    const response = await request(app)
      .post("/api/payments")
      .send({ userId: 1, paymentType: "ton", amount: 100, walletAddress: "TON_WALLET_ADDRESS" })
    expect(response.status).toBe(200)
    expect(response.body.message).toBe("Payment successful")
  })
})
