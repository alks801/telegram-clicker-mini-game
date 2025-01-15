import { renderHook } from "@testing-library/react-hooks"
import { useTelegram } from "../../src/hooks/useTelegram"

describe("useTelegram Hook", () => {
  it("should return mock user in dev mode", () => {
    const { result } = renderHook(() => useTelegram())
    expect(result.current.user?.first_name).toBe("Test")
  })
})
