import { Pool } from "pg"
import { UpgradeModel } from "../../src/models/UpgradeModel"

describe("UpgradeModel", () => {
  let pool: Pool
  let upgradeModel: UpgradeModel

  beforeAll(() => {
    pool = new Pool({
      user: "postgres",
      host: "localhost",
      database: "clicker_game",
      password: "password",
      port: 5432,
    })
    upgradeModel = new UpgradeModel(pool)
  })

  afterAll(async () => {
    await pool.end()
  })

  it("should create an upgrade", async () => {
    const upgrade = await upgradeModel.createUpgrade(1, "click_income", 100)
    expect(upgrade.user_id).toBe(1)
    expect(upgrade.upgrade_type).toBe("click_income")
  })

  it("should get upgrades by user id", async () => {
    const upgrades = await upgradeModel.getUpgradesByUserId(1)
    expect(upgrades.length).toBeGreaterThan(0)
  })

  it("should upgrade level", async () => {
    const upgrade = await upgradeModel.upgradeLevel(1)
    expect(upgrade.level).toBe(2)
  })
})
