import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'
import { formatEUR } from '@/sanity/lib/format'
import type { Product } from '@/sanity/lib/types'

interface Props {
  product: Product
  compact?: boolean
}

export default function ProductCard({ product, compact = false }: Props) {
  const imageUrl = product.mainImage ? urlFor(product.mainImage).width(600).url() : null
  
  const finalPrice = product.onSale && product.salePrice ? product.salePrice : product.price
  const hasDiscount = product.onSale && product.salePrice && product.salePrice < product.price
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.salePrice!) / product.price) * 100)
    : 0

  return (
    <Link href={`/producto/${product.slug.current}`} className="block group">
      <div className={`bg-white rounded-2xl border border-cream overflow-hidden transition hover:shadow-md ${compact ? '' : 'h-full'}`}>
        {/* Imagen */}
        <div className={`relative bg-cream/30 overflow-hidden ${compact ? 'aspect-square' : 'aspect-[3/4]'}`}>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={product.name}
              className={`w-full h-full object-cover transition group-hover:scale-105 ${compact ? 'duration-300' : 'duration-500'}`}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs text-charcoal-light/40">
              Sin imagen
            </div>
          )}
          
          {/* Badge de descuento */}
          {hasDiscount && (
            <div className="absolute top-2 left-2 bg-terracotta text-white text-[10px] md:text-xs font-bold px-2 py-1 rounded-full">
              -{discountPercent}%
            </div>
          )}
        </div>

        {/* Info */}
        <div className={`p-2 md:p-3 ${compact ? 'md:p-4' : ''}`}>
          <p className="text-[10px] md:text-xs uppercase tracking-wider text-terracotta font-medium mb-1">
            {product.category}
          </p>
          <h3 className={`font-semibold text-charcoal line-clamp-1 ${compact ? 'text-xs md:text-sm' : 'text-sm md:text-base'}`}>
            {product.name}
          </h3>
          
          <div className="flex items-center gap-2 mt-1">
            {hasDiscount && (
              <span className="text-[10px] md:text-xs text-charcoal-light/50 line-through">
                {formatEUR(product.price)}
              </span>
            )}
            <span className={`font-bold text-terracotta ${compact ? 'text-xs md:text-sm' : 'text-sm md:text-base'}`}>
              {formatEUR(finalPrice)}
            </span>
          </div>
          
          {/* Dots de colores CORREGIDOS */}
          {product.variants && product.variants.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {product.variants.slice(0, 8).map((variant, i) => (
                <span
                  key={i}
                  className="w-3.5 h-3.5 md:w-4 md:h-4 rounded-full border border-white shadow-sm ring-1 ring-black/5"
                  style={{ backgroundColor: variant.colorHex || '#cccccc' }}
                  title={variant.color}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}