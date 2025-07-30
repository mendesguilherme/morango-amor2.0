export const avatars = [
  {
    id: "rosa",
    name: "Rosa da Conceição",
    description:
      "Aprendeu a fazer doces com a avó no interior da Bahia. Hoje, sonha em transformar suas receitas em fonte de renda.",
    profile: "Tradicional e experiente",
    emoji: "👩‍🍳",
    image: "/images/rosa.png",
  },
  {
    id: "lucas",
    name: "Lucas Andrade",
    description:
      "Começou vendendo doces no intervalo da escola. Agora quer mostrar que é possível crescer sem sair da quebrada.",
    profile: "Jovem empreendedor",
    emoji: "🧑‍🍳",
    image: "/images/lucas.png",
  },
  {
    id: "lea",
    name: "Léa Monteiro",
    description:
      "Deixou a carreira no escritório para viver da confeitaria. Acredita que doces bonitos vendem mais — e podem mudar vidas.",
    profile: "Estilosa e perfeccionista",
    emoji: "👩‍🍳",
    image: "/images/lea.png",
  },
  {
    id: "antonio",
    name: "Antônio Ribeiro",
    description:
      "Depois de anos no mercado formal, decidiu empreender na confeitaria para complementar a aposentadoria. Tem experiência de vida e quer construir um legado doce para a família.",
    profile: "Experiente e determinado",
    emoji: "👨‍🍳",
    image: "/images/antonio.png",
  },
]

export const existingRanking = [
  { name: "Mariana Costa", score: 126, avatar: "/images/mariana-perfil.png" },
  { name: "Roberto Silva", score: 124, avatar: "/images/roberto-perfil.png" },
  { name: "Ana Ferreira", score: 122, avatar: "/images/ana-perfil.png" },
  { name: "Carlos Santos", score: 120, avatar: "/images/carlos-perfil.png" },
  { name: "Juliana Oliveira", score: 118, avatar: "/images/juliana-perfil.png" },
]

export const ingredientOptions = [
  {
    name: "Morangos",
    options: [
      { label: "8 unidades", quantity: "8 unidades", price: 2.4, points: 5 },
      { label: "12 unidades", quantity: "12 unidades", price: 3.6, points: 15 },
      { label: "16 unidades", quantity: "16 unidades", price: 4.8, points: 8 },
    ],
  },
  {
    name: "Leite condensado",
    options: [
      { label: "1/2 lata", quantity: "1/2 lata (200g)", price: 3.0, points: 8 },
      { label: "1 lata", quantity: "1 lata (395g)", price: 6.0, points: 20 },
      { label: "2 latas", quantity: "2 latas (790g)", price: 12.0, points: 5 },
    ],
  },
  {
    name: "Leite em pó",
    options: [
      { label: "1 colher", quantity: "1 colher (sopa)", price: 0.25, points: 3 },
      { label: "3 colheres", quantity: "3 colheres (sopa)", price: 0.75, points: 10 },
      { label: "5 colheres", quantity: "5 colheres (sopa)", price: 1.25, points: 6 },
    ],
  },
  {
    name: "Creme de leite",
    options: [
      { label: "1/4 caixa", quantity: "1/4 caixa (100ml)", price: 1.0, points: 4 },
      { label: "1/2 caixa", quantity: "1/2 caixa (200ml)", price: 2.0, points: 12 },
      { label: "1 caixa", quantity: "1 caixa (400ml)", price: 4.0, points: 7 },
    ],
  },
  {
    name: "Manteiga",
    options: [
      { label: "1/2 colher", quantity: "1/2 colher (sopa)", price: 0.45, points: 3 },
      { label: "1 colher", quantity: "1 colher (sopa)", price: 0.9, points: 8 },
      { label: "2 colheres", quantity: "2 colheres (sopa)", price: 1.8, points: 5 },
    ],
  },
  {
    name: "Açúcar",
    options: [
      { label: "1 xícara", quantity: "1 xícara", price: 0.8, points: 6 },
      { label: "2 e 1/2 xícaras", quantity: "2 e 1/2 xícaras", price: 2.0, points: 18 },
      { label: "4 xícaras", quantity: "4 xícaras", price: 3.2, points: 4 },
    ],
  },
  {
    name: "Água",
    options: [
      { label: "1/2 xícara", quantity: "1/2 xícara", price: 0.0, points: 2 },
      { label: "1 e 1/2 xícara", quantity: "1 e 1/2 xícara", price: 0.0, points: 5 },
      { label: "3 xícaras", quantity: "3 xícaras", price: 0.0, points: 1 },
    ],
  },
  {
    name: "Vinagre",
    options: [
      { label: "1 colher", quantity: "1 colher (sopa)", price: 0.25, points: 3 },
      { label: "2 colheres", quantity: "2 colheres (sopa)", price: 0.5, points: 7 },
      { label: "4 colheres", quantity: "4 colheres (sopa)", price: 1.0, points: 2 },
    ],
  },
  {
    name: "Corante vermelho",
    options: [
      { label: "Poucas gotas", quantity: "Poucas gotas", price: 0.75, points: 2 },
      { label: "Gotinhas", quantity: "Gotinhas", price: 1.5, points: 6 },
      { label: "Muito", quantity: "Muito", price: 3.0, points: 1 },
    ],
  },
]

export const secretIngredient = {
  name: "Ingrediente Secreto Premium",
  quantity: "??? especial",
  price: 0.62,
  points: 25,
  description: "O diferencial que faz toda a diferença no sabor e textura",
}

export const priceOptions = [
  { price: 7.0, profit: 5.55, total: 66.6 },
  { price: 10.0, profit: 8.55, total: 102.6 },
  { price: 12.0, profit: 10.55, total: 126.6 },
]

export const randomNames = [
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

export const randomCities = [
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
