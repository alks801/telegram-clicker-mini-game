import { Pool } from "pg"
import { Upgrade } from "../types"

export class UpgradeModel {
  private pool: Pool

  constructor(pool: Pool) {
    this.pool = pool
  }

  async createUpgrade(userId: number, upgradeType: string, cost: number): Promise<Upgrade> {
    const result = await this.pool.query("INSERT INTO upgrades (user_id, upgrade_type, cost) VALUES ($1, $2, $3) RETURNING *", [
      userId,
      upgradeType,
      cost,
    ])
    return result.rows[0]
  }

  async getUpgradesByUserId(userId: number): Promise<Upgrade[]> {
    const result = await this.pool.query("SELECT * FROM upgrades WHERE user_id = $1", [userId])
    return result.rows
  }

  async upgradeLevel(id: number): Promise<Upgrade> {
    const result = await this.pool.query("UPDATE upgrades SET level = level + 1 WHERE id = $1 RETURNING *", [id])
    return result.rows[0]
  }
}
