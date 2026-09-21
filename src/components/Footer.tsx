interface FooterProps {
  whatsappNumber?: string
  address?: string
  hours?: string
}

export default function Footer({ whatsappNumber, address, hours }: FooterProps) {
  return (
    <footer className="bg-charcoal text-white mt-auto">
      {/* Barra superior destacada de Envíos */}
      <div className="bg-terracotta/10 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 text-center">
            <span className="text-xl">🚚</span>
            <p className="text-sm md:text-base font-medium text-white">
              Envíos nacionales por <span className="text-terracotta font-bold">Zoom</span>, <span className="text-terracotta font-bold">MRW</span> o la empresa de envíos de tu preferencia.
            </p>
          </div>
        </div>
      </div>

      {/* Contenido principal del footer */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Columna 1: Marca */}
          <div>
            <div className="font-serif text-2xl font-bold mb-2 text-white">M&M Shop</div>
            <div className="text-sm text-terracotta font-medium mb-3">Tu belleza es primero</div>
            <div className="text-xs text-white/50 leading-relaxed">
              Piezas exclusivas para la mujer venezolana moderna. 
              Elegancia que te acompaña de la oficina a la cena.
            </div>
            <div className="text-xs text-white/40 mt-4">
              Est. 2026 · {address || 'Caracas, Venezuela'}
            </div>
          </div>

          {/* Columna 2: Contacto */}
          <div>
            <div className="font-medium mb-4 text-sm uppercase tracking-widest text-terracotta">Contacto</div>
            <div className="text-sm text-white/70 space-y-3">
              {whatsappNumber ? (
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-terracotta transition group"
                >
                  <span className="text-lg group-hover:scale-110 transition">📱</span>
                  <span>WhatsApp: {whatsappNumber}</span>
                </a>
              ) : (
                <div className="flex items-center gap-2">
                  <span>📱</span>
                  <span>WhatsApp: (próximamente)</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <span>📍</span>
                <span>{address || 'Caracas, Venezuela'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🕐</span>
                <span>{hours || 'Lun - Sáb: 9am - 6pm'}</span>
              </div>
            </div>
          </div>

          {/* Columna 3: Envíos y Pagos (Agrupado para mejor equilibrio) */}
          <div>
            <div className="font-medium mb-4 text-sm uppercase tracking-widest text-terracotta">Envíos y Pagos</div>
            <div className="text-sm text-white/70 space-y-3">
              <div className="flex items-start gap-2">
                <span className="text-lg mt-0.5">📦</span>
                <span>Coordinamos con Zoom, MRW, Tealca o tu empresa de confianza.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">📱</span>
                <span>Pago Móvil</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">🪙</span>
                <span>Binance Pay (USDT)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">💵</span>
                <span>Efectivo</span>
              </div>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 mt-10 pt-6 text-center">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} M&M Shop. Todos los derechos reservados.
          </p>
          <p className="text-[10px] text-white/40  mt-2">
            Hecho con ❤️ en Venezuela
          </p>
        </div>
      </div>
    </footer>
  )
}