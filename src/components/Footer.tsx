interface FooterProps {
  whatsappNumber?: string
  address?: string
  hours?: string
}

export default function Footer({ whatsappNumber, address, hours }: FooterProps) {
  return (
    <footer className="bg-charcoal text-white py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="font-serif text-2xl font-bold mb-2">M&M Shop</div>
            <div className="text-sm text-white/60">Tu belleza es primero</div>
            <div className="text-xs text-white/40 mt-2">Est. 2026 · {address || 'Caracas, Venezuela'}</div>
          </div>
          <div>
            <div className="font-medium mb-3">Contacto</div>
            <div className="text-sm text-white/60 space-y-1">
              {whatsappNumber ? (
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                   WhatsApp: {whatsappNumber}
                </a>
              ) : (
                <div>📱 WhatsApp: (próximamente)</div>
              )}
              <div> {address || 'Caracas, Venezuela'}</div>
              <div>🕐 {hours || 'Lun-Sáb: 9am - 6pm'}</div>
            </div>
          </div>
          <div>
            <div className="font-medium mb-3">Pagos aceptados</div>
            <div className="text-sm text-white/60 space-y-1">
              <div>📱 Pago Móvil</div>
              <div>🪙 Binance Pay</div>
              <div>💵 Efectivo</div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-6 text-center text-xs text-white/40">
          © 2026 M&M Shop. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}