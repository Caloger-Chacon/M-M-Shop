import { client } from '@/sanity/lib/client'
import { featuredProductsQuery } from '@/sanity/lib/queries'
import type { Product } from '@/sanity/lib/types'
import ProductCard from '@/components/ProductCard'
import Link from 'next/link'

// 👇 ESTA LÍNEA OBLIGA A ACTUALIZAR LA PÁGINA EN CADA VISITA
export const revalidate = 0

export default async function DestacadasPage() {
  const products = await client.fetch(featuredProductsQuery) as Product[]

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-10">
        <p className="text-terracotta text-sm font-medium tracking-widest uppercase mb-2">
          Selección de la casa
        </p>
        <h1 className="font-serif text-4xl font-bold text-charcoal mb-4">
          Productos Destacados
        </h1>
        <p className="text-charcoal-light font-light max-w-2xl">
          Nuestras piezas más exclusivas, seleccionadas especialmente para ti.
        </p>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-cream">
          <div className="text-6xl mb-4">✨</div>
          <h3 className="font-serif text-xl font-semibold text-charcoal mb-2">
            Próximamente
          </h3>
          <p className="text-charcoal-light mb-6">
            Estamos preparando nuestra selección de productos destacados.
          </p>
          <Link
            href="/catalogo"
            className="inline-block bg-terracotta text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-terracotta/90 transition"
          >
            Ver catálogo completo
          </Link>
        </div>
      )}
    </div>
  )
}