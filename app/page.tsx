"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FloatingStrawberries } from "@/components/floating-strawberries"
import { ProgressBar } from "@/components/progress-bar"
import { SalesNotification } from "@/components/sales-notification"
import type { GameState } from "@/types/game-state"
import { avatars, randomNames, randomCities } from "@/data/constants"
import { Phase1 } from "@/components/phases/phase-1"
import { Phase2 } from "@/components/phases/phase-2"
import { Phase3 } from "@/components/phases/phase-3"
import { Phase4 } from "@/components/phases/phase-4"
import { Phase5 } from "@/components/phases/phase-5"
import { Phase6 } from "@/components/phases/phase-6"
import { Phase7 } from "@/components/phases/phase-7"

export default function FunilMorango() {
  const [gameState, setGameState] = useState<GameState>({
    phase: 1,
    avatar: "",
    balance: 0,
    ingredients: [],
    totalCost: 0,
    totalPoints: 0,
    productionComplete: false,
    salePrice: 0,
    revenue: 0,
    profit: 0,
    productionCount: 0,
    totalInvestmentAccumulated: 0,
    totalRevenueAccumulated: 0,
    totalProfitAccumulated: 0,
  })

  const [isProducing, setIsProducing] = useState(false)
  const [progressPercentage, setProgressPercentage] = useState(0)
  const [notifications, setNotifications] = useState<
    Array<{ id: number; name: string; city: string; visible: boolean }>
  >([])
  const [usedNames, setUsedNames] = useState<string[]>([])
  const [onlineCount, setOnlineCount] = useState(0)
  const [userScore, setUserScore] = useState(0)
  const [userRanking, setUserRanking] = useState(0)
  const [ingredientChoices, setIngredientChoices] = useState<{ [key: number]: number }>({})

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Notificações para fase 7
  useEffect(() => {
    if (gameState.phase === 7) {
      const interval = setInterval(() => {
        const availableNames = randomNames.filter((name) => !usedNames.includes(name))
        if (availableNames.length === 0) return

        const randomName = availableNames[Math.floor(Math.random() * availableNames.length)]
        const randomCity = randomCities[Math.floor(Math.random() * randomCities.length)]
        const notificationId = Date.now()

        setUsedNames((prev) => [...prev, randomName])
        setNotifications((prev) => [
          ...prev,
          {
            id: notificationId,
            name: randomName,
            city: randomCity,
            visible: true,
          },
        ])

        setTimeout(() => {
          setNotifications((prev) => prev.filter((n) => n.id !== notificationId))
        }, 4000)
      }, 15000)

      return () => clearInterval(interval)
    }
  }, [gameState.phase, usedNames])

  // Contador online para fase 7
  useEffect(() => {
    if (gameState.phase === 7) {
      const initialCount = Math.floor(Math.random() * (1243 - 847 + 1)) + 847
      setOnlineCount(initialCount)

      const interval = setInterval(
        () => {
          setOnlineCount((prev) => {
            const variation = Math.floor(Math.random() * 11) - 5
            const newCount = prev + variation
            return Math.max(820, Math.min(1280, newCount))
          })
        },
        Math.random() * 4000 + 3000,
      )

      return () => clearInterval(interval)
    } else {
      setOnlineCount(0)
    }
  }, [gameState.phase])

  useEffect(() => {
    if (gameState.phase !== 7) {
      setUsedNames([])
    }
  }, [gameState.phase])

  const renderPhase = () => {
    const commonProps = {
      gameState,
      setGameState,
      isProducing,
      setIsProducing,
      progressPercentage,
      setProgressPercentage,
      userScore,
      setUserScore,
      userRanking,
      setUserRanking,
      ingredientChoices,
      setIngredientChoices,
      onlineCount,
    }

    switch (gameState.phase) {
      case 1:
        return <Phase1 {...commonProps} />
      case 2:
        return <Phase2 {...commonProps} />
      case 3:
        return <Phase3 {...commonProps} />
      case 4:
        return <Phase4 {...commonProps} />
      case 5:
        return <Phase5 {...commonProps} />
      case 6:
        return <Phase6 {...commonProps} />
      case 7:
        return <Phase7 {...commonProps} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-red-50 relative">
      <FloatingStrawberries />
      <ProgressBar gameState={gameState} totalPhases={7} />

      <div className="max-w-6xl mx-auto px-4 relative z-10 pt-32 sm:pt-40">
        {gameState.phase > 2 && (
          <Card className="mb-6 bg-white/80 backdrop-blur">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  {gameState.avatar && (
                    <Avatar>
                      <AvatarImage src={avatars.find((a) => a.id === gameState.avatar)?.image || "/placeholder.svg"} />
                      <AvatarFallback>{avatars.find((a) => a.id === gameState.avatar)?.name[0]}</AvatarFallback>
                    </Avatar>
                  )}
                  <div>
                    <p className="font-semibold">{avatars.find((a) => a.id === gameState.avatar)?.name}</p>
                    <p className="text-sm text-gray-600">Confeiteiro(a)</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Saldo atual</p>
                  <p className={`font-bold text-lg ${gameState.balance >= 0 ? "text-green-600" : "text-red-600"}`}>
                    R$ {gameState.balance.toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-500 italic">(simulação)</p>
                  {gameState.balance < 0 && (
                    <p className="text-xs text-blue-600 font-medium mt-1">
                      💡 Investimento inicial - o lucro vem nas vendas!
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {renderPhase()}
      </div>

      {notifications.map((notification) => (
        <SalesNotification key={notification.id} notification={notification} />
      ))}
    </div>
  )
}
