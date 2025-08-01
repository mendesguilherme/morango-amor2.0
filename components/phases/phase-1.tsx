"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { PhaseProps } from "@/types/game-state"
import { avatars } from "@/data/constants"
import { Footer } from "@/components/footer"

export const Phase1 = ({ gameState, setGameState }: PhaseProps) => {
  const [currentPage, setCurrentPage] = useState(0)

  const selectAvatar = (avatarId: string) => {
    setGameState((prev) => ({ ...prev, avatar: avatarId }))
  }

  const startChallenge = () => {
    setGameState((prev) => ({ ...prev, phase: 2 }))
    window.scrollTo(0, 0)
  }

  // Calculate items per page based on screen size
  const getItemsPerPage = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1024) return 4 // lg and up
      if (window.innerWidth >= 768) return 2 // md
      return 1 // sm and below
    }
    return 4
  }

  const itemsPerPage = getItemsPerPage()
  const totalPages = Math.ceil(avatars.length / itemsPerPage)
  const startIndex = currentPage * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentAvatars = avatars.slice(startIndex, endIndex)

  const goToPage = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="text-center space-y-8">
      <div className="space-y-6">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-red-600 leading-snug sm:leading-normal text-center">
          <span className="block text-2xl sm:text-3xl lg:text-4xl mb-2">🍓 🍓 🍓</span>
          A TENDÊNCIA DOCE QUE PAROU O BRASIL
        </h1>

        <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-4 leading-snug text-center">
          <div>SE TODO MUNDO ESTÁ GANHANDO DINHEIRO COM ISSO… </div>
          <div className="text-red-600 mt-2">POR QUE VOCÊ AINDA NÃO ESTÁ? </div>
        </h2>

        <Card className="max-w-4xl mx-auto px-4 mb-4">
          <CardContent className="p-4 text-center space-y-1">
            <h3 className="text-base sm:text-lg font-medium text-gray-700">
              🧩 Escolha o perfil que combina com você
            </h3>
            <p className="text-sm text-gray-500">Qual tipo de empreendedor(a) você se encaixa?</p>
          </CardContent>
        </Card>


        <div className="relative">
          {/* Desktop: Show all 4 cards */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-4">
            {avatars.map((avatar) => (
              <Card
                key={avatar.id}
                onClick={() => selectAvatar(avatar.id)}
                className={`cursor-pointer hover:shadow-lg transition-shadow border-2 ${
                  gameState.avatar === avatar.id
                    ? "bg-red-50 border-red-500"
                    : "hover:border-red-300"
                }`}
              >
                <CardContent className="p-4 text-center space-y-3">

                  <div className="text-4xl">{avatar.emoji}</div>
                  <Avatar className="w-20 h-20 mx-auto">
                    <AvatarImage src={avatar.image || "/placeholder.svg"} alt={avatar.name} />
                    <AvatarFallback>
                      {avatar.name.split(" ")[0][0]}
                      {avatar.name.split(" ")[1][0]}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold text-lg">{avatar.name}</h3>
                  <p className="text-xs text-gray-600 font-medium">{avatar.profile}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{avatar.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Mobile/Tablet: Horizontal Scroll Carousel */}
          <div className="lg:hidden">
            <div className="overflow-x-auto px-4 -mx-4">
              <div className="flex gap-4 snap-x snap-mandatory scroll-pl-4 scroll-smooth overflow-x-scroll pb-4">
                {avatars.map((avatar) => (
                  <div
                    key={avatar.id}
                    className="flex-shrink-0 w-60 snap-center cursor-pointer transition-transform duration-300 transform hover:scale-105"
                    onClick={() => selectAvatar(avatar.id)}
                  >
                    <Card
                      className={`border-2 rounded-xl ${
                        gameState.avatar === avatar.id
                          ? "bg-red-50 border-red-500"
                          : "hover:border-red-300"
                      }`}
                    >
                      <CardContent className="p-4 text-center space-y-3">
                        <div className="text-4xl">{avatar.emoji}</div>
                        <Avatar className="w-20 h-20 mx-auto">
                          <AvatarImage src={avatar.image || "/placeholder.svg"} alt={avatar.name} />
                          <AvatarFallback>
                            {avatar.name.split(" ")[0][0]}
                            {avatar.name.split(" ")[1][0]}
                          </AvatarFallback>
                        </Avatar>
                        <h3 className="font-semibold text-lg">{avatar.name}</h3>
                        <p className="text-xs text-gray-600 font-medium">{avatar.profile}</p>
                        <p className="text-xs text-gray-500 leading-relaxed">{avatar.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination dots (opcional) */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-6">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => goToPage(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      currentPage === index ? "bg-red-500 w-8" : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <p className="text-center text-xs text-gray-500 mt-2">
                {currentPage + 1} de {totalPages}
              </p>
            )}
          </div>

        </div>

        <Card className="max-w-2xl mx-auto px-4 border-2 border-red-300 shadow-xl">
          <CardContent className="p-6 space-y-4">
            <div className="text-center">
              <div className="text-4xl mb-4 animate-bounce">🎮</div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-red-600 mb-4">ACEITE O DESAFIO AGORA!</h3>
            </div>
            <Button
              onClick={startChallenge}
              disabled={!gameState.avatar}
              className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white text-base sm:text-lg lg:text-xl py-3 sm:py-4 font-bold transform hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              COMEÇAR AGORA ➡️
            </Button>
            <div className="text-center">
              <p className="text-sm text-gray-600 animate-pulse">
                ⏰ <span className="font-bold">2.847 pessoas testaram hoje!</span> Sua vez chegou!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Microrecompensas Section */}
        <div className="max-w-4xl mx-auto px-4 mb-8">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-lg">
            <div className="space-y-4">
              {/* Acumule Saldo */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl">💰</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-green-700 mb-1">Acumule Saldo</h4>
                  <p className="text-sm text-gray-600">Ganhe R$ 50,00 de saldo por cada etapa completada</p>
                </div>
              </div>

              {/* Estratégias Exclusivas */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="w-12 h-12 bg-gradient-to-r from-red-400 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl">🎯</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-red-700 mb-1">Desbloqueie Estratégias</h4>
                  <p className="text-sm text-gray-600">
                    Acesse estratégias exclusivas para lucrar e atingir o público certo
                  </p>
                </div>
              </div>

              {/* Super Economia */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl">🔥</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-yellow-700 mb-1">Ganhe Super Economia</h4>
                  <p className="text-sm text-gray-600">Quanto mais se empenhar, mais lucro e economia você conquista</p>
                </div>
              </div>
            </div>

            <div className="text-center mt-6 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600 italic">
                ✨{" "}
                <span className="font-semibold">
                  Cada passo te aproxima da verdade sobre o lucro do Morango do Amor!
                </span>{" "}
                ✨
              </p>
            </div>
          </div>
        </div>        
      </div>

      <Footer />
    </div>
  )
}
