'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useCart } from '../lib/cart-context'
import { formatEUR } from '@/sanity/lib/format'

interface ServerInfo {
  price: number
  stock: number
}

export default function CartView({
  whatsappNumber,
  serverInfo,
}: {
  whatsappNumber: string
  serverInfo: Record<string, ServerInfo>
}) {
  const { items, updateQuantity, removeItem, clearCart } = useCart()

  const [name, setName] = useState('')
  const [zone, setZone] = useState('')
  const [payment, setPayment] = useState('Pago Móvil')
  const [orderSent, setOrderSent] = useState(false)

  // Precio y stock SIEMPRE desde el servidor
  const priceOf = (id: string, color: string, fallback: number) =>
    serverInfo[`${id}::${color}`]?.price ?? fallback

  const stockOf = (id: string, color: string) =>
    serverInfo[`${id}::${color}`]?.stock ?? 99

  const qtyOf = (item: (typeof items)[number]) =>
    Math.max(1, Math.min(item.quantity, stockOf(item.productId, item.color)))

  const subtotal = items.reduce(
    (sum, i) => sum + priceOf(i.productId, i.color, i.price) * qtyOf(i),
    0
  )
  const totalItems = items.reduce((sum, i) => sum + qtyOf(i), 0)

  const formComplete = name.trim() !== '' && zone.trim() !== ''

  const whatsappLink = () => {
    const now = new Date()
    const fecha = now.toLocaleDateString('es-VE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
    const hora = now.toLocaleTimeString('es-VE', {
      hour: '2-digit',
      minute: '2-digit',
    })

    const lines = items.map((i, idx) => {
      const qty = qtyOf(i)
      const price = priceOf(i.productId, i.color, i.price)
      return `${idx + 1}. ${i.name}\n   • Color: ${i.color} | Cant: ${qty} | ${formatEUR(price * qty)}`
    })

    const text = [
      '*NUEVO PEDIDO — M&M SHOP*',
      `Fecha: ${fecha} ${hora}`,
      '',
      '*PRODUCTOS:*',
      ...lines,
      '',
      '*RESUMEN:*',
      `• Subtotal: ${formatEUR(subtotal)}`,
      '• Envío: Se confirma según la zona',
      '',
      '*DATOS DE LA CLIENTA:*',
      `• Nombre: ${name.trim()}`,
      `• Zona de entrega: ${zone.trim()}`,
      `• Método de pago: ${payment}`,
      '',
      '— Pedido generado desde la web —',
    ].join('\n')

    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`
  }

  const handleSendOrder = () => {
    if (!formComplete) return
    
    // Abrir WhatsApp
    window.open(whatsappLink(), '_blank')
    
    // Marcar pedido como enviado
    setOrderSent(true)
    
    // Limpiar carrito
    clearCart()
    
    // Redirigir a home después de 4 segundos
    setTimeout(() => {
      window.location.href = '/'
    }, 4000)
  }

  // Pantalla de agradecimiento
  if (orderSent) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <div className="text-7xl mb-6">✅</div>
        <h1 className="font-serif text-4xl font-bold text-charcoal mb-4">
          ¡Pedido enviado!
        </h1>
        <p className="text-charcoal-light text-lg mb-2">
          Gracias por tu compra, <span className="font-semibold text-terracotta">{name}</span>
        </p>
        <p className="text-charcoal-light mb-8">
          Hemos recibido tu pedido y te contactaremos pronto por WhatsApp para confirmar los detalles de entrega.
        </p>
        <div className="bg-white rounded-2xl border border-cream p-6 mb-8">
          <p className="text-sm text-charcoal-light mb-2">Resumen de tu pedido:</p>
          <p className="font-bold text-charcoal text-lg">{totalItems} artículo(s)</p>
          <p className="font-bold text-terracotta text-2xl">{formatEUR(subtotal)}</p>
        </div>
        <p className="text-sm text-charcoal-light/60">
          Serás redirigido al inicio en unos segundos...
        </p>
        <Link
          href="/"
          className="inline-block mt-6 bg-terracotta text-white px-8 py-3 rounded-full font-medium hover:bg-terracotta/90 transition"
        >
          Volver al inicio ahora
        </Link>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <p className="font-serif text-5xl text-cream mb-6">M&M</p>
        <h1 className="font-serif text-3xl font-bold text-charcoal mb-4">
          Tu carrito está vacío
        </h1>
        <p className="text-charcoal-light font-light mb-8">
          Descubre nuestra colección y encuentra la cartera que habla por ti.
        </p>
        <Link
          href="/"
          className="bg-terracotta text-white px-8 py-3 rounded-full font-medium hover:bg-terracotta/90 transition"
        >
          Ver colección
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="font-serif text-3xl md:text-4xl font-bold text-charcoal mb-8">
        Carrito <span className="text-charcoal-light/50 text-xl">({totalItems})</span>
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* ===== ITEMS ===== */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            const qty = qtyOf(item)
            const price = priceOf(item.productId, item.color, item.price)
            const max = stockOf(item.productId, item.color)

            return (
              <div
                key={`${item.productId}-${item.color}`}
                className="flex gap-4 bg-white rounded-2xl border border-cream p-4"
              >
                <div className="w-24 h-28 rounded-xl overflow-hidden bg-cream/40 shrink-0">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-charcoal-light/40">
                      Sin imagen
                    </div>
                  )}
                </div>

                <div className="flex-1 flex flex-col justify-between py-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-serif font-semibold text-charcoal">{item.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-charcoal-light mt-1">
                        <span
                          className="w-3 h-3 rounded-full border border-white shadow"
                          style={{ backgroundColor: item.colorHex || '#ccc' }}
                        />
                        {item.color}
                      </div>
                      {qty < item.quantity && (
                        <p className="text-[11px] text-red-500 mt-1">
                          Solo hay {max} disponibles en este color
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => removeItem(item.productId, item.color)}
                      className="text-charcoal-light/40 hover:text-red-500 transition text-sm"
                      aria-label="Quitar"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-cream rounded-full">
                      <button
                        onClick={() => updateQuantity(item.productId, item.color, -1)}
                        className="px-3 py-1 text-charcoal hover:text-terracotta"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{qty}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.color, 1)}
                        disabled={qty >= max}
                        className="px-3 py-1 text-charcoal hover:text-terracotta disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        +
                      </button>
                    </div>
                    <span className="font-bold text-charcoal">{formatEUR(price * qty)}</span>
                  </div>
                </div>
              </div>
            )
          })}

          <button
            onClick={clearCart}
            className="text-sm text-charcoal-light/60 hover:text-red-500 transition"
          >
            Vaciar carrito
          </button>
        </div>

        {/* ===== RESUMEN + FORMULARIO ===== */}
        <div className="bg-white rounded-2xl border border-cream p-6 h-fit lg:sticky lg:top-24">
          <h2 className="font-serif text-xl font-bold text-charcoal mb-6">
            Resumen del pedido
          </h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-charcoal-light">
              <span>Subtotal ({totalItems} artículos)</span>
              <span>{formatEUR(subtotal)}</span>
            </div>
            <div className="flex justify-between text-charcoal-light">
              <span>Envío</span>
              <span>Se confirma al pedir</span>
            </div>
            <div className="border-t border-cream pt-3 flex justify-between font-bold text-charcoal text-base">
              <span>Total</span>
              <span>{formatEUR(subtotal)}</span>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <p className="text-xs font-medium uppercase tracking-widest text-terracotta">
              Tus datos para el pedido
            </p>
            <div>
              <label className="text-xs text-charcoal-light">Nombre y apellido *</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej: María Pérez"
                className="mt-1 w-full rounded-xl border border-cream bg-bone px-3 py-2 text-sm text-charcoal focus:outline-none focus:border-terracotta"
              />
            </div>
            <div>
              <label className="text-xs text-charcoal-light">Zona de entrega *</label>
              <input
                value={zone}
                onChange={(e) => setZone(e.target.value)}
                placeholder="Ej: Altamira, Caracas"
                className="mt-1 w-full rounded-xl border border-cream bg-bone px-3 py-2 text-sm text-charcoal focus:outline-none focus:border-terracotta"
              />
            </div>
            <div>
              <label className="text-xs text-charcoal-light">Método de pago</label>
              <select
                value={payment}
                onChange={(e) => setPayment(e.target.value)}
                className="mt-1 w-full rounded-xl border border-cream bg-bone px-3 py-2 text-sm text-charcoal focus:outline-none focus:border-terracotta"
              >
                <option>Pago Móvil</option>
                <option>Binance</option>
                <option>Efectivo</option>
                <option>Transferencia</option>
              </select>
            </div>
          </div>

          {whatsappNumber ? (
            <>
              <button
                onClick={handleSendOrder}
                disabled={!formComplete}
                className={`mt-6 block w-full text-center py-3 rounded-full font-medium transition ${
                  formComplete
                    ? 'bg-[#25D366] text-white hover:bg-[#1ebe5b]'
                    : 'bg-cream/60 text-charcoal-light/50 cursor-not-allowed'
                }`}
              >
                Pedir por WhatsApp
              </button>
              {!formComplete && (
                <p className="mt-2 text-[11px] text-charcoal-light/60 text-center">
                  Completa tu nombre y tu zona para enviar el pedido.
                </p>
              )}
            </>
          ) : (
            <p className="mt-6 text-xs text-red-500 bg-red-50 rounded-xl p-3">
              Falta configurar el número de WhatsApp. Hazlo en Studio → Configuración del Sitio.
            </p>
          )}

          <Link
            href="/"
            className="mt-4 block text-center text-sm text-charcoal-light hover:text-terracotta transition"
          >
            ← Seguir comprando
          </Link>
        </div>
      </div>
    </div>
  )
}