import React, { useState } from "react"
import { TelegramWindow } from "../../hooks/useTelegram"

export function usePaymentStars() {
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "pending" | "success" | "failed">("idle")

  const handleTelegramStarsPayment = async (amount: number) => {
    setPaymentStatus("pending")

    try {
      const win = window as TelegramWindow

      const result = await win.Telegram?.WebApp.invokeCustomMethod("payWithStars", { amount })

      if (result.status === "success") {
        setPaymentStatus("success")
        console.log("Payment successful:", result)
      } else {
        setPaymentStatus("failed")
        console.error("Payment failed:", result)
      }
    } catch (error) {
      setPaymentStatus("failed")
      console.error("Error during payment:", error)
    }
  }

  return { handleTelegramStarsPayment, paymentTelegramStarsStatus: paymentStatus }
}
