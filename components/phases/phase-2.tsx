"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart } from "lucide-react"
import type { PhaseProps } from "@/types/game-state"
import { existingRanking, ingredientOptions, secretIngredient } from "@/data/constants"
import { Footer } from "@/components/footer"

export const Phase2 = ({
  gameState,
  setGameState,
  setIsProducing,
  setProgressPercentage,
  setUserScore,
  setUserRanking,
  ingredientChoices,
  setIngredientChoices,
}: PhaseProps) => {
  const handleIngredientChoice = (ingredientIndex: number, optionIndex: number) => {
    setIngredientChoices!((prev) => ({
      ...prev,
      [ingredientIndex]: optionIndex,
    }))
  }

  const calculateTotals = () => {
    let totalCost = 0
    let totalPoints = 0

    ingredientOptions.forEach((ingredient, index) => {
      const choiceIndex = ingredientChoices![index]
      if (choiceIndex !== undefined) {
        const choice = ingredient.options[choiceIndex]
        totalCost += choice.price
        totalPoints += choice.points
      }
    })

    if (Object.keys(ingredientChoices!).length === ingredientOptions.length) {
      totalCost += secretIngredient.price
      totalPoints += secretIngredient.points
    }

    return { totalCost, totalPoints }
  }

  const buyIngredients = () => {
    const { totalCost, totalPoints } = calculateTotals()

    setUserScore!(totalPoints)

    const position = existingRanking.filter((person) => person.score > totalPoints).length + 1
    setUserRanking!(position)

    setGameState((prev) => ({
      ...prev,
      phase: 3,
      ingredients: ingredientOptions.map((ingredient, index) => ({
        name: ingredient.name,
        quantity: ingredient.options[ingredientChoices![index]].quantity,
        price: ingredient.options[ingredientChoices![index]].price,
        points: ingredient.options[ingredientChoices![index]].points,
      })),
      totalCost,
      totalPoints,
      balance: prev.balance - totalCost,
    }))
    setIsProducing!(true)
    setProgressPercentage!(0)
    window.scrollTo(0, 0)

    let currentProgress = 0
    const progressInterval = setInterval(() => {
      currentProgress += 10
      setProgressPercentage!(currentProgress)

      if (currentProgress >= 100) {
        clearInterval(progressInterval)
        setTimeout(() => {
          setIsProducing!(false)
        }, 500)
      }
    }, 300)
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-lg sm:text-xl lg:text-3xl font-bold text-red-600">🛒 MONTE SUA RECEITA PERFEITA 🍓</h1>
        <p className="text-gray-600 mt-2">Complete a receita para 12 Morangos do Amor e ganhe pontos</p>
      </div>

      <Card className="max-w-2xl mx-auto px-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Receita Completa - 12 unidades
          </CardTitle>
          <CardDescription>Cada ingrediente correto adiciona pontos à sua receita</CardDescription>
          <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-300 mb-4">
            <div className="text-center">
              <div className="text-2xl mb-2">🎯</div>
              <h4 className="font-bold text-yellow-700 mb-2">DESAFIO: MONTE A RECEITA PERFEITA</h4>
              <p className="text-sm text-yellow-600">
                Escolha as quantidades corretas para cada ingrediente e ganhe pontos no ranking!
              </p>
              <p className="text-xs text-gray-600 mt-2">
                💡 Suas escolhas determinarão sua posição entre os confeiteiros vencedores
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {ingredientOptions.map((ingredient, index) => {
              const selectedOption = ingredientChoices![index]
              const choice = selectedOption !== undefined ? ingredient.options[selectedOption] : null

              return (
                <div key={index} className="p-3 bg-gray-50 rounded-lg border-l-4 border-yellow-400">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex-1">
                      <span className="font-medium text-gray-800">{ingredient.name}</span>
                      <p className="text-sm text-yellow-600 font-semibold">
                        {choice ? choice.quantity : "Quantidade: ???"}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary" className="mb-1">
                        R$ {choice ? choice.price.toFixed(2) : "???"}
                      </Badge>
                      <p className="text-xs text-yellow-600 font-bold">+??? pts</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {ingredient.options.map((option, optionIndex) => (
                      <button
                        key={optionIndex}
                        onClick={() => handleIngredientChoice(index, optionIndex)}
                        className={`text-xs border rounded px-2 py-1 transition-all ${
                          selectedOption === optionIndex
                            ? "bg-blue-500 text-white border-blue-500"
                            : "bg-white border-gray-300 hover:bg-blue-50 hover:border-blue-300"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Ingrediente secreto */}
          <div className="bg-gradient-to-r from-yellow-50 via-orange-50 to-yellow-100 p-6 rounded-lg border-4 border-yellow-300 relative overflow-hidden text-center">
            <div className="absolute top-3 right-3 z-10">
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center animate-pulse shadow-lg">
                <span className="text-white text-sm">🔒</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="text-2xl animate-bounce">✨</span>
                <span className="font-bold text-yellow-700 text-lg">INGREDIENTE SECRETO PREMIUM</span>
                <span className="text-2xl animate-bounce" style={{ animationDelay: "0.5s" }}>
                  💎
                </span>
              </div>

              <p className="text-sm text-yellow-600 font-semibold italic max-w-md mx-auto">
                {secretIngredient.description}
              </p>

              <div className="flex items-center justify-center gap-3 mt-4">
                <span className="text-xs bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full font-bold">
                  🔒 EXCLUSIVO DO PLANO COMPLETO
                </span>
                <span className="text-xs bg-orange-200 text-orange-800 px-3 py-1 rounded-full font-bold">
                  +??? PONTOS BÔNUS
                </span>
              </div>

              <div className="flex items-center justify-center gap-4 mt-3">
                <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">R$ ???</Badge>
                <p className="text-xs text-yellow-600 font-bold animate-pulse">+??? pts</p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-yellow-200">
              <p className="text-xs text-yellow-700 font-semibold">
                🏆 Este ingrediente especial é o segredo dos confeiteiros que faturam R$ 10.000/mês
              </p>
            </div>
          </div>

          <div className="border-t pt-4">
            <Button
              onClick={buyIngredients}
              disabled={Object.keys(ingredientChoices!).length !== ingredientOptions.length}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              🎯{" "}
              {Object.keys(ingredientChoices!).length === ingredientOptions.length
                ? "Finalizar Escolhas e Ver Minha Posição no Ranking"
                : `Escolha os ingredientes (${Object.keys(ingredientChoices!).length}/${ingredientOptions.length})`}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Footer />
    </div>
  )
}
