export interface User {
  id: number
  username: string
  email: string
  created_at: Date
  last_interaction: Date
  status: "active" | "banned"
  coins: number
  crystals: number
  energy: number
}

export interface Upgrade {
  id: number
  user_id: number
  upgrade_type: string
  level: number
  cost: number
}

export interface Mission {
  id: number
  user_id: number
  mission_type: string
  progress: number
  completed: boolean
}

export interface Promotion {
  id: number
  title: string
  description: string
  start_date: Date
  end_date: Date
  reward_coins: number
  reward_crystals: number
  is_active: boolean
}

export interface Payment {
  id: number
  user_id: number
  payment_type: "stars" | "ton"
  amount: number
  status: "pending" | "completed" | "failed"
  created_at: Date
}
