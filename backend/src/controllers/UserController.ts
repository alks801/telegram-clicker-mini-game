import { Request, Response } from "express"
import { UserModel } from "../models/UserModel"
import { Pool } from "pg"

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
}
