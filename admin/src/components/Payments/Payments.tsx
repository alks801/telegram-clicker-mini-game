import React, { useEffect, useState } from "react"
import styles from "./Payments.module.scss"
import { useApi } from "../../hooks/useApi"

interface Payment {
  id: number
  user_id: number
  payment_type: string
  amount: number
  status: string
  created_at: string
}

export const Payments = () => {
  const [payments, setPayments] = useState<Payment[]>([])
  const { fetchData } = useApi()

  useEffect(() => {
    const loadPayments = async () => {
      const response = await fetchData("/admin/payments")
      if (response.ok) {
        const data = await response.json()
        setPayments(data)
      }
    }
    loadPayments()
  }, [fetchData])

  return (
    <div className={styles.payments}>
      <h2>Payments</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td>{payment.id}</td>
              <td>{payment.user_id}</td>
              <td>{payment.payment_type}</td>
              <td>{payment.amount}</td>
              <td>{payment.status}</td>
              <td>{payment.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
