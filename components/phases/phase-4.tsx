"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { PhaseProps } from "@/types/game-state"
import { priceOptions } from "@/data/constants"
import { Footer } from "@/components/footer"

export const Phase4 = ({ gameState, setGameState }: PhaseProps) => {
  const [selectedOption, setSelectedOption] = useState<(typeof priceOptions)[0] | null>(null)

  const selectPrice = (option: (typeof priceOptions)[0]) => {
    setSelectedOption(option)
  }

  const confirmPrice = () => {
    if (!selectedOption) return

    const revenue = selectedOption.price * 12
    const profit = revenue - gameState.totalCost
    setGameState((prev) => ({
      ...prev,
      phase: 5,
      salePrice: selectedOption.price,
      revenue,
      profit,
      balance: prev.balance + revenue,
      productionCount: prev.productionCount + 1,
      totalInvestmentAccumulated: prev.totalInvestmentAccumulated + prev.totalCost,
      totalRevenueAccumulated: prev.totalRevenueAccumulated + revenue,
      totalProfitAccumulated: prev.totalProfitAccumulated + profit,
    }))
    window.scrollTo(0, 0)
  }

  const getStrategyAnalysis = () => {
    if (!selectedOption) return null

    const revenue = selectedOption.price * 12
    const profit = revenue - gameState.totalCost
    const profitMargin = (profit / revenue) * 100

    // Análise baseada no custo e margem de lucro
    let strategy = ""
    let color = ""
    let recommendation = ""

    if (gameState.totalCost > 20 && selectedOption.price <= 7) {
      strategy = "⚠️ ESTRATÉGIA ARRISCADA"
      color = "text-red-600"
      recommendation =
        "Você gastou muito na produção e está vendendo barato. Isso pode comprometer sua lucratividade a longo prazo."
    } else if (gameState.totalCost <= 17.87 && selectedOption.price >= 10) {
      strategy = "🎯 ESTRATÉGIA PERFEITA"
      color = "text-green-600"
      recommendation =
        "Excelente! Você controlou os custos e definiu um preço estratégico. Essa é a fórmula dos confeiteiros que mais faturam no Brasil."
    } else if (profitMargin >= 70) {
      strategy = "🚀 ESTRATÉGIA AGRESSIVA"
      color = "text-blue-600"
      recommendation =
        "Boa margem de lucro! Você está seguindo o caminho dos confeiteiros de elite que maximizam seus ganhos."
    } else if (profitMargin >= 50) {
      strategy = "👍 ESTRATÉGIA EQUILIBRADA"
      color = "text-yellow-600"
      recommendation =
        "Estratégia sólida! Você está no caminho certo, mas há espaço para otimização como fazem os profissionais."
    } else {
      strategy = "📈 ESTRATÉGIA CONSERVADORA"
      color = "text-orange-600"
      recommendation =
        "Estratégia segura, mas os confeiteiros que mais lucram no Brasil são mais ousados na precificação."
    }

    return { strategy, color, recommendation, profit, profitMargin }
  }

  const analysis = getStrategyAnalysis()

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-lg sm:text-xl lg:text-3xl font-bold text-green-600">💵 DEFINA SEU PREÇO POR UNIDADE 🍓</h1>
        <p className="text-gray-600 mt-2">Escolha sua estratégia de preço</p>
      </div>

      <div className="grid grid-cols-1 gap-4 max-w-2xl mx-auto px-4">
        {priceOptions.map((option, index) => (
          <Card
            key={index}
            className={`cursor-pointer hover:shadow-lg transition-all border-2 ${
              selectedOption?.price === option.price ? "border-green-500 bg-green-50" : "hover:border-green-300"
            }`}
            onClick={() => selectPrice(option)}
          >
            <CardHeader className="text-center">
              <CardTitle className="text-lg sm:text-xl lg:text-2xl text-green-600">
                Valor de venda: R$ {option.price.toFixed(2)}
              </CardTitle>
              <CardDescription>por unidade</CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-2">
              <p className="text-sm">Lucro: R$ {option.profit.toFixed(2)}/unid.</p>
              <p className="font-bold text-lg">Lucro total: R$ {option.total.toFixed(2)}</p>
              <p className="text-xs text-gray-500 italic">(produção inicial de 12 unidades)</p>
              <Badge variant={index === 1 ? "default" : "secondary"}>
                {index === 0 ? "Conservador" : index === 1 ? "Recomendado" : "Ousado"}
              </Badge>
              {selectedOption?.price === option.price && (
                <div className="mt-2">
                  <Badge className="bg-green-500">✓ Selecionado</Badge>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Análise Estratégica */}
      {analysis && (
        <Card className="max-w-4xl mx-auto px-4 bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200">
          <CardHeader>
            <CardTitle className="text-center text-xl text-blue-700">📊 Análise da Sua Estratégia</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <h3 className={`text-xl font-bold ${analysis.color} mb-2`}>{analysis.strategy}</h3>
              <p className="text-gray-700 mb-4">{analysis.recommendation}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg border border-blue-200 text-center">
                <p className="text-sm text-gray-600">Custo de Produção</p>
                <p className="text-lg font-bold text-red-600">R$ {gameState.totalCost.toFixed(2)}</p>
                <p className="text-xs text-gray-500">{gameState.totalCost <= 17.87 ? "✅ Controlado" : "⚠️ Alto"}</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-blue-200 text-center">
                <p className="text-sm text-gray-600">Lucro Estimado</p>
                <p className="text-lg font-bold text-green-600">R$ {analysis.profit.toFixed(2)}</p>
                <p className="text-xs text-gray-500">12 unidades</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-blue-200 text-center">
                <p className="text-sm text-gray-600">Margem de Lucro</p>
                <p className="text-lg font-bold text-blue-600">{analysis.profitMargin.toFixed(1)}%</p>
                <p className="text-xs text-gray-500">
                  {analysis.profitMargin >= 70
                    ? "🚀 Excelente"
                    : analysis.profitMargin >= 50
                      ? "👍 Boa"
                      : "📈 Pode melhorar"}
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-100 to-yellow-50 p-4 rounded-lg border-2 border-yellow-300">
              <h4 className="font-bold text-yellow-700 mb-2">💡 Dica dos Confeiteiros Profissionais:</h4>
              <p className="text-sm text-yellow-800">
                {analysis.profitMargin >= 70
                  ? "Você está aplicando a estratégia dos confeiteiros que faturam R$ 10.000+/mês! Eles sabem que margem alta é fundamental para crescer."
                  : analysis.profitMargin >= 50
                    ? "Você está no caminho certo! Os profissionais sempre buscam margens acima de 70% para reinvestir no negócio."
                    : "Os confeiteiros de sucesso no Brasil trabalham com margens mais altas. Eles sabem que preço baixo não garante mais vendas, qualidade sim!"}
              </p>
            </div>

           <Button
              onClick={confirmPrice}
              disabled={!selectedOption}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold text-sm sm:text-base md:text-lg py-5 px-4 rounded-xl shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-center break-words whitespace-normal animate-pulse"
            >
              CONFIRMAR ESTRATÉGIA E SIMULAR VENDAS
            </Button>

          </CardContent>
        </Card>
      )}

      <Card className="max-w-4xl mx-auto px-4 mt-8 bg-gradient-to-br from-green-50 to-white">
        <CardHeader>
          <CardTitle className="text-center text-xl text-green-700">📊 Projeções Reais de Vendas no Brasil</CardTitle>
          <CardDescription className="text-center">
            Veja o que confeiteiros estão faturando sem esforço pelo país
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {(() => {
              // Determine user's category based on selected price and balance
              let userCategory = null
              if (selectedOption) {
                const revenue = selectedOption.price * 12
                const profit = revenue - gameState.totalCost

                if (selectedOption.price <= 8 || profit <= 50) {
                  userCategory = "caseiras"
                } else if (selectedOption.price >= 9 && selectedOption.price <= 11 && profit > 50) {
                  userCategory = "feiras"
                } else if (selectedOption.price >= 12 || profit >= 100) {
                  userCategory = "estruturado"
                }
              }

              const categories = [
                {
                  id: "caseiras",
                  title: "🏠 Vendas Caseiras",
                  subtitle: "10-15 unidades/dia",
                  borderColor: "border-red-400",
                  titleColor: "text-red-700",
                  data: [
                    { label: "Por dia:", value: "R$ 100-150" },
                    { label: "Por semana:", value: "R$ 700-1.050" },
                    { label: "Por mês:", value: "R$ 3.000-4.500" },
                  ],
                },
                {
                  id: "feiras",
                  title: "🎪 Feiras e Eventos",
                  subtitle: "30-50 unidades/dia",
                  borderColor: "border-green-400",
                  titleColor: "text-green-700",
                  data: [
                    { label: "Por dia:", value: "R$ 300-500" },
                    { label: "Por semana:", value: "R$ 2.100-3.500" },
                    { label: "Por mês:", value: "R$ 9.000-15.000" },
                  ],
                },
                {
                  id: "estruturado",
                  title: "🚀 Negócio Estruturado",
                  subtitle: "80-120 unidades/dia",
                  borderColor: "border-red-400",
                  titleColor: "text-red-700",
                  data: [
                    { label: "Por dia:", value: "R$ 800-1.200" },
                    { label: "Por semana:", value: "R$ 5.600-8.400" },
                    { label: "Por mês:", value: "R$ 24.000-36.000" },
                  ],
                },
              ]

              return categories.map((category) => {
                const isUserCategory = userCategory === category.id

                return (
                  <div
                    key={category.id}
                    className={`bg-white p-4 rounded-lg border-l-4 ${category.borderColor} relative ${
                      isUserCategory ? "ring-4 ring-blue-300 bg-blue-50" : ""
                    }`}
                  >
                    {isUserCategory && (
                      <div className="absolute -top-2 -right-2 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                        🎯 SEU PERFIL
                      </div>
                    )}
                    <h4 className={`font-semibold ${category.titleColor} mb-2`}>{category.title}</h4>
                    <p className="text-sm text-gray-600 mb-3">{category.subtitle}</p>
                    <div className="space-y-1 text-sm">
                      {category.data.map((item, index) => (
                        <div
                          key={index}
                          className={`flex justify-between ${index === category.data.length - 1 ? "border-t pt-1" : ""}`}
                        >
                          <span>{item.label}</span>
                          <span
                            className={`font-semibold ${index === category.data.length - 1 ? "font-bold text-green-700" : "text-green-600"}`}
                          >
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>
                    {isUserCategory && (
                      <div className="mt-3 p-2 bg-blue-100 rounded-lg border border-blue-300">
                        <p className="text-xs text-blue-700 font-semibold text-center">
                          💡 Com sua estratégia atual, você se enquadra neste modelo de negócio!
                        </p>
                      </div>
                    )}
                  </div>
                )
              })
            })()}
          </div>

          <div className="bg-gradient-to-r from-red-100 to-red-50 p-4 rounded-lg text-center">
            <p className="text-sm font-medium text-gray-700 mb-2">
              💡 <strong>Dados reais:</strong> Baseado em pesquisa com 500+ confeiteiros brasileiros
            </p>
            <p className="text-xs text-gray-600">
              *Valores calculados com preço médio de R$ 10,00 por unidade. Resultados podem variar conforme região e
              estratégia.
            </p>
          </div>

          <div className="text-center">
            <p className="text-lg font-semibold text-gray-700 mb-2">🎯 Qual nível você quer alcançar?</p>
            <p className="text-sm text-gray-600">
              {selectedOption
                ? "Sua escolha de preço determina seu modelo de negócio!"
                : "Escolha seu preço acima e vamos calcular seu potencial de lucro!"}
            </p>
          </div>
        </CardContent>
      </Card>
      <Footer />
    </div>
  )
}
