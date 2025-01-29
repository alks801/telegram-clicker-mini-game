import { Request, Response } from "express"
import { UserModel } from "../models/UserModel"
import { Pool } from "pg"
import logger from "../logger"

export class UserController {
  private userModel: UserModel

  constructor(pool: Pool) {
    this.userModel = new UserModel(pool)
  }

  async createUser(req: Request, res: Response) {
    const { username, email } = req.body
    try {
      const user = await this.userModel.createUser(username, email)
      res.status(201).json(user)
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" })
    }
  }

  async getUser(req: Request, res: Response) {
    const { id } = req.params
    try {
      const user = await this.userModel.getUserById(Number(id))
      if (user) {
        res.status(200).json(user)
      } else {
        res.status(404).json({ error: "User not found" })
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" })
    }
  }

  async updateUserStatus(req: Request, res: Response) {
    const { id } = req.params
    const { status } = req.body
    try {
      const user = await this.userModel.updateUserStatus(Number(id), status)
      res.status(200).json(user)
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" })
    }
  }

  async updateUserCoins(req: Request, res: Response) {
    const { id } = req.params
    const { coins } = req.body

    try {
      if (typeof id !== "number") {
        return res.status(400).json({ error: "Invalid user" })
      }

      if (typeof coins !== "number") {
        return res.status(400).json({ error: "Invalid coins value" })
      }

      const user = await this.userModel.updateUserCoins(Number(id), Number(coins))

      if (!user) {
        return res.status(404).json({ error: "User not found" })
      }

      // Return new coins count
      res.status(200).json({ coins: user.coins })
    } catch (error) {
      console.error("Error:", error)
      // logger.error(`Error updating coins: ${error.message}`)
      res.status(500).json({ error: "Internal Server Error" })
    }
  }

  // Possible to chache with Redis
  // import redis from 'redis';
  // const client = redis.createClient();
  // client.set('user:1:coins', coins, (err) => {
  //   if (err) {
  //     console.error('Redis error:', err);
  //     return res.status(500).json({ error: 'Internal Server Error' });
  //   }
  //   res.status(200).json({ coins });
  // });
  // setInterval(async () => {
  //   const coins = await client.get('user:1:coins');
  //   if (coins) {
  //     await pool.query('UPDATE users SET coins = $1 WHERE id = 1', [coins]);
  //   }
  // }, 5000);
}
