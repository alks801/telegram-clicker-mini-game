import { Pool } from "pg"
import { PromotionModel } from "../../src/models/PromotionModel"

describe("PromotionModel", () => {
  let pool: Pool
  let promotionModel: PromotionModel

  beforeAll(() => {
    pool = new Pool({
      user: "postgres",
      host: "localhost",
      database: "clicker_game",
      password: "password",
      port: 5432,
    })
    promotionModel = new PromotionModel(pool)
  })

  afterAll(async () => {
    await pool.end()
  })

  it("should create a new promotion", async () => {
    const promotion = await promotionModel.createPromotion(
      "Double Coins",
      "Earn double coins for every click!",
      new Date("2023-10-01"),
      new Date("2023-10-07"),
      200,
      10,
    )
    expect(promotion.title).toBe("Double Coins")
    expect(promotion.reward_coins).toBe(200)
  })

  it("should get active promotions", async () => {
    const promotions = await promotionModel.getActivePromotions()
    expect(promotions.length).toBeGreaterThan(0)
  })
})
