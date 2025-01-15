import request from "supertest"
import { app } from "../../src/index"

describe("Upgrades API", () => {
  it("should create an upgrade", async () => {
    const response = await request(app).post("/api/upgrades").send({ userId: 1, upgradeType: "click_income", cost: 100 })
    expect(response.status).toBe(201)
    expect(response.body.user_id).toBe(1)
  })

  it("should get upgrades by user id", async () => {
    const response = await request(app).get("/api/upgrades/1")
    expect(response.status).toBe(200)
    expect(response.body.length).toBeGreaterThan(0)
  })

  it("should upgrade level", async () => {
    const response = await request(app).put("/api/upgrades/1/level")
    expect(response.status).toBe(200)
    expect(response.body.level).toBe(2)
  })
})
