import { Pool } from "pg"
import { Mission } from "../types"

export class MissionModel {
  private pool: Pool

  constructor(pool: Pool) {
    this.pool = pool
  }

  async createMission(userId: number, missionType: string): Promise<Mission> {
    const result = await this.pool.query("INSERT INTO missions (user_id, mission_type) VALUES ($1, $2) RETURNING *", [
      userId,
      missionType,
    ])
    return result.rows[0]
  }

  async getMissionsByUserId(userId: number): Promise<Mission[]> {
    const result = await this.pool.query("SELECT * FROM missions WHERE user_id = $1", [userId])
    return result.rows
  }

  async updateMissionProgress(id: number, progress: number): Promise<Mission> {
    const result = await this.pool.query("UPDATE missions SET progress = $1 WHERE id = $2 RETURNING *", [progress, id])
    return result.rows[0]
  }

  async completeMission(id: number): Promise<Mission> {
    const result = await this.pool.query("UPDATE missions SET completed = TRUE WHERE id = $1 RETURNING *", [id])
    return result.rows[0]
  }
}
