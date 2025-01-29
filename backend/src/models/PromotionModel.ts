import { Pool } from "pg"
import { Promotion } from "../types"

export class PromotionModel {
  private pool: Pool

  constructor(pool: Pool) {
    this.pool = pool
  }

  async getAllPromotions(): Promise<Promotion[]> {
    const result = await this.pool.query<Promotion>("SELECT * FROM promotions")
    return result.rows
  }

  async createPromotion(promotion: Omit<Promotion, "id">): Promise<Promotion> {
    const { title, description, reward_coins, reward_crystals, start_date, end_date, is_active } = promotion
    const result = await this.pool.query<Promotion>(
      "INSERT INTO promotions (title, description, reward_coins, reward_crystals, start_date, end_date, is_active) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [title, description, reward_coins, reward_crystals, start_date, end_date, is_active],
    )
    return result.rows[0]
  }

  async updatePromotion(promotionId: number, promotion: Partial<Promotion>): Promise<Promotion> {
    const fields = Object.keys(promotion)
      .map((key, index) => `${key} = $${index + 1}`)
      .join(", ")
    const values = Object.values(promotion)

    const result = await this.pool.query<Promotion>(
      `UPDATE promotions SET ${fields} WHERE promotion_id = $${values.length + 1} RETURNING *`,
      [...values, promotionId],
    )
    return result.rows[0]
  }

  async deletePromotion(promotionId: number): Promise<void> {
    await this.pool.query("DELETE FROM promotions WHERE promotion_id = $1", [promotionId])
  }
}
