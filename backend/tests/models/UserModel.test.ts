import { Pool } from "pg"
import { UserModel } from "../../src/models/UserModel"

describe("UserModel", () => {
  let pool: Pool
  let userModel: UserModel

  beforeAll(() => {
    pool = new Pool({
      user: "postgres",
      host: "localhost",
      database: "clicker_game",
      password: "password",
      port: 5432,
    })
    userModel = new UserModel(pool)
  })

  afterAll(async () => {
    await pool.end()
  })

  it("should create a new user", async () => {
    const user = await userModel.createUser("testuser", "test@example.com")
    expect(user.username).toBe("testuser")
    expect(user.email).toBe("test@example.com")
  })

  it("should get a user by id", async () => {
    const user = await userModel.getUserById(1)
    expect(user).toBeDefined()
    expect(user?.id).toBe(1)
  })

  it("should update user status", async () => {
    const user = await userModel.updateUserStatus(1, "banned")
    expect(user.status).toBe("banned")
  })
})
