"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ShoppingCart, Trophy, Clock, Star, Zap, Gift } from "lucide-react"

const FloatingStrawberries = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Morangos - distribuição mais espaçada */}
      {[...Array(6)].map((_, i) => (
        <div
          key={`strawberry-${i}`}
          className="absolute text-xl animate-bounce opacity-20"
          style={{
            left: `${15 + i * 15}%`,
            top: `${10 + i * 12}%`,
            animationDelay: `${i * 2}s`,
            animationDuration: `${4 + Math.random() * 2}s`,
          }}
        >
          🍓
        </div>
      ))}

      {/* Mais morangos na parte inferior */}
      {[...Array(4)].map((_, i) => (
        <div
          key={`strawberry-bottom-${i}`}
          className="absolute text-lg animate-bounce opacity-15"
          style={{
            left: `${20 + i * 20}%`,
            top: `${70 + i * 5}%`,
            animationDelay: `${(i + 3) * 1.5}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
          }}
        >
          🍓
        </div>
      ))}

      {/* Corações - distribuição diagonal */}
      {[...Array(5)].map((_, i) => (
        <div
          key={`heart-${i}`}
          className="absolute text-lg animate-pulse opacity-25"
          style={{
            left: `${60 + i * 8}%`,
            top: `${15 + i * 15}%`,
            animationDelay: `${i * 1.8}s`,
            animationDuration: `${2.5 + Math.random() * 1.5}s`,
          }}
        >
          💕
        </div>
      ))}

      {/* Corações menores espalhados */}
      {[...Array(3)].map((_, i) => (
        <div
          key={`heart-small-${i}`}
          className="absolute text-sm animate-pulse opacity-20"
          style={{
            left: `${10 + i * 25}%`,
            top: `${50 + i * 10}%`,
            animationDelay: `${(i + 2) * 2.2}s`,
            animationDuration: `${3 + Math.random() * 1}s`,
          }}
        >
          💕
        </div>
      ))}
    </div>
  )
}

interface GameState {
  phase: number
  avatar: string
  balance: number
  ingredients: { name: string; quantity: string; price: number; points: number }[]
  totalCost: number
  totalPoints: number
  productionComplete: boolean
  salePrice: number
  revenue: number
  profit: number
  productionCount: number
  // Adicionar campos acumulados
  totalInvestmentAccumulated: number
  totalRevenueAccumulated: number
  totalProfitAccumulated: number
}

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
    // Inicializar campos acumulados
    totalInvestmentAccumulated: 0,
    totalRevenueAccumulated: 0,
    totalProfitAccumulated: 0,
  })

  const [timeLeft, setTimeLeft] = useState(480) // 8 minutos em segundos
  const [isProducing, setIsProducing] = useState(false)
  const [progressPercentage, setProgressPercentage] = useState(0)
  // Adicionar o estado para notificações após os outros estados
  const [notifications, setNotifications] = useState<
    Array<{ id: number; name: string; city: string; visible: boolean }>
  >([])
  const [usedNames, setUsedNames] = useState<string[]>([])
  const [onlineCount, setOnlineCount] = useState(0)
  const [userScore, setUserScore] = useState(0)
  const [userRanking, setUserRanking] = useState(0)
  const [ingredientChoices, setIngredientChoices] = useState<{[key: number]: number}>({})

  // Ranking existente de pessoas que passaram pelo funil
  const existingRanking = [
    { name: "Mariana Costa", score: 126, avatar: "/images/mariana-perfil.png" },
    { name: "Roberto Silva", score: 124, avatar: "/images/roberto-perfil.png" },
    { name: "Ana Ferreira", score: 122, avatar: "/images/ana-perfil.png" },
    { name: "Carlos Santos", score: 120, avatar: "/images/carlos-perfil.png" },
    { name: "Juliana Oliveira", score: 118, avatar: "/images/juliana-perfil.png" },
  ]

  useEffect(() => {
    // Sempre abrir a página no topo
    window.scrollTo(0, 0)
  }, [])

  const avatars = [
    {
      id: "rosa",
      name: "Rosa da Conceição",
      description:
        "Aprendeu a fazer doces com a avó no interior da Bahia. Hoje, sonha em transformar suas receitas em fonte de renda.",
      profile: "Tradicional, experiente, cozinha com afeto",
      emoji: "👩‍🍳",
      image: "/images/rosa.png",
    },
    {
      id: "lucas",
      name: "Lucas Andrade",
      description:
        "Começou vendendo doces no intervalo da escola. Agora quer mostrar que é possível crescer sem sair da quebrada.",
      profile: "Jovem criativo e sonhador, quer empreender do zero",
      emoji: "🧑‍🍳",
      image: "/images/lucas.png",
    },
    {
      id: "lea",
      name: "Léa Monteiro",
      description:
        "Deixou a carreira no escritório para viver da confeitaria. Acredita que doces bonitos vendem mais — e podem mudar vidas.",
      profile: "Estilosa, perfeccionista e apaixonada por estética e sabor",
      emoji: "👩‍🍳",
      image: "/images/lea.png",
    },
  ]

  const ingredients = [
    { name: "Morangos", quantity: "12 unidades", price: 3.6, points: 15 },
    { name: "Leite condensado", quantity: "1 lata (395g)", price: 6.0, points: 20 },
    { name: "Leite em pó", quantity: "3 colheres (sopa)", price: 0.75, points: 10 },
    { name: "Creme de leite", quantity: "1/2 caixa (200ml)", price: 2.0, points: 12 },
    { name: "Manteiga", quantity: "1 colher (sopa)", price: 0.9, points: 8 },
    { name: "Açúcar", quantity: "2 e 1/2 xícaras", price: 2.0, points: 18 },
    { name: "Água", quantity: "1 e 1/2 xícara", price: 0.0, points: 5 },
    { name: "Vinagre", quantity: "2 colheres (sopa)", price: 0.5, points: 7 },
    { name: "Corante vermelho", quantity: "Gotinhas", price: 1.5, points: 6 },
  ]

  const secretIngredient = {
    name: "Ingrediente Secreto Premium",
    quantity: "??? especial",
    price: 0.62,
    points: 25,
    description: "O diferencial que faz toda a diferença no sabor e textura"
  }

  const priceOptions = [
    { price: 7.0, profit: 5.55, total: 66.6 },
    { price: 10.0, profit: 8.55, total: 102.6 },
    { price: 12.0, profit: 10.55, total: 126.6 },
  ]
  // Adicionar arrays de nomes e cidades após os arrays existentes
  const randomNames = [
    "Ana Silva",
    "Carlos Santos",
    "Maria Oliveira",
    "João Pereira",
    "Fernanda Costa",
    "Roberto Lima",
    "Juliana Souza",
    "Pedro Almeida",
    "Camila Rodrigues",
    "Lucas Ferreira",
    "Beatriz Martins",
    "Rafael Barbosa",
    "Larissa Gomes",
    "Thiago Ribeiro",
    "Gabriela Dias",
    "Mateus Cardoso",
    "Isabela Nascimento",
    "Diego Moreira",
    "Letícia Araújo",
    "Bruno Carvalho",
    "Amanda Rocha",
    "Gustavo Mendes",
    "Natália Freitas",
    "Vinícius Castro",
    "Priscila Ramos",
    "Eduardo Pinto",
    "Mariana Correia",
    "Felipe Teixeira",
    "Vanessa Lopes",
    "André Monteiro",
    "Carolina Vieira",
    "Rodrigo Campos",
    "Patrícia Nunes",
    "Marcelo Duarte",
    "Renata Farias",
  ]

  const randomCities = [
    "São Paulo/SP",
    "Rio de Janeiro/RJ",
    "Belo Horizonte/MG",
    "Salvador/BA",
    "Fortaleza/CE",
    "Brasília/DF",
    "Curitiba/PR",
    "Recife/PE",
    "Porto Alegre/RS",
    "Manaus/AM",
    "Belém/PA",
    "Goiânia/GO",
    "Guarulhos/SP",
    "Campinas/SP",
    "São Luís/MA",
    "São Gonçalo/RJ",
    "Maceió/AL",
    "Duque de Caxias/RJ",
    "Natal/RN",
    "Teresina/PI",
    "Campo Grande/MS",
    "Nova Iguaçu/RJ",
    "São Bernardo do Campo/SP",
    "João Pessoa/PB",
    "Jaboatão dos Guararapes/PE",
    "Santo André/SP",
    "Osasco/SP",
    "Ribeirão Preto/SP",
    "Uberlândia/MG",
    "Sorocaba/SP",
    "Contagem/MG",
    "Aracaju/SE",
    "Feira de Santana/BA",
    "Cuiabá/MT",
    "Joinville/SC",
    "Aparecida de Goiânia/GO",
    "Londrina/PR",
    "Juiz de Fora/MG",
  ]

  // Adicionar useEffect para notificações após o useEffect existente
  useEffect(() => {
    if (gameState.phase === 7) {
      const interval = setInterval(() => {
        // Filtrar nomes que ainda não foram usados
        const availableNames = randomNames.filter((name) => !usedNames.includes(name))

        // Se não há mais nomes disponíveis, parar as notificações
        if (availableNames.length === 0) {
          return
        }

        const randomName = availableNames[Math.floor(Math.random() * availableNames.length)]
        const randomCity = randomCities[Math.floor(Math.random() * randomCities.length)]
        const notificationId = Date.now()

        // Adicionar o nome à lista de usados
        setUsedNames((prev) => [...prev, randomName])

        // Adicionar notificação
        setNotifications((prev) => [
          ...prev,
          {
            id: notificationId,
            name: randomName,
            city: randomCity,
            visible: true,
          },
        ])

        // Remover notificação após 4 segundos
        setTimeout(() => {
          setNotifications((prev) => prev.filter((n) => n.id !== notificationId))
        }, 4000)
      }, 15000)

      return () => clearInterval(interval)
    }
  }, [gameState.phase, usedNames])

  useEffect(() => {
    if (gameState.phase === 7) {
      // Gerar número inicial entre 847 e 1243
      const initialCount = Math.floor(Math.random() * (1243 - 847 + 1)) + 847
      setOnlineCount(initialCount)

      // Atualizar o contador a cada 3-7 segundos com variações pequenas
      const interval = setInterval(
        () => {
          setOnlineCount((prev) => {
            const variation = Math.floor(Math.random() * 11) - 5 // -5 a +5
            const newCount = prev + variation
            // Manter entre 820 e 1280
            return Math.max(820, Math.min(1280, newCount))
          })
        },
        Math.random() * 4000 + 3000,
      ) // Entre 3-7 segundos

      return () => clearInterval(interval)
    } else {
      setOnlineCount(0)
    }
  }, [gameState.phase])

  useEffect(() => {
    // Resetar nomes usados quando não estiver na etapa 8
    if (gameState.phase !== 7) {
      setUsedNames([])
    }
  }, [gameState.phase])

  const selectAvatar = (avatarId: string) => {
    setGameState((prev) => ({ ...prev, avatar: avatarId }))
    // Remover o window.scrollTo(0, 0) e não avançar para phase 2
  }

  const startChallenge = () => {
    setGameState((prev) => ({ ...prev, phase: 2 }))
    window.scrollTo(0, 0)
  }

  const ingredientOptions = [
    { 
      name: "Morangos", 
      options: [
        { label: "8 unidades", quantity: "8 unidades", price: 2.4, points: 5 },
        { label: "12 unidades", quantity: "12 unidades", price: 3.6, points: 15 }, // Correta
        { label: "16 unidades", quantity: "16 unidades", price: 4.8, points: 8 }
      ]
    },
    { 
      name: "Leite condensado", 
      options: [
        { label: "1/2 lata", quantity: "1/2 lata (200g)", price: 3.0, points: 8 },
        { label: "1 lata", quantity: "1 lata (395g)", price: 6.0, points: 20 }, // Correta
        { label: "2 latas", quantity: "2 latas (790g)", price: 12.0, points: 5 }
      ]
    },
    { 
      name: "Leite em pó", 
      options: [
        { label: "1 colher", quantity: "1 colher (sopa)", price: 0.25, points: 3 },
        { label: "3 colheres", quantity: "3 colheres (sopa)", price: 0.75, points: 10 }, // Correta
        { label: "5 colheres", quantity: "5 colheres (sopa)", price: 1.25, points: 6 }
      ]
    },
    { 
      name: "Creme de leite", 
      options: [
        { label: "1/4 caixa", quantity: "1/4 caixa (100ml)", price: 1.0, points: 4 },
        { label: "1/2 caixa", quantity: "1/2 caixa (200ml)", price: 2.0, points: 12 }, // Correta
        { label: "1 caixa", quantity: "1 caixa (400ml)", price: 4.0, points: 7 }
      ]
    },
    { 
      name: "Manteiga", 
      options: [
        { label: "1/2 colher", quantity: "1/2 colher (sopa)", price: 0.45, points: 3 },
        { label: "1 colher", quantity: "1 colher (sopa)", price: 0.9, points: 8 }, // Correta
        { label: "2 colheres", quantity: "2 colheres (sopa)", price: 1.8, points: 5 }
      ]
    },
    { 
      name: "Açúcar", 
      options: [
        { label: "1 xícara", quantity: "1 xícara", price: 0.8, points: 6 },
        { label: "2 e 1/2 xícaras", quantity: "2 e 1/2 xícaras", price: 2.0, points: 18 }, // Correta
        { label: "4 xícaras", quantity: "4 xícaras", price: 3.2, points: 4 }
      ]
    },
    { 
      name: "Água", 
      options: [
        { label: "1/2 xícara", quantity: "1/2 xícara", price: 0.0, points: 2 },
        { label: "1 e 1/2 xícara", quantity: "1 e 1/2 xícara", price: 0.0, points: 5 }, // Correta
        { label: "3 xícaras", quantity: "3 xícaras", price: 0.0, points: 1 }
      ]
    },
    { 
      name: "Vinagre", 
      options: [
        { label: "1 colher", quantity: "1 colher (sopa)", price: 0.25, points: 3 },
        { label: "2 colheres", quantity: "2 colheres (sopa)", price: 0.5, points: 7 }, // Correta
        { label: "4 colheres", quantity: "4 colheres (sopa)", price: 1.0, points: 2 }
      ]
    },
    { 
      name: "Corante vermelho", 
      options: [
        { label: "Poucas gotas", quantity: "Poucas gotas", price: 0.75, points: 2 },
        { label: "Gotinhas", quantity: "Gotinhas", price: 1.5, points: 6 }, // Correta
        { label: "Muito", quantity: "Muito", price: 3.0, points: 1 }
      ]
    }
  ]

  const handleIngredientChoice = (ingredientIndex: number, optionIndex: number) => {
    setIngredientChoices(prev => ({
      ...prev,
      [ingredientIndex]: optionIndex
    }))
  }

  const calculateTotals = () => {
    let totalCost = 0
    let totalPoints = 0
    
    ingredientOptions.forEach((ingredient, index) => {
      const choiceIndex = ingredientChoices[index]
      if (choiceIndex !== undefined) {
        const choice = ingredient.options[choiceIndex]
        totalCost += choice.price
        totalPoints += choice.points
      }
    })
    
    // Adicionar ingrediente secreto apenas se todas as escolhas foram feitas
    if (Object.keys(ingredientChoices).length === ingredientOptions.length) {
      totalCost += secretIngredient.price
      totalPoints += secretIngredient.points
    }
    
    return { totalCost, totalPoints }
  }

  const buyIngredients = () => {
    const { totalCost, totalPoints } = calculateTotals()
    
    setUserScore(totalPoints)
    
    // Calcular posição no ranking
    const position = existingRanking.filter(person => person.score > totalPoints).length + 1
    setUserRanking(position)
    
    setGameState((prev) => ({
      ...prev,
      phase: 3,
      ingredients: ingredientOptions.map((ingredient, index) => ({
        name: ingredient.name,
        quantity: ingredient.options[ingredientChoices[index]].quantity,
        price: ingredient.options[ingredientChoices[index]].price,
        points: ingredient.options[ingredientChoices[index]].points
      })),
      totalCost,
      totalPoints,
      balance: prev.balance - totalCost,
    }))
    setIsProducing(true)
    setProgressPercentage(0)
    window.scrollTo(0, 0)

    // Simular produção com progresso de 10 em 10%
    let currentProgress = 0
    const progressInterval = setInterval(() => {
      currentProgress += 10
      setProgressPercentage(currentProgress)

      if (currentProgress >= 100) {
        clearInterval(progressInterval)
        setTimeout(() => {
          setIsProducing(false)
        }, 500)
      }
    }, 300)
  }

  const completeProduction = () => {
    setGameState((prev) => ({
      ...prev,
      phase: 4,
      productionComplete: true,
    }))
    window.scrollTo(0, 0)
  }

  const selectPrice = (option: (typeof priceOptions)[0]) => {
    const revenue = option.price * 12
    const profit = revenue - gameState.totalCost
    setGameState((prev) => ({
      ...prev,
      phase: 5,
      salePrice: option.price,
      revenue,
      profit,
      balance: prev.balance + revenue,
      productionCount: prev.productionCount + 1,
      // Acumular valores
      totalInvestmentAccumulated: prev.totalInvestmentAccumulated + prev.totalCost,
      totalRevenueAccumulated: prev.totalRevenueAccumulated + revenue,
      totalProfitAccumulated: prev.totalProfitAccumulated + profit,
    }))
    window.scrollTo(0, 0)
  }

  const showSecret = () => {
    setGameState((prev) => ({ ...prev, phase: 6 }))
    window.scrollTo(0, 0)
    }

  const showOffer = () => {
    setGameState((prev) => ({ ...prev, phase: 7 }))
    window.scrollTo(0, 0)
  }

  const restartProduction = () => {
    setGameState((prev) => ({
      ...prev,
      phase: 2,
      ingredients: [],
      totalCost: 0,
      productionComplete: false,
      salePrice: 0,
      revenue: 0,
      profit: 0,
      // NÃO resetar os valores acumulados para manter o histórico
    }))
    window.scrollTo(0, 0)
  }

  // Adicionar componente de notificação antes do componente Footer
  const SalesNotification = ({
    notification,
  }: { notification: { id: number; name: string; city: string; visible: boolean } }) => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
      // Aparecer após um pequeno delay
      const showTimer = setTimeout(() => setIsVisible(true), 100)

      // Desaparecer após 3.5 segundos
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

  const Footer = () => {
    return (
      <footer className="mt-16 py-8 bg-gradient-to-r from-gray-50 to-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-red-600">
            <div className="text-2xl">🍓</div>
            <span className="font-bold text-lg">Morango do Amor</span>
          </div>

          <div className="space-y-2 text-sm text-gray-600">
            <p>© {new Date().getFullYear()} Morango do Amor. Todos os direitos reservados.</p>
            <p className="text-xs">
              Este site não é afiliado ao Facebook ou a qualquer entidade do Facebook. Depois que você sair do Facebook,
              a responsabilidade não é deles e sim do nosso site.
            </p>
            <div className="flex items-center justify-center gap-4 text-xs">
              <span>Termos de Uso</span>
              <span>•</span>
              <span>Política de Privacidade</span>
              <span>•</span>
              <span>Contato</span>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Os resultados podem variar de pessoa para pessoa. Este produto não garante a obtenção de resultados.
              Qualquer referência ao desempenho de uma estratégia não deve ser interpretada como uma garantia de
              resultados.
            </p>
          </div>
        </div>
      </footer>
    )
  }

  const renderPhase = () => {
    switch (gameState.phase) {
      case 1:
        return (
          <div className="text-center space-y-8">
            <div className="space-y-6">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-red-600">
                🍓 A TENDÊNCIA DOCE QUE PAROU O BRASIL 🍓
              </h1>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800">
                "Você Tem o Que é Preciso Para Lucrar <span className="text-green-600 font-bold">R$ 10.000</span>{" "}
                Vendendo Morangos do Amor?"
              </h2>

              {/* Marco 1 - Desafio */}
              <div className="bg-gradient-to-r from-red-100 to-red-50 p-6 rounded-xl border-2 border-red-200 max-w-3xl mx-auto px-4">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="text-3xl">🎯</div>
                  <h3 className="text-xl font-bold text-red-700">O DESAFIO</h3>
                </div>
                <p className="text-lg font-semibold text-gray-800 mb-2">
                  <span className="text-red-600">📍 Todos eles começaram com o mesmo desafio:</span>
                </p>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-red-700 mb-3">
                  🍓 Vender 12 Morangos do Amor
                </p>
                <p className="text-lg text-gray-700">
                  <span className="font-bold text-red-600">E você?</span>{" "}
                  <span className="text-green-600 font-bold">Está pronto?</span>
                </p>
              </div>

              <Card className="max-w-2xl mx-auto px-4">
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">🧩 Escolha seu estilo de loja (Avatar)</CardTitle>
                  <CardDescription>Qual tipo de confeiteiro(a) você quer ser?</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {avatars.map((avatar) => (
                      <Card
                        key={avatar.id}
                        className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-red-300"
                      >
                        <CardContent className="p-4 text-center space-y-3" onClick={() => selectAvatar(avatar.id)}>
                          <div className="text-4xl">{avatar.emoji}</div>
                          <Avatar className="w-20 h-20 mx-auto">
                            <AvatarImage src={avatar.image || "/placeholder.svg"} alt={avatar.name} />
                            <AvatarFallback>
                              {avatar.name.split(" ")[0][0]}
                              {avatar.name.split(" ")[1][0]}
                            </AvatarFallback>
                          </Avatar>
                          <h3 className="font-semibold text-lg">{avatar.name}</h3>
                          <p className="text-sm text-gray-600 font-medium">{avatar.profile}</p>
                          <p className="text-xs text-gray-500 leading-relaxed">{avatar.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {gameState.avatar && (
                <Card className="max-w-2xl mx-auto px-4 border-2 border-red-300 shadow-xl">
                  <CardContent className="p-6 space-y-4">
                    <div className="text-center">
                      <div className="text-4xl mb-4 animate-bounce">🎮</div>
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-red-600 mb-4">
                        ACEITE O DESAFIO AGORA!
                      </h3>
                    </div>
                    <Button
                      onClick={startChallenge}
                      className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white text-base sm:text-lg lg:text-xl py-3 sm:py-4 font-bold transform hover:scale-105 transition-all duration-200 shadow-lg"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <div className="text-2xl animate-pulse">🔥</div>
                        <span>ACEITAR O DESAFIO</span>
                        <div className="text-2xl animate-pulse" style={{ animationDelay: "0.5s" }}>
                          🔥
                        </div>
                      </div>
                    </Button>
                    <div className="text-center">
                      <p className="text-sm text-gray-600 animate-pulse">
                        ⏰ <span className="font-bold">Milhares já testaram!</span> Sua vez chegou!
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Marco 2 - Como Funciona */}
              <div className="bg-gradient-to-r from-green-100 to-green-50 p-6 rounded-xl border-2 border-green-200 max-w-3xl mx-auto px-4">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="text-3xl">⚡</div>
                  <h3 className="text-xl font-bold text-green-700">SIMULAÇÃO PRÁTICA</h3>
                </div>
                <div className="space-y-3">
                  <p className="text-lg font-semibold text-green-800">
                    🎮 <span className="text-green-600">Esta é uma simulação 100% prática do que muitos estão fazendo na vida real</span>
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    <div className="bg-white p-4 rounded-lg border border-green-200">
                      <div className="text-2xl mb-2">📝</div>
                      <p className="font-bold text-red-600">Selecionar a</p>
                      <p className="text-lg font-bold text-red-700">Receita Correta</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-green-200">
                      <div className="text-2xl mb-2">👨‍🍳</div>
                      <p className="font-bold text-red-600">Dominar o</p>
                      <p className="text-lg font-bold text-red-700">Modo de Preparo</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-green-200">
                      <div className="text-2xl mb-2">💰</div>
                      <p className="font-bold text-green-600">Escolher os</p>
                      <p className="text-lg font-bold text-green-700">Valores Mais Lucrativos</p>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-green-200 to-green-100 p-4 rounded-lg border-2 border-green-300 mt-4">
                    <p className="text-center font-bold text-green-800 mb-2">
                      🔄 <span className="text-green-600">REPITA ESSE PROCESSO ATÉ DOMINAR</span>
                    </p>
                    <p className="text-center text-sm text-green-700">
                      💸 Exatamente o que confeiteiros estão fazendo na prática e <span className="font-bold text-green-800">IMPRIMINDO DINHEIRO</span> com a venda do morango!
                    </p>
                  </div>
                </div>
              </div>

              {/* Marco 3 - Objetivo */}
              <div className="bg-gradient-to-r from-white to-gray-50 p-6 rounded-xl border-2 border-gray-200 max-w-3xl mx-auto px-4">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="text-3xl">🏆</div>
                  <h3 className="text-xl font-bold text-gray-700">SEU OBJETIVO</h3>
                </div>
                <p className="text-lg font-semibold text-gray-800 mb-2">
                  🎯 <span className="text-green-600">Prove que você tem o que é preciso</span>
                </p>
                <p className="text-lg text-gray-700">
                  💡 <span className="font-bold text-red-600">Desbloqueie os segredos</span> dos confeiteiros que
                  faturam <span className="font-bold text-green-600">R$ 10.000/mês</span>
                </p>
              </div>
            </div>

            <Footer />
          </div>
        )

      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-lg sm:text-xl lg:text-3xl font-bold text-red-600">
                🛒 MONTE SUA RECEITA PERFEITA 🍓
              </h1>
              <p className="text-gray-600 mt-2">Complete a receita para 12 Morangos do Amor e ganhe pontos</p>
            </div>

            <Card className="max-w-2xl mx-auto px-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Receita Completa - 12 unidades
                </CardTitle>
                <CardDescription>Cada ingrediente correto adiciona pontos à sua receita</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                
                <div className="space-y-3">
                  {ingredientOptions.map((ingredient, index) => {
                    const selectedOption = ingredientChoices[index]
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
                            <p className="text-xs text-yellow-600 font-bold">
                              +??? pts
                            </p>
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

                {/* Ingrediente secreto permanece igual */}
                <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-red-100 p-4 rounded-lg border-4 border-gradient-to-r border-purple-300 relative overflow-hidden">
                  <div className="absolute top-2 right-2">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse">
                      <span className="text-white text-lg">🔒</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl animate-bounce">✨</span>
                        <span className="font-bold text-purple-700 text-lg">INGREDIENTE SECRETO PREMIUM</span>
                        <span className="text-2xl animate-bounce" style={{animationDelay: '0.5s'}}>💎</span>
                      </div>
                      <p className="text-sm text-purple-600 font-semibold italic">
                        {secretIngredient.description}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-xs bg-purple-200 text-purple-800 px-2 py-1 rounded-full font-bold">
                          🔒 EXCLUSIVO DO PLANO COMPLETO
                        </span>
                        <span className="text-xs bg-pink-200 text-pink-800 px-2 py-1 rounded-full font-bold">
                          +??? PONTOS BÔNUS
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white mb-1">
                        R$ ???
                      </Badge>
                      <p className="text-xs text-purple-600 font-bold animate-pulse">+??? pts</p>
                    </div>
                  </div>

                  <div className="mt-3 text-center">
                    <p className="text-xs text-purple-700 font-semibold">
                      🏆 Este ingrediente especial é o segredo dos confeiteiros que faturam R$ 10.000/mês
                    </p>
                  </div>
                </div>

                <div className="border-t pt-4">
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
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-red-50 rounded-lg">
                      <p className="text-sm text-gray-600">Custo Total</p>
                      <p className="text-lg font-bold text-red-600">
                        R$ {Object.keys(ingredientChoices).length === ingredientOptions.length 
                          ? (calculateTotals().totalCost).toFixed(2) 
                          : "???"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {Object.keys(ingredientChoices).length === ingredientOptions.length 
                          ? "Baseado nas suas escolhas" 
                          : "Faça suas escolhas"}
                      </p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-gray-600">Pontuação Total</p>
                      <p className="text-lg font-bold text-green-600">
                        ??? pontos
                      </p>
                      <p className="text-xs text-gray-500">
                        Será revelada ao finalizar
                      </p>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={buyIngredients} 
                    disabled={Object.keys(ingredientChoices).length !== ingredientOptions.length}
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    🎯 {Object.keys(ingredientChoices).length === ingredientOptions.length 
                      ? "Finalizar Escolhas e Ver Minha Posição no Ranking"
                      : `Escolha os ingredientes (${Object.keys(ingredientChoices).length}/${ingredientOptions.length})`}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Ranking Preview */}
            <Card className="max-w-2xl mx-auto px-4 bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300">
              <CardHeader>
                <CardTitle className="text-center text-xl text-orange-700 flex items-center justify-center gap-2">
                  <Trophy className="w-6 h-6" />
                  🏆 RANKING DOS CONFEITEIROS VENCEDORES
                </CardTitle>
                <CardDescription className="text-center">
                  Veja onde você ficará no ranking após montar sua receita
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {existingRanking.slice(0, 3).map((person, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg border-l-4 border-yellow-400">
                    <div className="text-2xl">
                      {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
                    </div>
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={person.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{person.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{person.name}</p>
                      <p className="text-sm text-gray-600">Confeiteiro(a) Vencedor(a)</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-orange-600">{person.score} pts</p>
                      <p className="text-xs text-gray-500">#{index + 1}</p>
                    </div>
                  </div>
                ))}
                
                <div className="text-center py-2">
                  <p className="text-sm text-gray-500">... e mais {existingRanking.length - 3} confeiteiros</p>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-100 to-blue-50 rounded-lg border-l-4 border-blue-400 animate-pulse">
                  <div className="text-2xl">🎯</div>
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={avatars.find((a) => a.id === gameState.avatar)?.image || "/placeholder.svg"} />
                    <AvatarFallback>EU</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold text-blue-800">Sua Posição</p>
                    <p className="text-sm text-blue-600">Após montar a receita</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-blue-600">??? pts</p>
                    <p className="text-xs text-gray-500">#?</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Footer />
          </div>
        )

      case 3:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-lg sm:text-xl lg:text-3xl font-bold text-red-600">
                🍭 HORA DE COLOCAR A MÃO NA CALDA 🍓
              </h1>
              <p className="text-gray-600 mt-2">
                {isProducing
                  ? "Produção simulada em andamento..."
                  : "Produção simulada concluída! Agora é hora de provar que faz as melhores escolhas para a venda correta."}
              </p>
            </div>

            <Card className="max-w-2xl mx-auto px-4">
              <CardContent className="p-6 space-y-6">
                <div className="text-center">
                  <div className="w-full max-w-80 h-48 sm:h-60 mx-auto rounded-lg overflow-hidden shadow-lg">
                    <img
                      src="/images/morangos-producao.jpg"
                      alt="12 Morangos do Amor sendo produzidos"
                      className="w-full h-full object-cover animate-pulse hover:scale-105 transition-transform duration-300"
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
                    <div className="w-full bg-gray-200 rounded-full h-8 overflow-hidden relative">
                      <div
                        className="h-full bg-gradient-to-r from-red-500 via-red-400 to-green-500 transition-all duration-500 ease-out rounded-full"
                        style={{ width: "100%" }}
                      ></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-bold text-white drop-shadow-lg">100% Concluído</span>
                      </div>
                    </div>
                    <div className="text-center space-y-4">
                      <p className="text-green-600 font-semibold">Produção concluída com sucesso!</p>
                      <Button
                        onClick={completeProduction}
                        className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:via-yellow-600 hover:to-yellow-700 text-black font-bold text-base sm:text-lg lg:text-xl py-3 sm:py-4 px-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 border-2 border-yellow-300"
                      >
                        <div className="flex items-center justify-center gap-2">
                          <div className="text-2xl animate-bounce">💰</div>
                          <span>Simular a comercialização dos 12 morangos</span>
                          <div className="text-2xl animate-bounce" style={{ animationDelay: "0.3s" }}>
                            🏪
                          </div>
                        </div>
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
            <Footer />
          </div>
        )

      case 4:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-lg sm:text-xl lg:text-3xl font-bold text-green-600">
                💵 DEFINA SEU PREÇO POR UNIDADE 🍓
              </h1>
              <p className="text-gray-600 mt-2">Escolha sua estratégia de preço</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto px-4">
              {priceOptions.map((option, index) => (
                <Card
                  key={index}
                  className="cursor-pointer hover:shadow-lg transition-all border-2 hover:border-green-300"
                  onClick={() => selectPrice(option)}
                >
                  <CardHeader className="text-center">
                    <CardTitle className="text-lg sm:text-xl lg:text-2xl text-green-600">
                      R$ {option.price.toFixed(2)}
                    </CardTitle>
                    <CardDescription>por unidade</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center space-y-2">
                    <p className="text-sm">Lucro: R$ {option.profit.toFixed(2)}/unid.</p>
                    <p className="font-bold text-lg">Total: R$ {option.total.toFixed(2)}</p>
                    <Badge variant={index === 1 ? "default" : "secondary"}>
                      {index === 0 ? "Conservador" : index === 1 ? "Recomendado" : "Ousado"}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card className="max-w-4xl mx-auto px-4 mt-8 bg-gradient-to-br from-green-50 to-white">
              <CardHeader>
                <CardTitle className="text-center text-xl text-green-700">
                  📊 Projeções Reais de Vendas no Brasil
                </CardTitle>
                <CardDescription className="text-center">
                  Veja o que confeiteiros estão faturando sem esforço pelo país
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg border-l-4 border-red-400">
                    <h4 className="font-semibold text-red-700 mb-2">🏠 Vendas Caseiras</h4>
                    <p className="text-sm text-gray-600 mb-3">10-15 unidades/dia</p>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Por dia:</span>
                        <span className="font-semibold text-green-600">R$ 100-150</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Por semana:</span>
                        <span className="font-semibold text-green-600">R$ 700-1.050</span>
                      </div>
                      <div className="flex justify-between border-t pt-1">
                        <span>Por mês:</span>
                        <span className="font-bold text-green-700">R$ 3.000-4.500</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border-l-4 border-green-400">
                    <h4 className="font-semibold text-green-700 mb-2">🎪 Feiras e Eventos</h4>
                    <p className="text-sm text-gray-600 mb-3">30-50 unidades/dia</p>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Por dia:</span>
                        <span className="font-semibold text-green-600">R$ 300-500</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Por semana:</span>
                        <span className="font-semibold text-green-600">R$ 2.100-3.500</span>
                      </div>
                      <div className="flex justify-between border-t pt-1">
                        <span>Por mês:</span>
                        <span className="font-bold text-green-700">R$ 9.000-15.000</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border-l-4 border-red-400">
                    <h4 className="font-semibold text-red-700 mb-2">🚀 Negócio Estruturado</h4>
                    <p className="text-sm text-gray-600 mb-3">80-120 unidades/dia</p>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Por dia:</span>
                        <span className="font-semibold text-green-600">R$ 800-1.200</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Por semana:</span>
                        <span className="font-semibold text-green-600">R$ 5.600-8.400</span>
                      </div>
                      <div className="flex justify-between border-t pt-1">
                        <span>Por mês:</span>
                        <span className="font-bold text-green-700">R$ 24.000-36.000</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-red-100 to-red-50 p-4 rounded-lg text-center">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    💡 <strong>Dados reais:</strong> Baseado em pesquisa com 500+ confeiteiros brasileiros
                  </p>
                  <p className="text-xs text-gray-600">
                    *Valores calculados com preço médio de R$ 10,00 por unidade. Resultados podem variar conforme região
                    e estratégia.
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-700 mb-2">🎯 Qual nível você quer alcançar?</p>
                  <p className="text-sm text-gray-600">
                    Escolha seu preço acima e vamos calcular seu potencial de lucro!
                  </p>
                </div>
              </CardContent>
            </Card>
            <Footer />
          </div>
        )

      case 5:
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
              {/* Adicionar indicador de venda */}
              <div className="mt-2">
                <Badge variant="outline" className="text-sm">
                  Venda {gameState.productionCount} de {gameState.productionCount < 2 ? "2" : gameState.productionCount}
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
                    🎉 <strong>Parabéns! Você provou que possui a habilidade inicial necessária</strong> para mergulhar
                    neste empreendimento lucrativo. Este foi apenas o primeiro passo da sua jornada empreendedora.
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
                    🚀 É exatamente isso que os confeiteiros de elite fazem. Eles têm um plano estruturado. Um plano que
                    você pode desbloquear agora e evoluir do básico para o profissional.
                  </p>
                </div>

                <div className="space-y-3">
                  {gameState.productionCount < 2 && (
                    <Button
                      onClick={restartProduction}
                      className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-bold text-base sm:text-lg lg:text-xl py-3 sm:py-4 px-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 border-2 border-purple-300"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <div className="text-2xl animate-bounce">🔄</div>
                        <span>Fazer nova produção e testar outras estratégias</span>
                        <div className="text-2xl animate-bounce" style={{ animationDelay: "0.3s" }}>
                          📈
                        </div>
                      </div>
                    </Button>
                  )}

                  <Button
                    onClick={showSecret}
                    className="w-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:via-yellow-600 hover:to-yellow-700 text-black font-bold text-base sm:text-lg lg:text-xl py-3 sm:py-4 px-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 border-2 border-yellow-300"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <div className="text-2xl animate-bounce">🎯</div>
                      <span>Quero saber o que eles fazem de diferente</span>
                      <div className="text-2xl animate-bounce" style={{ animationDelay: "0.3s" }}>
                        🔓
                      </div>
                    </div>
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

      case 6:
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
                      Esse material foi compilado em um guia passo a passo para transformar sua produção caseira em um
                      negócio real, lucrativo e sustentável.
                    </p>
                  </div>
                </div>

                <Button
                  onClick={showOffer}
                  className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-base sm:text-lg lg:text-xl py-3 sm:py-4 hover:from-yellow-500 hover:to-orange-600"
                >
                  <Gift className="w-5 h-5 mr-2" />
                  Desbloquear agora o plano completo
                </Button>
              </CardContent>
            </Card>
            <Footer />
          </div>
        )

      case 7:
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
                    {onlineCount.toLocaleString()} PESSOAS VISUALIZANDO ESTA OFERTA AGORA 🍓
                  </span>
                  <div className="text-sm animate-bounce">👥</div>
                </div>
              </div>
            </div>

            {/* Componente Flutuante de Escassez */}
            <div className="fixed top-1/2 right-2 sm:right-4 transform -translate-y-1/2 z-50 max-w-xs">
              <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-2 sm:p-4 rounded-xl shadow-2xl border-2 border-red-300 animate-pulse">
                <div className="text-center space-y-1 sm:space-y-2">
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
                <CardTitle className="text-lg sm:text-xl lg:text-2xl text-center">
                  Plano Completo Morango do Amor
                </CardTitle>
                <CardDescription className="text-center text-lg">
                  Transforme seu aprendizado em realidade
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                    <span className="text-2xl line-through text-gray-400">R$ 95,00</span>
                    <span className="text-4xl font-bold text-green-600">R$ 47,50</span>
                    <Badge className="bg-red-500">50% OFF POR MÉRITO</Badge>
                  </div>

                  <div className="bg-gradient-to-r from-green-100 to-green-50 p-4 rounded-lg border-2 border-green-300">
                    <p className="text-sm text-green-600 font-bold mb-2">
                      🏆 DESCONTO DE 50% CONQUISTADO PELO SEU MÉRITO!
                    </p>
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
                          Apenas <span className="font-bold text-red-700">5 morangos</span>
                        </p>
                        <p className="text-xs text-gray-500">Tempo médio: 2-3 horas*</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-red-200">
                        <div className="text-2xl mb-2">🍓</div>
                        <p className="font-bold text-red-600">Vendendo a R$ 12,00</p>
                        <p className="text-sm text-gray-600">
                          Apenas <span className="font-bold text-red-700">4 morangos</span>
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

                    <Button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold text-base sm:text-lg lg:text-xl py-3 sm:py-4 animate-pulse transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                      <Zap className="w-6 h-6 mr-2 animate-bounce" />
                      Quero faturar com Morangos do Amor por R$ 47,50
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600">
                    ✅ Acesso imediato • ✅ Garantia de 7 dias • ✅ Suporte incluso
                  </p>
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
                  <span className="text-green-600 font-bold">R$ {gameState.balance.toFixed(2)}</span> demonstra sua
                  capacidade empreendedora.
                </p>
                <p className="text-gray-700 mb-3">
                  Por ter demonstrado 100% de assertividade e compreender o potencial deste negócio super lucrativo no
                  momento PERFEITO da tendência no Brasil...
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
                        "Na minha cidade só falam disso! As pessoas que começaram a fazer não estão conseguindo atender
                        a demanda. Conheci esse plano diferenciado e já comecei a me destacar. Em 15 dias já faturei R$
                        3.200! A tendência está no auge, quem não pegar agora vai perder o bonde."
                      </p>
                      <div className="flex text-red-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                    </div>
                    <div className="w-24 h-18 sm:w-32 sm:h-24 rounded-lg overflow-hidden">
                      <img
                        src="/images/depoimento1.jpg"
                        alt="Morangos da Mariana"
                        className="w-full h-full object-cover"
                      />
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
                        "Cara, isso aqui é uma MINA DE OURO! Todo mundo quer, as filas são enormes. Comecei há 3 semanas
                        e já estou vendendo 80 unidades por dia. O segredo do plano fez TODA diferença. Mas corre,
                        porque essa onda não vai durar para sempre!"
                      </p>
                      <div className="flex text-red-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                    </div>
                    <div className="w-24 h-18 sm:w-32 sm:h-24 rounded-lg overflow-hidden">
                      <img
                        src="/images/depoimento2.jpg"
                        alt="Morangos do Roberto"
                        className="w-full h-full object-cover"
                      />
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
                        nunca'. Com o plano consegui me organizar e em 1 mês já estava ganhando mais que meu antigo
                        emprego! Mas vejam, já tem muita gente entrando no mercado..."
                      </p>
                      <div className="flex text-red-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                    </div>
                    <div className="w-24 h-18 sm:w-32 sm:h-24 rounded-lg overflow-hidden">
                      <img src="/images/ana-perfil.png" alt="Morangos da Ana" className="w-full h-full object-cover" />
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
                        "Mano, isso aqui virou febre total! Não consigo produzir o suficiente, o pessoal fica brigando
                        para comprar. O diferencial do plano me colocou na frente da concorrência. Mas ó, cada dia que
                        passa aparece mais gente fazendo. Quem não correr agora..."
                      </p>
                      <div className="flex text-red-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                    </div>
                    <div className="w-24 h-18 sm:w-32 sm:h-24 rounded-lg overflow-hidden">
                      <img
                        src="/images/carlos-perfil.png"
                        alt="Morangos do Carlos"
                        className="w-full h-full object-cover"
                      />
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
                        "Pessoal, isso é SURREAL! Comecei para pagar a faculdade e agora estou ganhando R$ 4.500/mês!
                        Todo mundo na universidade quer comprar. O plano tem estratégias que ninguém mais sabe. Mas
                        cuidado, a concorrência está crescendo muito rápido!"
                      </p>
                      <div className="flex text-red-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                    </div>
                    <div className="w-24 h-18 sm:w-32 sm:h-24 rounded-lg overflow-hidden">
                      <img
                        src="/images/juliana-perfil.png"
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

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-red-50 relative">
      <FloatingStrawberries />

      {/* Progress Bar - Fixed at top */}
      <div className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50 p-2 sm:p-3">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center mb-2 sm:mb-3">
            <span className="text-xs sm:text-sm font-medium">Progresso</span>
            <span className="text-xs sm:text-sm text-gray-600">Etapa {gameState.phase} de 7</span>
          </div>

          {/* Visual bullets for steps */}
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3, 4, 5, 6, 7].map((step) => (
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
                <span className="text-xs mt-1 text-gray-600 hidden sm:block">
                  {step === 1 && "Avatar"}
                  {step === 2 && "Compras"}
                  {step === 3 && "Produção"}
                  {step === 4 && "Preços"}
                  {step === 5 && "Vendas"}
                  {step === 6 && "Segredo"}
                  {step === 7 && "Oferta"}
                </span>
              </div>
            ))}
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-red-500 via-red-400 to-green-500 transition-all duration-500 ease-out rounded-full"
              style={{ width: `${(gameState.phase / 7) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Main content with top padding to account for fixed header */}
      <div className="max-w-6xl mx-auto px-4 relative z-10 pt-32 sm:pt-40">
        {/* Game State Info */}
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
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {renderPhase()}
      </div>
      {/* Notificações de Vendas */}
      {notifications.map((notification) => (
        <SalesNotification key={notification.id} notification={notification} />
      ))}
    </div>
  )\
}
