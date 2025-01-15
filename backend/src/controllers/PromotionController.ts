import { Request, Response } from "express"
import { PromotionModel } from "../models/PromotionModel"
import { Pool } from "pg"

export class PromotionController {
  private promotionModel: PromotionModel

  constructor(pool: Pool) {
    this.promotionModel = new PromotionModel(pool)
  }

  async createPromotion(req: Request, res: Response) {
    const { title, description, startDate, endDate, rewardCoins, rewardCrystals } = req.body
    try {
      const promotion = await this.promotionModel.createPromotion(
        title,
        description,
        new Date(startDate),
        new Date(endDate),
        rewardCoins,
        rewardCrystals,
      )
      res.status(201).json(promotion)
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" })
    }
  }

  async getActivePromotions(req: Request, res: Response) {
    try {
      const promotions = await this.promotionModel.getActivePromotions()
      res.status(200).json(promotions)
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" })
    }
  }
}
