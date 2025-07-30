"use client"

import { useState, useEffect } from "react"

interface SalesNotificationProps {
  notification: { id: number; name: string; city: string; visible: boolean }
}

export const SalesNotification = ({ notification }: SalesNotificationProps) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const showTimer = setTimeout(() => setIsVisible(true), 100)
    const hideTimer = setTimeout(() => setIsVisible(false), 3500)

    return () => {
      clearTimeout(showTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  return (
    <div
      className={`fixed bottom-4 left-4 z-50 max-w-sm transition-all duration-500 ease-in-out transform ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg shadow-2xl border-2 border-green-300">
        <div className="flex items-center gap-3">
          <div className="text-2xl animate-bounce">🎉</div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-bold text-sm">{notification.name}</span>
              <div className="text-lg">💰</div>
            </div>
            <div className="text-xs opacity-90 mb-1">{notification.city}</div>
            <div className="text-xs font-semibold">
              ✅ Acabou de adquirir o <span className="text-yellow-200">Plano Completo</span>
            </div>
          </div>
          <div className="text-xl animate-pulse">🚀</div>
        </div>
        <div className="mt-2 text-xs opacity-75 text-center">
          💡 <span className="font-semibold">Próximo passo:</span> Faturar R$ 10.000/mês
        </div>
      </div>
    </div>
  )
}
