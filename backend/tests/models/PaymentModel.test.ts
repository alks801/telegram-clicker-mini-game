import { Pool } from "pg"
import { PaymentModel } from "../../src/models/PaymentModel"

describe("PaymentModel", () => {
  let pool: Pool
  let paymentModel: PaymentModel

  beforeAll(() => {
    pool = new Pool({
      user: "postgres",
      host: "localhost",
      database: "clicker_game",
      password: "password",
      port: 5432,
    })
    paymentModel = new PaymentModel(pool)
  })

  afterAll(async () => {
    await pool.end()
  })

  it("should create a new payment", async () => {
    const payment = await paymentModel.createPayment(1, "stars", 100)
    expect(payment.user_id).toBe(1)
    expect(payment.payment_type).toBe("stars")
    expect(payment.amount).toBe(100)
    expect(payment.status).toBe("pending")
  })

  it("should get payments by user id", async () => {
    const payments = await paymentModel.getPaymentsByUserId(1)
    expect(payments.length).toBeGreaterThan(0)
    expect(payments[0].user_id).toBe(1)
  })

  it("should update payment status", async () => {
    const payment = await paymentModel.updatePaymentStatus(1, "completed")
    expect(payment.status).toBe("completed")
  })

  it("should throw an error if payment not found when updating status", async () => {
    await expect(paymentModel.updatePaymentStatus(999, "completed")).rejects.toThrow("Payment not found")
  })

  it("should check Telegram Stars balance", async () => {
    const balance = await paymentModel.checkTelegramStarsBalance(1)
    expect(balance).toBeGreaterThanOrEqual(0)
  })

  it("should check TON balance", async () => {
    const balance = await paymentModel.checkTONBalance("TON_WALLET_ADDRESS")
    expect(balance).toBeGreaterThanOrEqual(0)
  })

  it("should wait for Telegram Stars payment success", async () => {
    const paymentSuccess = await paymentModel.waitForTelegramStarsPayment(1)
    expect(paymentSuccess).toBe(true)
  })

  it("should wait for TON payment success", async () => {
    const paymentSuccess = await paymentModel.waitForTONPayment("TON_WALLET_ADDRESS", 100)
    expect(paymentSuccess).toBe(true)
  })
})
