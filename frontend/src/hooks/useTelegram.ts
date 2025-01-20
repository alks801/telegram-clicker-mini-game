import { useEffect, useState } from "react"
import { MOCK_TELEGRAM } from "../utils/config"
import { mockTelegram } from "../mocks/telegram"

export type TelegramWindow = Window &
  typeof globalThis & {
    Telegram?: {
      WebApp: {
        initDataUnsafe: {
          user: unknown
        },
        ready: () => void,
        invokeCustomMethod: (method: string, opts: any) => Promise<any>
      }
    }
  }

export const useTelegram = () => {
  const [isTelegram, setIsTelegram] = useState(false)

  const win = window as TelegramWindow

  useEffect(() => {
    if (win.Telegram && win.Telegram.WebApp) {
      setIsTelegram(true)
      win.Telegram.WebApp.ready()
    } else if (!MOCK_TELEGRAM) {
      window.location.href = "https://t.me/your_bot_username"
    }
  }, [])

  return {
    user: MOCK_TELEGRAM ? mockTelegram.initDataUnsafe.user : win.Telegram?.WebApp.initDataUnsafe.user,
    webApp: MOCK_TELEGRAM ? mockTelegram.WebApp : win.Telegram?.WebApp,
    isTelegram,
  }
}
