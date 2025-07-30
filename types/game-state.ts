import type React from "react"
export interface GameState {
  phase: number
  avatar: string
  balance: number
  ingredients: { name: string; quantity: string; price: number; points: number }[]
  totalCost: number
  totalPoints: number
  productionComplete: boolean
  salePrice: number
  revenue: number
  profit: number
  productionCount: number
  totalInvestmentAccumulated: number
  totalRevenueAccumulated: number
  totalProfitAccumulated: number
}

export interface PhaseProps {
  gameState: GameState
  setGameState: React.Dispatch<React.SetStateAction<GameState>>
  isProducing?: boolean
  setIsProducing?: React.Dispatch<React.SetStateAction<boolean>>
  progressPercentage?: number
  setProgressPercentage?: React.Dispatch<React.SetStateAction<number>>
  userScore?: number
  setUserScore?: React.Dispatch<React.SetStateAction<number>>
  userRanking?: number
  setUserRanking?: React.Dispatch<React.SetStateAction<number>>
  ingredientChoices?: { [key: number]: number }
  setIngredientChoices?: React.Dispatch<React.SetStateAction<{ [key: number]: number }>>
  onlineCount?: number
}
