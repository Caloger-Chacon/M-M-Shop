'use client'

import { useState } from 'react'
import { useCart } from '../lib/cart-context'
import { formatEUR } from '@/sanity/lib/format'
import { getColorHex } from '@/sanity/lib/colors'
import type { ProductVariant } from '@/sanity/lib/types'

interface Props {
  productId: string
  name: string
  category: string
  price: number
  onSale?: boolean
  salePrice?: number
  variants: ProductVariant[]
  imageUrl?: string
}

export default function ProductBuyBox({
  productId,
  name,
  category,
  price,
  onSale,
  salePrice,
  variants,
  imageUrl,
}: Props) {
  const { addItem } = useCart()
  const [selectedColor, setSelectedColor] = useState(variants[0]?.color ?? '')
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  const current = variants.find((v) => v.color === selectedColor)
  const stock = current?.stock ?? 0

  // ✅ Calcular precio real: si está en oferta, usa salePrice
  const currentPrice =
    onSale && salePrice && salePrice > 0 && salePrice < price
      ? salePrice
      : price

  const handleAdd = () => {
    if (!selectedColor || stock < 1) return
    addItem({
      productId,
      name,
      category,
      price: currentPrice, // ✅ Guarda el precio con descuento
      color: selectedColor,
      colorHex: getColorHex(selectedColor, current?.colorHex),
      quantity,
      imageUrl,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="text-sm font-medium text-charcoal mb-2">
          Color:{' '}
          <span className="text-charcoal-light">{selectedColor || 'Sin variantes'}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {variants.map((v) => (
            <button
              key={v.color}
              onClick={() => setSelectedColor(v.color)}
              title={`${v.color} (${v.stock} disponibles)`}
              className={`w-9 h-9 rounded-full border-2 transition ${
                selectedColor === v.color
                  ? 'border-terracotta scale-110'
                  : 'border-white shadow'
              }`}
              style={{ backgroundColor: getColorHex(v.color, v.colorHex) }}
            />
          ))}
        </div>
        {current && (
          <div className="text-xs text-charcoal-light/60 mt-2">
            {stock > 0 ? `${stock} unidades disponibles` : 'Agotado en este color'}
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center border border-cream rounded-full">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-4 py-2 text-charcoal hover:text-terracotta"
          >
            −
          </button>
          <span className="w-8 text-center font-medium">{quantity}</span>
          <button
            onClick={() =>
              setQuantity(Math.min(Math.max(stock, 1), quantity + 1))
            }
            className="px-4 py-2 text-charcoal hover:text-terracotta"
          >
            +
          </button>
        </div>
        <button
          onClick={handleAdd}
          disabled={!selectedColor || stock < 1}
          className="flex-1 bg-terracotta text-white py-3 rounded-full font-medium hover:bg-terracotta/90 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {added
            ? '¡Agregado! ✅'
            : `Agregar al carrito · ${formatEUR(currentPrice * quantity)}`}
        </button>
      </div>
    </div>
  )
}