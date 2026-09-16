import Link from 'next/link'
import CartBadge from './CartBadge'

export default function Header() {
  return (
    <header className="bg-bone border-b border-cream sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {/* Logo M&M */}
              <div className="w-10 h-10 rounded-full overflow-hidden bg-white">
                <img
                  src="/logo-mm.png"
                  alt="M&M Shop"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-charcoal text-lg leading-none">
                  M&M Shop
                </span>
                <span className="text-[10px] uppercase tracking-widest text-terracotta leading-none mt-1">
                  TU BELLEZA ES PRIMERO
                </span>
              </div>
            </div>
          </Link>

          {/* Navegación */}
          <nav className="flex items-center gap-4 md:gap-6">
            <Link
              href="/"
              className="text-sm text-charcoal hover:text-terracotta transition hidden md:block"
            >
              Inicio
            </Link>
            <Link
              href="/catalogo"
              className="text-sm text-charcoal hover:text-terracotta transition"
            >
              Catálogo
            </Link>
            {/* Carrito */}
            <CartBadge />
          </nav>
        </div>
      </div>
    </header>
  )
}