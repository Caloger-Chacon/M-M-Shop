'use client'

import { useMemo, useState } from 'react'
import ProductCard from './ProductCard'
import type { Product } from '@/sanity/lib/types'

type SortKey = 'relevancia' | 'precio-asc' | 'precio-desc'

export default function CatalogView({ products }: { products: Product[] }) {
  const [category, setCategory] = useState('Todas')
  const [sort, setSort] = useState<SortKey>('relevancia')

  const categories = useMemo(
    () =>
      Array.from(
        new Set(products.map((p) => p.category).filter(Boolean))
      ) as string[],
    [products]
  )

  const visible = useMemo(() => {
    let list =
      category === 'Todas'
        ? [...products]
        : products.filter((p) => p.category === category)

    if (sort === 'precio-asc') list.sort((a, b) => (a.price ?? 0) - (b.price ?? 0))
    if (sort === 'precio-desc') list.sort((a, b) => (b.price ?? 0) - (a.price ?? 0))

    return list
  }, [products, category, sort])

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8">
        <p className="text-terracotta text-sm font-medium tracking-widest uppercase mb-2">
          Nuestra colección
        </p>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-charcoal">
          Catálogo
        </h1>
        <p className="text-sm text-charcoal-light/60 mt-2">
          {visible.length} producto(s)
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex flex-wrap gap-2">
          {['Todas', ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                category === cat
                  ? 'bg-terracotta text-white'
                  : 'bg-white text-charcoal-light border border-cream hover:border-terracotta hover:text-terracotta'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="rounded-full border border-cream bg-white px-4 py-2 text-sm text-charcoal focus:outline-none focus:border-terracotta"
        >
          <option value="relevancia">Orden: Relevancia</option>
          <option value="precio-asc">Precio: menor a mayor</option>
          <option value="precio-desc">Precio: mayor a menor</option>
        </select>
      </div>

      {visible.length === 0 ? (
        <p className="text-charcoal-light/60 py-16 text-center">
          No hay productos en esta categoría todavía.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {visible.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}
    </div>
  )
}