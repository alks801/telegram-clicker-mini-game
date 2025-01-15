import { useEffect } from "react"
import { MOCK_TELEGRAM } from "../utils/config"
import { mockTelegram } from "../mocks/telegram"

export const useTelegram = () => {
  const [isTelegram, setIsTelegram] = useState(false)

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      setIsTelegram(true)
      window.Telegram.WebApp.ready()
    } else if (!MOCK_TELEGRAM) {
      window.location.href = "https://t.me/your_bot_username"
    }
  }, [])

  return {
    user: MOCK_TELEGRAM ? mockTelegram.initDataUnsafe.user : window.Telegram.WebApp.initDataUnsafe.user,
    webApp: MOCK_TELEGRAM ? mockTelegram.WebApp : window.Telegram.WebApp,
    isTelegram,
  }
}
