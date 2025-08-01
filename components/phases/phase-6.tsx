"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Gift } from "lucide-react"
import type { PhaseProps } from "@/types/game-state"
import { Footer } from "@/components/footer"

export const Phase6 = ({ gameState, setGameState }: PhaseProps) => {
  const showOffer = () => {
    setGameState((prev) => ({ ...prev, phase: 7 }))
    window.scrollTo(0, 0)
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-lg sm:text-xl lg:text-3xl font-bold text-red-600">
          🎁 O SEGREDO DOS CONFEITEIROS QUE LUCRAM R$ 10 MIL POR MÊS 🍓
        </h1>
      </div>

      <Card className="max-w-2xl mx-auto px-4 bg-gradient-to-br from-red-900 to-black text-white">
        <CardContent className="p-8 space-y-6">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-red-400 to-red-500 rounded-full flex items-center justify-center text-4xl animate-bounce">
              🔒
            </div>
          </div>

          <div className="space-y-4 text-center">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-red-400">
              Não é só a receita. É a estratégia.
            </h3>

            <div className="space-y-3 text-left">
              <div className="flex items-start gap-3">
                <Star className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                <p>Como montar preços por região</p>
              </div>
              <div className="flex items-start gap-3">
                <Star className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                <p>Controlar o custo por unidade</p>
              </div>
              <div className="flex items-start gap-3">
                <Star className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                <p>Planejar a escala de produção</p>
              </div>
              <div className="flex items-start gap-3">
                <Star className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                <p>Usar datas comemorativas a seu favor</p>
              </div>
            </div>

            <div className="bg-red-800 p-4 rounded-lg">
              <p className="text-sm">
                Esse material foi compilado em um guia passo a passo para transformar sua produção caseira em um negócio
                real, lucrativo e sustentável.
              </p>
            </div>
          </div>

          <Button
            onClick={showOffer}
            className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold text-sm sm:text-base md:text-lg py-5 px-4 rounded-xl shadow-lg transition-all duration-200 text-center break-words whitespace-normal flex items-center justify-center gap-2 animate-pulse"
          >
            <Gift className="w-5 h-5" />
            <span className="text-center">DESBLOQUEAR AGORA O PLANO COMPLETO</span>
          </Button>
        </CardContent>
      </Card>
      <Footer />
    </div>
  )
}
