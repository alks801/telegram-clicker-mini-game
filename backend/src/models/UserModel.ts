import { Pool } from "pg"
import { User } from "../types"

export class UserModel {
  private pool: Pool

  constructor(pool: Pool) {
    this.pool = pool
  }

  async createUser(username: string, email: string): Promise<User> {
    const result = await this.pool.query("INSERT INTO users (username, email) VALUES ($1, $2) RETURNING *", [username, email])
    return result.rows[0]
  }

  async getUserById(id: number): Promise<User | null> {
    const result = await this.pool.query("SELECT * FROM users WHERE id = $1", [id])
    return result.rows[0] || null
  }

  async updateUserStatus(id: number, status: "active" | "banned"): Promise<User> {
    const result = await this.pool.query("UPDATE users SET status = $1 WHERE id = $2 RETURNING *", [status, id])
    return result.rows[0]
  }

  async updateUserCoins(id: number, coins: number): Promise<User> {
    const result = await this.pool.query("UPDATE users SET coins = $1 WHERE id = $2 RETURNING *", [coins, id])
    return result.rows[0]
  }
}
