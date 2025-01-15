import { Pool } from "pg"
import { Payment } from "../types"
import axios from "axios"

export class PaymentModel {
  private pool: Pool

  constructor(pool: Pool) {
    this.pool = pool
  }

  // Create Payment
  async createPayment(userId: number, paymentType: "stars" | "ton", amount: number): Promise<Payment> {
    const result = await this.pool.query("INSERT INTO payments (user_id, payment_type, amount) VALUES ($1, $2, $3) RETURNING *", [
      userId,
      paymentType,
      amount,
    ])
    return result.rows[0]
  }

  // Check Telegram Stars Balance
  async checkTelegramStarsBalance(userId: number): Promise<number> {
    // Here is call API Telegram for balance checking
    // Like:
    const response = await axios.get(`https://api.telegram.org/botYOUR_BOT_TOKEN/getBalance?user_id=${userId}`)
    return response.data.balance // TODO
  }

  // Check TON Balance
  async checkTONBalance(walletAddress: string): Promise<number> {
    // Here is call API TON for balance checking
    // Like:
    const response = await axios.get(`https://tonapi.io/v1/account/getBalance?address=${walletAddress}`)
    return response.data.balance // TODO
  }

  // TODO: Wait for payment in Telegram Stars
  async waitForTelegramStarsPayment(paymentId: number): Promise<boolean> {
    const response = await axios.get(`https://api.telegram.org/botYOUR_BOT_TOKEN/getPaymentStatus?payment_id=${paymentId}`)
    return response.data.status === "success"
  }

  // TODO: Wait for TON Payment
  async waitForTONPayment(walletAddress: string, amount: number): Promise<boolean> {
    // Here is call API TON for transaction checking
    // Like:
    const response = await axios.get(`https://tonapi.io/v1/account/getTransactions?address=${walletAddress}`)
    const transactions = response.data.transactions
    const paymentReceived = transactions.some((tx: any) => tx.amount >= amount)
    return paymentReceived
  }

  async getPaymentsByUserId(userId: number): Promise<Payment[]> {
    const result = await this.pool.query("SELECT * FROM payments WHERE user_id = $1", [userId])
    return result.rows
  }

  async updatePaymentStatus(id: number, status: "pending" | "completed" | "failed"): Promise<Payment> {
    const result = await this.pool.query("UPDATE payments SET status = $1 WHERE id = $2 RETURNING *", [status, id])
    return result.rows[0]
  }
}
