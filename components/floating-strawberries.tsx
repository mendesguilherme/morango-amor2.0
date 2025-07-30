export const FloatingStrawberries = () => {
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
