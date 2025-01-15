import { MOCK_API } from "./config"
import { mockApi } from "../mocks/api"

const API_BASE_URL = "http://localhost:3000/api"

export const fetchData = async (endpoint: string, options?: RequestInit) => {
  if (MOCK_API) {
    // Use mocks in dev mode
    switch (endpoint) {
      case "/api/click":
        return mockApi.click()
      case "/api/upgrades":
        return mockApi.getUpgrades()
      case "/api/missions":
        return mockApi.getMissions()
      default:
        throw new Error("Mock endpoint not found")
    }
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, options)
  return response
}
