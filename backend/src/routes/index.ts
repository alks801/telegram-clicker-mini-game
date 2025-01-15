import express from "express"
import { Pool } from "pg"
import { UserController } from "../controllers/UserController"
import { UpgradeController } from "../controllers/UpgradeController"
import { MissionController } from "../controllers/MissionController"
import { PromotionController } from "../controllers/PromotionController"
import { PaymentController } from "../controllers/PaymentController"

export const createRouter = (pool: Pool) => {
  const router = express.Router()
  const userController = new UserController(pool)
  const upgradeController = new UpgradeController(pool)
  const missionController = new MissionController(pool)
  const promotionController = new PromotionController(pool)
  const paymentController = new PaymentController(pool)

  // User routes
  router.post("/users", userController.createUser.bind(userController))
  router.get("/users/:id", userController.getUser.bind(userController))
  router.put("/users/:id/status", userController.updateUserStatus.bind(userController))
  router.put("/users/:id/coins", userController.updateUserCoins.bind(userController))

  // Upgrade routes
  router.post("/upgrades", upgradeController.createUpgrade.bind(upgradeController))
  router.get("/upgrades/:userId", upgradeController.getUpgrades.bind(upgradeController))
  router.put("/upgrades/:id/level", upgradeController.upgradeLevel.bind(upgradeController))

  // Mission routes
  router.post("/missions", missionController.createMission.bind(missionController))
  router.get("/missions/:userId", missionController.getMissions.bind(missionController))
  router.put("/missions/:id/progress", missionController.updateMissionProgress.bind(missionController))
  router.put("/missions/:id/complete", missionController.completeMission.bind(missionController))

  // Promotion routes
  router.post("/promotions", promotionController.createPromotion.bind(promotionController))
  router.get("/promotions/active", promotionController.getActivePromotions.bind(promotionController))

  // Payment routes
  router.post("/payments", paymentController.createPayment.bind(paymentController))
  router.get("/payments/:userId", paymentController.getPayments.bind(paymentController))
  router.put("/payments/:id/status", paymentController.updatePaymentStatus.bind(paymentController))

  return router
}
