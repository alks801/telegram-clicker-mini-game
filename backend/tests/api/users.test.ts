import request from "supertest"
import { app } from "../../src/index"

describe("Users API", () => {
  it("should create a new user", async () => {
    const response = await request(app).post("/api/users").send({ username: "testuser", email: "test@example.com" })
    expect(response.status).toBe(201)
    expect(response.body.username).toBe("testuser")
  })

  it("should get a user by id", async () => {
    const response = await request(app).get("/api/users/1")
    expect(response.status).toBe(200)
    expect(response.body.id).toBe(1)
  })

  it("should update user status", async () => {
    const response = await request(app).put("/api/users/1/status").send({ status: "banned" })
    expect(response.status).toBe(200)
    expect(response.body.status).toBe("banned")
  })
})
