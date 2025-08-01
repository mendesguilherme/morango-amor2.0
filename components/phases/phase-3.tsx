"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { PhaseProps } from "@/types/game-state"
import { Footer } from "@/components/footer"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy } from "lucide-react"
import { avatars, existingRanking } from "@/data/constants"

export const Phase3 = ({ gameState, setGameState, isProducing, progressPercentage }: PhaseProps) => {
  const completeProduction = () => {
    setGameState((prev) => ({
      ...prev,
      phase: 4,
      productionComplete: true,
    }))
    window.scrollTo(0, 0)
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-lg sm:text-xl lg:text-3xl font-bold text-red-600">🍭 HORA DE COLOCAR A MÃO NA CALDA 🍓</h1>
        <p className="text-gray-600 mt-2">
          {isProducing
            ? "Produção simulada em andamento..."
            : "Produção simulada concluída! Agora é hora de provar que faz as melhores escolhas para a venda correta."}
        </p>
      </div>

      <Card className="max-w-2xl mx-auto px-4">
        <CardContent className="p-6 space-y-6">
          <div className="text-center">
            {isProducing ? (
              <>
                <div className="w-full bg-gray-200 rounded-full h-8 overflow-hidden relative">
                  <div
                    className="h-full bg-gradient-to-r from-red-500 via-red-400 to-green-500 transition-all duration-300 ease-out rounded-full"
                    style={{ width: `${isProducing ? progressPercentage : 100}%` }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold text-white drop-shadow-lg">
                      {isProducing ? `${progressPercentage}% Concluído` : "100% Concluído"}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="w-full bg-gray-200 rounded-full h-8 overflow-hidden relative">
                  <div
                    className="h-full bg-gradient-to-r from-red-500 via-red-400 to-green-500 transition-all duration-500 ease-out rounded-full"
                    style={{ width: "100%" }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold text-white drop-shadow-lg">100% Concluído</span>
                  </div>
                </div>

                <p className="text-green-600 font-semibold">Produção concluída com sucesso!</p>
              </>
            )}

            <div className="w-full max-w-80 h-48 sm:h-60 mx-auto rounded-lg overflow-hidden shadow-lg mt-4 mb-4">
              <img
                src="/images/morangos-producao.jpg"
                alt="12 Morangos do Amor sendo produzidos"
                className={`w-full h-full object-cover hover:scale-105 transition-transform duration-300 ${
                  isProducing ? "animate-pulse" : ""
                }`}
              />
            </div>

            <div className="mt-4 space-y-2">
              <p className="text-lg font-semibold text-center text-red-700">
                🍓 Você está produzindo 12 unidades premium:
              </p>
              <div className="space-y-1 text-base">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-red-500">✨</span>
                  <span>
                    <strong>Recheio especial</strong> cremoso e saboroso
                  </span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-red-500">🥧</span>
                  <span>
                    <strong>Cobertura crocante</strong> que derrete na boca
                  </span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-green-500">🏆</span>
                  <span>
                    <strong>Receita premium</strong> com qualidade superior
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600 text-center italic mt-3">
                💡 Cada detalhe faz toda a diferença no resultado final!
              </p>
            </div>
          </div>

          {isProducing ? (
            <>
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin text-2xl">🍓</div>
                  <p className="text-red-600 font-semibold animate-pulse">Produzindo seus morangos...</p>
                  <div className="animate-spin text-2xl" style={{ animationDelay: "0.5s" }}>
                    🍓
                  </div>
                </div>
                <p className="text-sm text-gray-500">Aguarde, a magia está acontecendo...</p>
              </div>
            </>
          ) : (
            <>
              <div className="text-center space-y-4">
                {/* Seção de Resultados da Pontuação */}
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-lg border-2 border-yellow-300 space-y-4">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Trophy className="w-6 h-6 text-yellow-600" />
                    <h3 className="text-xl font-bold text-orange-700">🏆 SEUS RESULTADOS</h3>
                  </div>

                  <div className="grid grid-cols-1 gap-4 mb-4">
                    {/* Custo com Termômetro */}
                    <div className="text-center p-4 bg-white rounded-lg border border-yellow-200">
                      <p className="text-sm text-gray-600 mb-2">Custo Total</p>
                      <p className="text-lg font-bold text-red-600 mb-2">R$ {gameState.totalCost.toFixed(2)}</p>

                      {/* Termômetro de Custo */}
                      <div className="w-full bg-gray-200 rounded-full h-4 mb-2 relative overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            gameState.totalCost <= 17.87
                              ? "bg-gradient-to-r from-green-400 to-green-500"
                              : gameState.totalCost <= 22.0
                                ? "bg-gradient-to-r from-yellow-400 to-yellow-500"
                                : "bg-gradient-to-r from-red-400 to-red-500"
                          }`}
                          style={{
                            width: `${Math.min(100, (gameState.totalCost / 30) * 100)}%`,
                          }}
                        ></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs font-bold text-white drop-shadow-lg">
                            {gameState.totalCost <= 17.87
                              ? "🎯 PERFEITO"
                              : gameState.totalCost <= 22.0
                                ? "⚠️ MÉDIO"
                                : "🔥 ALTO"}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-gray-500">
                        {gameState.totalCost <= 17.87
                          ? "Custo ideal alcançado!"
                          : gameState.totalCost <= 22.0
                            ? "Custo aceitável"
                            : "Suas escolhas foram acima do ideal, mas não se preocupe - você está aprendendo o processo!"}
                      </p>
                    </div>

                    {/* Pontuação com Termômetro */}
                    <div className="text-center p-4 bg-white rounded-lg border border-yellow-200">
                      <p className="text-sm text-gray-600 mb-2">Pontuação Total</p>
                      <p className="text-lg font-bold text-green-600 mb-2">{gameState.totalPoints} pontos</p>

                      {/* Termômetro de Pontuação */}
                      <div className="w-full bg-gray-200 rounded-full h-4 mb-2 relative overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            gameState.totalPoints >= 120
                              ? "bg-gradient-to-r from-green-400 to-green-500"
                              : gameState.totalPoints >= 100
                                ? "bg-gradient-to-r from-yellow-400 to-yellow-500"
                                : "bg-gradient-to-r from-red-400 to-red-500"
                          }`}
                          style={{
                            width: `${Math.min(100, (gameState.totalPoints / 150) * 100)}%`,
                          }}
                        ></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs font-bold text-white drop-shadow-lg">
                            {gameState.totalPoints >= 120
                              ? "🏆 EXCELENTE"
                              : gameState.totalPoints >= 100
                                ? "👍 BOM"
                                : "📈 PODE MELHORAR"}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-gray-500">
                        {gameState.totalPoints >= 120
                          ? "Performance excepcional!"
                          : gameState.totalPoints >= 100
                            ? "Boa performance"
                            : "Há espaço para melhoria"}
                      </p>
                    </div>
                  </div>

                  {/* Ranking com posição do usuário */}
                  <div className="bg-white p-4 rounded-lg border border-yellow-200">
                    <h4 className="font-bold text-center text-orange-700 mb-3">🏆 SUA POSIÇÃO NO RANKING</h4>
                    <div className="space-y-2">
                      {(() => {
                        // Create combined ranking with user
                        const userEntry = {
                          name: "Você",
                          score: gameState.totalPoints,
                          avatar: avatars.find((a) => a.id === gameState.avatar)?.image || "/placeholder.svg",
                          isUser: true,
                        }

                        // Combine existing ranking with user
                        const allParticipants = [...existingRanking.map((p) => ({ ...p, isUser: false })), userEntry]

                        // Sort by score (descending), but if user ties with someone, put the existing person first
                        const sortedRanking = allParticipants.sort((a, b) => {
                          if (a.score === b.score) {
                            // If scores are equal, prioritize existing participants over user
                            if (a.isUser && !b.isUser) return 1
                            if (!a.isUser && b.isUser) return -1
                            return 0
                          }
                          return b.score - a.score
                        })

                        return sortedRanking.slice(0, 6).map((person, index) => (
                          <div
                            key={person.isUser ? "user" : index}
                            className={`flex items-center gap-3 p-2 rounded border-l-4 ${
                              person.isUser
                                ? "bg-gradient-to-r from-blue-100 to-blue-50 border-blue-400"
                                : "bg-gray-50 border-yellow-400"
                            }`}
                          >
                            <div className="text-lg">
                              {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : "🎯"}
                            </div>
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={person.avatar || "/placeholder.svg"} />
                              <AvatarFallback>{person.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className={`font-semibold text-sm ${person.isUser ? "text-blue-800" : ""}`}>
                                {person.name}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className={`font-bold text-sm ${person.isUser ? "text-blue-600" : "text-orange-600"}`}>
                                {person.score} pts
                              </p>
                              <p className="text-xs text-gray-500">#{index + 1}</p>
                            </div>
                          </div>
                        ))
                      })()}
                    </div>
                  </div>
                </div>

                <Button
                  onClick={completeProduction}
                  className="w-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:via-yellow-600 hover:to-yellow-700 text-black font-bold text-sm sm:text-base md:text-lg py-5 px-4 rounded-xl shadow-lg transition-all duration-200 border-2 border-yellow-300 text-center break-words whitespace-normal"
                >
                  SIMULAR VENDA DOS 12 MORANGOS
                </Button>


              </div>
            </>
          )}
        </CardContent>
      </Card>
      <Footer />
    </div>
  )
}
