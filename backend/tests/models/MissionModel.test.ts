import { Pool } from "pg"
import { MissionModel } from "../../src/models/MissionModel"

describe("MissionModel", () => {
  let pool: Pool
  let missionModel: MissionModel

  beforeAll(() => {
    pool = new Pool({
      user: "postgres",
      host: "localhost",
      database: "clicker_game",
      password: "password",
      port: 5432,
    })
    missionModel = new MissionModel(pool)
  })

  afterAll(async () => {
    await pool.end()
  })

  it("should create a new mission", async () => {
    const mission = await missionModel.createMission(1, "click_100_times")
    expect(mission.user_id).toBe(1)
    expect(mission.mission_type).toBe("click_100_times")
  })

  it("should get missions by user id", async () => {
    const missions = await missionModel.getMissionsByUserId(1)
    expect(missions.length).toBeGreaterThan(0)
  })

  it("should update mission progress", async () => {
    const mission = await missionModel.updateMissionProgress(1, 50)
    expect(mission.progress).toBe(50)
  })

  it("should complete a mission", async () => {
    const mission = await missionModel.completeMission(1)
    expect(mission.completed).toBe(true)
  })
})
