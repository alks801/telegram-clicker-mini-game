import React, { useState, useEffect } from "react"
import { TonConnect } from "@tonconnect/sdk"

export function usePaymentTON() {
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "pending" | "success" | "failed">("idle")
  const [connector, setConnector] = useState<TonConnect | null>(null)

  useEffect(() => {
    // Init TON Connect
    const tonConnect = new TonConnect({
      manifestUrl: "https://your-app.com/tonconnect-manifest.json", // URL manifest
    })

    setConnector(tonConnect)

    // Sunscribe on wallet's state change
    tonConnect.onStatusChange((wallet) => {
      if (wallet) {
        console.log("Wallet connected:", wallet)
      } else {
        console.log("Wallet disconnected")
      }
    })

    return () => {
      tonConnect.disconnect()
    }
  }, [])

  const handleTonPayment = async (amount: number, walletAddress: string) => {
    if (!connector) return

    setPaymentStatus("pending")

    try {
      // Transaction Creation
      const transaction = {
        validUntil: Math.floor(Date.now() / 1000) + 600, // 10 mins
        messages: [
          {
            address: walletAddress,
            amount: amount.toString(), // nanoTON (1 TON = 1e9 nanoTON)
          },
        ],
      }

      // Transaction Sending
      const result = await connector.sendTransaction(transaction)

      if (result) {
        setPaymentStatus("success")
        console.log("Payment successful:", result)
      } else {
        setPaymentStatus("failed")
        console.error("Payment failed")
      }
    } catch (error) {
      setPaymentStatus("failed")
      console.error("Error during payment:", error)
    }
  }

  return { handleTonPayment, paymentTONStatus: paymentStatus }
}
