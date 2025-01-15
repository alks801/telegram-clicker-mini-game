import { useEffect } from "react"
import { MOCK_TELEGRAM } from "../utils/config"
import { mockTelegram } from "../mocks/telegram"

export const useTelegram = () => {
  useEffect(() => {
    if (MOCK_TELEGRAM) {
      // Use mocks in dev mode
      window.Telegram = mockTelegram
    } else {
      // Init Telegram WebApp
      window.Telegram.WebApp.ready()
    }
  }, [])

  return {
    user: MOCK_TELEGRAM ? mockTelegram.initDataUnsafe.user : window.Telegram.WebApp.initDataUnsafe.user,
    webApp: MOCK_TELEGRAM ? mockTelegram.WebApp : window.Telegram.WebApp,
  }
}
