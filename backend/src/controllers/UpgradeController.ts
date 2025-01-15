import { Request, Response } from "express"
import { UpgradeModel } from "../models/UpgradeModel"
import { Pool } from "pg"

export class UpgradeController {
  private upgradeModel: UpgradeModel

  constructor(pool: Pool) {
    this.upgradeModel = new UpgradeModel(pool)
  }

  async createUpgrade(req: Request, res: Response) {
    const { userId, upgradeType, cost } = req.body
    try {
      const upgrade = await this.upgradeModel.createUpgrade(userId, upgradeType, cost)
      res.status(201).json(upgrade)
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" })
    }
  }

  async getUpgrades(req: Request, res: Response) {
    const { userId } = req.params
    try {
      const upgrades = await this.upgradeModel.getUpgradesByUserId(Number(userId))
      res.status(200).json(upgrades)
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" })
    }
  }

  async upgradeLevel(req: Request, res: Response) {
    const { id } = req.params
    try {
      const upgrade = await this.upgradeModel.upgradeLevel(Number(id))
      res.status(200).json(upgrade)
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" })
    }
  }
}
