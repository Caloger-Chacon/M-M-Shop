import { notFound } from 'next/navigation'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { productBySlugQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { formatEUR, calculateDiscountPercent} from '@/sanity/lib/format'
import type { Product } from '@/sanity/lib/types'
import ProductBuyBox from '@/components/ProductBuyBox'

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = (await client.fetch(productBySlugQuery, { slug })) as Product | null

  if (!product) notFound()

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <nav className="text-sm text-charcoal-light/60 mb-8">
        <Link href="/" className="hover:text-terracotta">Inicio</Link>
        <span className="mx-2">/</span>
        <Link href="/catalogo" className="hover:text-terracotta">Catálogo</Link>
        <span className="mx-2">/</span>
        <span className="text-charcoal">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="rounded-2xl overflow-hidden bg-cream/40 aspect-[4/5]">
          {product.mainImage ? (
            <img
              src={urlFor(product.mainImage).width(900).height(1125).url()}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-7xl">👜</div>
          )}
        </div>

        <div>
          <div className="text-sm uppercase tracking-widest text-terracotta mb-2">
            {product.category}
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-charcoal mb-4">
            {product.name}
          </h1>
          <div className="mb-6">
            {product.onSale && product.salePrice && product.salePrice < (product.price ?? 0) ? (
              <div className="flex items-center gap-4">
                <div className="text-3xl font-bold text-terracotta">
                  {formatEUR(product.salePrice)}
                </div>
                <div className="flex flex-col">
                  <span className="text-xl text-charcoal-light/50 line-through">
                    {formatEUR(product.price ?? 0)}
                  </span>
                  <span className="text-sm bg-terracotta text-white px-2 py-0.5 rounded-full w-fit">
                    -{calculateDiscountPercent(product.price ?? 0, product.salePrice)}% OFF
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-3xl font-bold text-terracotta">
                {formatEUR(product.price ?? 0)}
              </div>
            )}
          </div>

          {product.description && (
            <p className="text-charcoal-light font-light mb-8">{product.description}</p>
          )}

          <ProductBuyBox
            productId={product._id}
            name={product.name}
            category={product.category}
            price={product.price ?? 0}
            onSale={product.onSale}
            salePrice={product.salePrice}
            variants={product.variants ?? []}
            imageUrl={
              product.mainImage
                ? urlFor(product.mainImage).width(300).height(375).url()
                : undefined
            }
          />

          {product.features && (
            <div className="mt-10 border-t border-cream pt-6">
              <h2 className="font-serif font-semibold text-charcoal mb-4">Características</h2>
              <ul className="space-y-2 text-sm text-charcoal-light">
                {product.features.material && <li>• Material: {product.features.material}</li>}
                {product.features.dimensions && <li>• Dimensiones: {product.features.dimensions}</li>}
                {product.features.compartments != null && (
                  <li>• Compartimentos: {product.features.compartments}</li>
                )}
                {product.features.closure && <li>• Cierre: {product.features.closure}</li>}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}