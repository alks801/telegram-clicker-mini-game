import request from "supertest"
import { app } from "../../src/index"

describe("Payments API", () => {
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

  it("should return 400 if payment type is invalid", async () => {
    const response = await request(app).post("/api/payments").send({ userId: 1, paymentType: "invalid", amount: 100 })
    expect(response.status).toBe(400)
    expect(response.body.error).toBe("Invalid payment type")
  })

  it("should return 400 if amount is negative", async () => {
    const response = await request(app).post("/api/payments").send({ userId: 1, paymentType: "stars", amount: -100 })
    expect(response.status).toBe(400)
    expect(response.body.error).toBe("Amount must be positive")
  })

  // -- TON and Stars
  it("should return 400 if Telegram Stars balance is insufficient", async () => {
    const response = await request(app).post("/api/payments/telegram-stars").send({ userId: 1, amount: 1000 }) // Предположим, что баланс меньше 1000
    expect(response.status).toBe(400)
    expect(response.body.error).toBe("Insufficient balance")
  })

  it("should return 400 if TON balance is insufficient", async () => {
    const response = await request(app)
      .post("/api/payments/ton")
      .send({ userId: 1, amount: 1000, walletAddress: "TON_WALLET_ADDRESS" }) // Предположим, что баланс меньше 1000
    expect(response.status).toBe(400)
    expect(response.body.error).toBe("Insufficient balance")
  })
})
