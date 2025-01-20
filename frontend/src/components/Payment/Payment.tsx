import React, { useState } from "react"
import { usePaymentStars } from "./usePaymentStars"
import { usePaymentTON } from "./usePaymentTON"
import styles from "./Payment.module.scss"

type Props = {
  webApp: any
}

export const Payment = ({ webApp }: Props) => {
  const { handleTelegramStarsPayment, paymentTelegramStarsStatus } = usePaymentStars()
  const { handleTonPayment, paymentTONStatus } = usePaymentTON()

  return (
    <div className={styles.payment}>
      <h3>Payment</h3>
      <button onClick={() => handleTelegramStarsPayment(1)} disabled={paymentTelegramStarsStatus === "pending"}>
        Pay with Telegram Stars
      </button>
      <button
        onClick={() => handleTonPayment(1000000000, "TON_WALLET_ADDRESS")} // 1 TON
        disabled={paymentTONStatus === "pending"}
      >
        Pay 1 TON
      </button>
      {paymentTelegramStarsStatus === "success" && <p>Payment successful!</p>}
      {paymentTONStatus === "failed" && <p>Payment failed. Please try again.</p>}
    </div>
  )
}
