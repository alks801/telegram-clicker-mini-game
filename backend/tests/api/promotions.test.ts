import request from "supertest"
import { app } from "../../src/index"

describe("Promotions API", () => {
  it("should create a new promotion", async () => {
    const response = await request(app).post("/api/promotions").send({
      title: "Double Coins",
      description: "Earn double coins for every click!",
      startDate: "2023-10-01",
      endDate: "2023-10-07",
      rewardCoins: 200,
      rewardCrystals: 10,
    })
    expect(response.status).toBe(201)
    expect(response.body.title).toBe("Double Coins")
  })

  it("should get active promotions", async () => {
    const response = await request(app).get("/api/promotions/active")
    expect(response.status).toBe(200)
    expect(response.body.length).toBeGreaterThan(0)
  })
})
