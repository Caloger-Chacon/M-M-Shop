import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'
import { formatEUR, calculateDiscountPercent } from '@/sanity/lib/format'
import { getColorHex } from '@/sanity/lib/colors'
import type { Product } from '@/sanity/lib/types'

export default function ProductCard({ product }: { product: Product }) {
  const colors = (product.variants ?? []).slice(0, 5)
  
  // ✅ Verificar si tiene descuento válido
  const hasDiscount =
    product.onSale &&
    product.salePrice &&
    product.salePrice > 0 &&
    product.salePrice < (product.price ?? 0)
  
  const discountPercent = hasDiscount
    ? calculateDiscountPercent(product.price ?? 0, product.salePrice ?? 0)
    : 0

  return (
    <Link
      href={`/producto/${product.slug?.current ?? product._id}`}
      className="group block bg-white rounded-2xl border border-cream overflow-hidden hover:shadow-lg hover:-translate-y-1 transition"
    >
      <div className="relative aspect-[4/5] bg-cream/40 overflow-hidden">
        {/* ✅ Badge de descuento */}
        {hasDiscount && (
          <div className="absolute top-3 left-3 bg-terracotta text-white text-xs font-bold px-3 py-1 rounded-full z-10">
            -{discountPercent}%
          </div>
        )}
        
        {product.mainImage ? (
          <img
            src={urlFor(product.mainImage).width(600).height(750).url()}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs text-charcoal-light/40">
            Sin imagen
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="text-[11px] uppercase tracking-widest text-terracotta mb-1">
          {product.category ?? 'Cartera'}
        </div>
        <h3 className="font-serif font-semibold text-charcoal leading-snug mb-2">
          {product.name}
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            {hasDiscount ? (
              <>
                {/* ✅ Precio tachado */}
                <span className="text-xs text-charcoal-light/50 line-through">
                  {formatEUR(product.price ?? 0)}
                </span>
                {/* ✅ Precio de oferta */}
                <span className="font-bold text-terracotta">
                  {formatEUR(product.salePrice ?? 0)}
                </span>
              </>
            ) : (
              <span className="font-bold text-charcoal">
                {formatEUR(product.price ?? 0)}
              </span>
            )}
          </div>
          <div className="flex gap-1">
            {colors.map((v) => (
              <span
                key={v.color}
                title={v.color}
                className="w-3.5 h-3.5 rounded-full border border-white shadow"
                style={{ backgroundColor: getColorHex(v.color, v.colorHex) }}
              />
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}