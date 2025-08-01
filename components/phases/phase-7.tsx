import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, Star, Zap } from "lucide-react"
import type { PhaseProps } from "@/types/game-state"
import { Footer } from "@/components/footer"

export const Phase7 = ({ gameState, onlineCount }: PhaseProps) => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-lg sm:text-xl lg:text-3xl font-bold text-green-600">
          🎉 PARABÉNS! VOCÊ MERECE UM DESCONTO ESPECIAL 🍓
        </h1>
        <div className="flex justify-center items-center gap-2 mt-4">
          <Clock className="w-5 h-5 text-red-500" />
          <Badge variant="destructive">Oferta expira em 8 minutos</Badge>
        </div>

        {/* Contador de pessoas online */}
        <div className="flex justify-center items-center gap-2 mt-3">
          <div className="flex items-center gap-1 bg-gradient-to-r from-red-100 to-red-50 px-3 py-1 rounded-full border border-red-200">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-red-700">
              {onlineCount?.toLocaleString()} PESSOAS VISUALIZANDO ESTA OFERTA AGORA 🍓
            </span>
            <div className="text-sm animate-bounce">👥</div>
          </div>
        </div>
      </div>

      {/* Componente Flutuante de Escassez */}
      <div className="fixed bottom-4 right-2 sm:right-4 z-50 max-w-sm scale-75">
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-2 sm:p-3 rounded-xl shadow-2xl border-2 border-red-300 animate-pulse transform scale-90">
          <div className="text-center space-y-1 sm:space-y-2">
            <div className="text-xs font-bold">MORANGO DO AMOR</div>
            <div className="flex items-center justify-center gap-1">
              <div className="text-lg sm:text-2xl animate-bounce">🔥</div>
              <div className="text-lg sm:text-2xl animate-bounce" style={{ animationDelay: "0.2s" }}>
                🔥
              </div>
              <div className="text-lg sm:text-2xl animate-bounce" style={{ animationDelay: "0.4s" }}>
                🔥
              </div>
            </div>
            <div className="text-xs font-bold">TENDÊNCIA QUENTE</div>
            <div className="w-full bg-red-300 rounded-full h-2 overflow-hidden">
              <div className="h-full bg-white animate-pulse" style={{ width: "85%" }}></div>
            </div>
            <div className="text-xs">85% do pico</div>
            <div className="text-xs font-semibold">⏰ Aproveite AGORA!</div>
          </div>
        </div>
      </div>

      {/* Plano Completo - PRIMEIRO */}
      <Card className="max-w-3xl mx-auto px-4 border-2 border-green-500">
        <CardHeader className="bg-green-50">
          <CardTitle className="text-lg sm:text-xl lg:text-2xl text-center">Plano Completo Morango do Amor</CardTitle>
          <CardDescription className="text-center text-lg">Transforme seu aprendizado em realidade</CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {/* Ingrediente Premium - PRIMEIRO */}
          <div className="bg-gradient-to-r from-yellow-50 via-orange-50 to-yellow-100 p-6 rounded-lg border-4 border-yellow-300 relative overflow-hidden text-center">
            <div className="absolute top-3 right-3 z-10">
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center animate-pulse shadow-lg">
                <span className="text-white text-sm">💎</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="text-2xl animate-bounce">✨</span>
                <span className="font-bold text-yellow-700 text-lg">INGREDIENTE PREMIUM EXCLUSIVO</span>
                <span className="text-2xl animate-bounce" style={{ animationDelay: "0.5s" }}>
                  💎
                </span>
              </div>

              <p className="text-sm text-yellow-600 font-semibold italic max-w-md mx-auto">
                O diferencial que faz o cliente voltar no outro dia e comprar mais
              </p>

              <div className="flex items-center justify-center gap-3 mt-4">
                <span className="text-xs bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full font-bold">
                  🔥 SEGREDO DOS PROFISSIONAIS
                </span>
                <span className="text-xs bg-orange-200 text-orange-800 px-3 py-1 rounded-full font-bold">
                  💰 FIDELIZA CLIENTES
                </span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-yellow-200">
              <p className="text-xs text-yellow-700 font-semibold">
                🏆 Este ingrediente especial é o que diferencia o produto e garante que o cliente sempre volte
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-center p-4 bg-white rounded-lg border border-green-200">
              <div className="text-3xl mb-2">📙</div>
              <h4 className="font-semibold">Receita Avançada</h4>
              <p className="text-sm text-gray-600">+ fotos passo a passo</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border border-green-200">
              <div className="text-3xl mb-2">📊</div>
              <h4 className="font-semibold">Planilha Automática</h4>
              <p className="text-sm text-gray-600">Calcule custo e margem</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border border-green-200">
              <div className="text-3xl mb-2">📈</div>
              <h4 className="font-semibold">Plano de Crescimento</h4>
              <p className="text-sm text-gray-600">R$ 3.500 → R$ 10.000/mês</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border border-green-200">
              <div className="text-3xl mb-2">🔥</div>
              <h4 className="font-semibold">Modo de Preparado Exclusivo</h4>
              <p className="text-sm text-gray-600">
                Como preparar usando as melhores táticas baseadas na maior doceria do Brasil
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-100 to-white p-6 rounded-lg">
            <h3 className="text-xl font-bold text-center mb-4">
              Você já produziu, já vendeu e já lucrou — tudo em uma simulação.
            </h3>
            <p className="text-center text-lg">Agora é hora de transformar esse aprendizado em realidade.</p>
          </div>

          {/* Seção de preço com desconto fixo de 50% */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-4">
              <span className="text-2xl line-through text-gray-400">R$ 55,00</span>
              <span className="text-4xl font-bold text-green-600">R$ 27,50</span>
              <Badge className="bg-red-500">50% OFF POR MÉRITO</Badge>
            </div>

            <div className="bg-gradient-to-r from-green-100 to-green-50 p-4 rounded-lg border-2 border-green-300">
              <p className="text-sm text-green-600 font-bold mb-2">🏆 DESCONTO DE 50% CONQUISTADO PELO SEU MÉRITO!</p>
              <p className="text-xs text-gray-700">
                Seu saldo acumulado de{" "}
                <span className="font-bold text-green-600">R$ {gameState.balance.toFixed(2)}</span> prova que você
                entende do negócio e merece este desconto especial!
              </p>
            </div>

            {/* Simulação de vendas para pagar o plano */}
            <div className="bg-gradient-to-r from-red-50 to-white p-4 rounded-lg border-2 border-red-200">
              <h4 className="font-bold text-red-700 mb-3">⚡ VEJA COMO É FÁCIL PAGAR O PLANO:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded-lg border border-red-200">
                  <div className="text-2xl mb-2">🍓</div>
                  <p className="font-bold text-red-600">Vendendo a R$ 10,00</p>
                  <p className="text-sm text-gray-600">
                    Apenas <span className="font-bold text-red-700">3 morangos</span>
                  </p>
                  <p className="text-xs text-gray-500">Tempo médio: 2-3 horas*</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-red-200">
                  <div className="text-2xl mb-2">🍓</div>
                  <p className="font-bold text-red-600">Vendendo a R$ 14,00</p>
                  <p className="text-sm text-gray-600">
                    Apenas <span className="font-bold text-red-700">2 morangos</span>
                  </p>
                  <p className="text-xs text-gray-500">Tempo médio: 1-2 horas*</p>
                </div>
              </div>
              <div className="mt-3 text-center">
                <p className="text-xs text-gray-600 italic">
                  *Baseado na demanda atual -{" "}
                  <span className="font-bold text-red-600">
                    confeiteiros não estão conseguindo atender todos os clientes!
                  </span>
                </p>
              </div>

              <Button
                className="hover:bg-[#ff8d00] text-white font-bold text-base sm:text-lg lg:text-xl py-3 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl px-1 w-full sm:py-3 h-auto animate-pulse bg-[#ff8d00]"
                style={{ animationDuration: "2s" }}
              >
                <Zap className="w-6 h-6 mr-2 animate-bounce" />
                Quero faturar com Morangos do Amor por R$ 27,50
              </Button>
            </div>
            <p className="text-sm text-gray-600">✅ Acesso imediato • ✅ Garantia de 7 dias • ✅ Suporte incluso</p>
          </div>
        </CardContent>
      </Card>

      {/* Desconto por Mérito - SEGUNDO */}
      <Card className="max-w-3xl mx-auto px-4 border-2 border-green-500 bg-gradient-to-r from-green-50 to-white mb-6">
        <CardContent className="p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="text-3xl animate-bounce">🏆</div>
            <h3 className="text-xl font-bold text-green-600">DESCONTO POR MÉRITO</h3>
          </div>
          <p className="text-gray-700 mb-3">
            <strong>Você provou que entende de negócios!</strong> Seu saldo acumulado de{" "}
            <span className="text-green-600 font-bold">R$ {gameState.balance.toFixed(2)}</span> demonstra sua capacidade
            empreendedora.
          </p>
          <p className="text-gray-700 mb-3">
            Por ter demonstrado 100% de assertividade e compreender o potencial deste negócio super lucrativo no momento
            PERFEITO da tendência no Brasil...
          </p>
          <div className="bg-gradient-to-r from-green-200 to-green-100 p-4 rounded-lg border-2 border-green-300">
            <p className="text-lg sm:text-xl lg:text-2xl font-bold text-green-700">
              💰 VOCÊ CONQUISTOU 50% DE DESCONTO POR MÉRITO!
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Provas Sociais - POR ÚLTIMO */}
      <Card className="max-w-5xl mx-auto px-4">
        <CardHeader className="bg-white">
          <CardTitle className="text-lg sm:text-xl lg:text-2xl text-center">
            🗣️ O que estão falando sobre o Plano
          </CardTitle>
          <CardDescription className="text-center text-lg">
            Depoimentos reais de quem já está lucrando com a tendência
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {/* Depoimento 1 */}
          <div className="bg-gradient-to-r from-red-50 to-white p-6 rounded-lg border border-red-200">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="/images/mariana-perfil.png" />
                    <AvatarFallback>MC</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">Mariana Costa</h4>
                    <p className="text-sm text-gray-600">Confeiteira - São Paulo/SP</p>
                  </div>
                </div>
                <p className="text-gray-700 italic mb-3">
                  "Na minha cidade só falam disso! As pessoas que começaram a fazer não estão conseguindo atender a
                  demanda. Conheci esse plano diferenciado e já comecei a me destacar. Em 15 dias já faturei R$ 3.200! A
                  tendência está no auge, quem não pegar agora vai perder o bonde."
                </p>
                <div className="flex text-red-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>
              <div className="w-24 h-18 sm:w-32 sm:h-24 rounded-lg overflow-hidden">
                <img src="/images/depoimento1.jpg" alt="Morangos da Mariana" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Depoimento 2 */}
          <div className="bg-gradient-to-r from-green-50 to-white p-6 rounded-lg border border-green-200">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="/images/roberto-perfil.png" />
                    <AvatarFallback>RS</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">Roberto Silva</h4>
                    <p className="text-sm text-gray-600">Empreendedor - Rio de Janeiro/RJ</p>
                  </div>
                </div>
                <p className="text-gray-700 italic mb-3">
                  "Cara, isso aqui é uma MINA DE OURO! Todo mundo quer, as filas são enormes. Comecei há 3 semanas e já
                  estou vendendo 80 unidades por dia. O segredo do plano fez TODA diferença. Mas corre, porque essa onda
                  não vai durar para sempre!"
                </p>
                <div className="flex text-red-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>
              <div className="w-24 h-18 sm:w-32 sm:h-24 rounded-lg overflow-hidden">
                <img src="/images/depoimento2.jpg" alt="Morangos do Roberto" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Depoimento 3 */}
          <div className="bg-gradient-to-r from-white to-gray-50 p-6 rounded-lg border border-gray-200">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="/images/ana-perfil.png" />
                    <AvatarFallback>AF</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">Ana Ferreira</h4>
                    <p className="text-sm text-gray-600">Dona de Casa - Belo Horizonte/MG</p>
                  </div>
                </div>
                <p className="text-gray-700 italic mb-3">
                  "Gente, eu estava desempregada e desesperada. Vi essa tendência explodindo e pensei: 'é agora ou
                  nunca'. Com o plano consegui me organizar e em 1 mês já estava ganhando mais que meu antigo emprego!
                  Mas vejam, já tem muita gente entrando no mercado..."
                </p>
                <div className="flex text-red-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>
              <div className="w-24 h-18 sm:w-32 sm:h-24 rounded-lg overflow-hidden">
                <img src="/images/depoimento3.jpg" alt="Morangos da Ana" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Depoimento 4 */}
          <div className="bg-gradient-to-r from-red-50 to-white p-6 rounded-lg border border-red-200">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="/images/carlos-perfil.png" />
                    <AvatarFallback>CS</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">Carlos Santos</h4>
                    <p className="text-sm text-gray-600">Vendedor - Fortaleza/CE</p>
                  </div>
                </div>
                <p className="text-gray-700 italic mb-3">
                  "Mano, isso aqui virou febre total! Não consigo produzir o suficiente, o pessoal fica brigando para
                  comprar. O diferencial do plano me colocou na frente da concorrência. Mas ó, cada dia que passa
                  aparece mais gente fazendo. Quem não correr agora..."
                </p>
                <div className="flex text-red-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>
              <div className="w-24 h-18 sm:w-32 sm:h-24 rounded-lg overflow-hidden">
                <img src="/images/depoimento4.jpg" alt="Morangos do Carlos" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Depoimento 5 */}
          <div className="bg-gradient-to-r from-green-50 to-white p-6 rounded-lg border border-green-200">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="/images/juliana-perfil.png" />
                    <AvatarFallback>JO</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">Juliana Oliveira</h4>
                    <p className="text-sm text-gray-600">Estudante - Porto Alegre/RS</p>
                  </div>
                </div>
                <p className="text-gray-700 italic mb-3">
                  "Pessoal, isso é SURREAL! Comecei para pagar a faculdade e agora estou ganhando R$ 4.500/mês! Todo
                  mundo na universidade quer comprar. O plano tem estratégias que ninguém mais sabe. Mas cuidado, a
                  concorrência está crescendo muito rápido!"
                </p>
                <div className="flex text-red-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>
              <div className="w-24 h-18 sm:w-32 sm:h-24 rounded-lg overflow-hidden">
                <img
                  src="/images/depoimento5.jpg"
                  alt="Morangos da Juliana"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Footer />
    </div>
  )
}
