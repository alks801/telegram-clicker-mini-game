import { Request, Response } from "express"
import { MissionModel } from "../models/MissionModel"
import { Pool } from "pg"

export class MissionController {
  private missionModel: MissionModel

  constructor(pool: Pool) {
    this.missionModel = new MissionModel(pool)
  }

  async createMission(req: Request, res: Response) {
    const { userId, missionType } = req.body
    try {
      const mission = await this.missionModel.createMission(userId, missionType)
      res.status(201).json(mission)
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" })
    }
  }

  async getMissions(req: Request, res: Response) {
    const { userId } = req.params
    try {
      const missions = await this.missionModel.getMissionsByUserId(Number(userId))
      res.status(200).json(missions)
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" })
    }
  }

  async updateMissionProgress(req: Request, res: Response) {
    const { id } = req.params
    const { progress } = req.body
    try {
      const mission = await this.missionModel.updateMissionProgress(Number(id), progress)
      res.status(200).json(mission)
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" })
    }
  }

  async completeMission(req: Request, res: Response) {
    const { id } = req.params
    try {
      const mission = await this.missionModel.completeMission(Number(id))
      res.status(200).json(mission)
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" })
    }
  }
}
