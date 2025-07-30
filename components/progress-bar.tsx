import type { GameState } from "@/types/game-state"

interface ProgressBarProps {
  gameState: GameState
  totalPhases: number
}

export const ProgressBar = ({ gameState, totalPhases }: ProgressBarProps) => {
  const phaseLabels = ["Perfil", "Desafio", "Produção", "Preços", "Vendas", "Segredo", "Oferta"]

  return (
    <div className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50 p-2 sm:p-3">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-2 sm:mb-3">
          <span className="text-xs sm:text-sm font-medium">Progresso</span>
          <span className="text-xs sm:text-sm text-gray-600">
            Etapa {gameState.phase} de {totalPhases}
          </span>
        </div>

        <div className="flex items-center justify-between mb-2">
          {Array.from({ length: totalPhases }, (_, i) => i + 1).map((step) => (
            <div key={step} className="flex flex-col items-center">
              <div
                className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  step <= gameState.phase
                    ? "bg-gradient-to-r from-red-500 to-green-500 text-white shadow-lg"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {step}
              </div>
              <span className="text-xs mt-1 text-gray-600 hidden sm:block">{phaseLabels[step - 1]}</span>
            </div>
          ))}
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-red-500 via-red-400 to-green-500 transition-all duration-500 ease-out rounded-full"
            style={{ width: `${(gameState.phase / totalPhases) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}
