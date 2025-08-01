"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Star } from "lucide-react"
import type { PhaseProps } from "@/types/game-state"
import { Footer } from "@/components/footer"

export const Phase5 = ({ gameState, setGameState }: PhaseProps) => {
  const showSecret = () => {
    setGameState((prev) => ({ ...prev, phase: 6 }))
    window.scrollTo(0, 0)
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-lg sm:text-xl lg:text-3xl font-bold text-red-600">📈 SUA LOJA ESTÁ EVOLUINDO 🍓</h1>
        <div className="flex justify-center items-center gap-2 mt-4">
          <Trophy className="w-6 h-6 text-red-500" />
          <Badge className="bg-red-500">
            Medalha: {gameState.productionCount === 1 ? "Primeira Fornada Concluída" : "Empreendedor Experiente"}
          </Badge>
        </div>
      </div>

      <Card className="max-w-2xl mx-auto px-4">
        <CardContent className="p-6 space-y-6">
          <div className="text-center">
            <div className="text-6xl mb-4">🏪</div>
            <h3 className="text-lg sm:text-xl font-semibold mb-4">
              Resultados da {gameState.productionCount === 1 ? "Primeira" : "Segunda"} Venda
              {gameState.productionCount > 1 && (
                <span className="text-sm text-gray-600 block mt-1">
                  (Valores acumulados de {gameState.productionCount} vendas)
                </span>
              )}
            </h3>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between p-3 bg-gray-50 rounded">
              <span>
                {gameState.productionCount > 1 ? "Investimento total acumulado:" : "Investimento desta fornada:"}
              </span>
              <span className="text-red-600">-R$ {gameState.totalInvestmentAccumulated.toFixed(2)}</span>
            </div>
            <div className="flex justify-between p-3 bg-gray-50 rounded">
              <span>{gameState.productionCount > 1 ? "Receita total acumulada:" : "Receita (12 unidades):"}</span>
              <span className="text-green-600">+R$ {gameState.totalRevenueAccumulated.toFixed(2)}</span>
            </div>
            <div className="flex justify-between p-3 bg-green-100 rounded font-bold text-lg">
              <span>{gameState.productionCount > 1 ? "Lucro total acumulado:" : "Lucro desta fornada:"}</span>
              <span className="text-green-600">R$ {gameState.totalProfitAccumulated.toFixed(2)}</span>
            </div>
            <div className="flex justify-between p-3 bg-green-100 rounded font-bold text-xl border-2 border-green-300">
              <span>💰 Saldo total acumulado:</span>
              <span className="text-green-600">R$ {gameState.balance.toFixed(2)}</span>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-center font-medium mb-4">
              🎉 <strong>Parabéns! Você provou que possui a habilidade inicial necessária</strong> para mergulhar neste
              empreendimento lucrativo. Este foi apenas o primeiro passo da sua jornada empreendedora.
            </p>
            <p className="text-center font-medium mb-4">
              💡 Agora imagine <strong>repetir e aperfeiçoar</strong> esse processo todos os dias com:
            </p>
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-center gap-2">
                <Star className="w-4 h-4 text-red-500 fill-current" />
                <span className="font-semibold">Produção otimizada e escalável</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Star className="w-4 h-4 text-red-500 fill-current" />
                <span className="font-semibold">Preços estratégicos por região</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Star className="w-4 h-4 text-red-500 fill-current" />
                <span className="font-semibold">Estratégia estruturada de crescimento</span>
              </div>
            </div>
            <p className="text-center text-green-600 font-semibold">
              🚀 É exatamente isso que os confeiteiros de elite fazem. Eles têm um plano estruturado. Um plano que você
              pode desbloquear agora e evoluir do básico para o profissional.
            </p>
          </div>

          <div className="space-y-3">
            <Button
              onClick={showSecret}
              className="w-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:via-yellow-600 hover:to-yellow-700 text-black font-bold text-sm sm:text-base md:text-lg py-5 px-4 rounded-xl shadow-lg transition-all duration-200 border-2 border-yellow-300 text-center break-words whitespace-normal animate-pulse"
            >
              QUERO SABER O QUE ELES FAZEM DE DIFERENTE
            </Button>

          </div>

          {gameState.productionCount >= 2 && (
            <div className="bg-gradient-to-r from-green-100 to-green-50 p-4 rounded-lg border-2 border-green-300 text-center">
              <p className="text-green-700 font-semibold">
                🏆 <strong>Excelente!</strong> Você completou {gameState.productionCount} produções e provou sua
                dedicação. Agora é hora de descobrir os segredos profissionais!
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      <Footer />
    </div>
  )
}
