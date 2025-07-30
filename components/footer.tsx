export const Footer = () => {
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
            Este site não é afiliado ao Facebook ou a qualquer entidade do Facebook. Depois que você sair do Facebook, a
            responsabilidade não é deles e sim do nosso site.
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
