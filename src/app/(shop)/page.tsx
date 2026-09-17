import { client } from '@/sanity/lib/client'
import { productsQuery, featuredProductsQuery } from '@/sanity/lib/queries'
import type { Product } from '@/sanity/lib/types'
import CategorySlider from '@/components/CategorySlider'
import Link from 'next/link'

export default async function HomePage() {
  let allProducts: Product[] = []
  let displayFeatured: Product[] = []

  try {
    const [products, featuredProducts] = await Promise.all([
      client.fetch(productsQuery, {}, { next: { revalidate: 0 } }),
      client.fetch(featuredProductsQuery, {}, { next: { revalidate: 0 } }),
    ])

    allProducts = (products as Product[]) || []
    const featured = (featuredProducts as Product[]) || []
    
    displayFeatured = featured.length > 0 ? featured.slice(0, 4) : []
  } catch (error) {
    console.error('Error cargando productos:', error)
  }

  // Agrupar productos por categoría
  const byCategory = allProducts.reduce<Record<string, Product[]>>((acc, p) => {
    const cat = p.category || 'Otros'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(p)
    return acc
  }, {})

  // Mostrar todas las categorías (sin filtro)
  const categoriesToShow = Object.entries(byCategory).slice(0, 6)

  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="bg-bone py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-terracotta text-sm font-medium tracking-widest uppercase mb-4">
                NUEVA COLECCIÓN 2026
              </p>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal mb-6">
                Carteras que hablan por ti
              </h1>
              <p className="text-charcoal-light font-light text-lg mb-8">
                Piezas exclusivas para la mujer venezolana moderna. 
                Elegancia que te acompaña de la oficina a la cena.
              </p>
              <div className="flex flex-wrap gap-4">
              <Link
                href="/destacadas"  // ← Cambia esto (antes era /catalogo)
                className="bg-terracotta text-white px-8 py-3 rounded-full font-medium hover:bg-terracotta/90 transition"
              >
                Ver destacadas
              </Link>
                <Link
                  href="/catalogo"
                  className="bg-white text-charcoal border border-cream px-8 py-3 rounded-full font-medium hover:border-terracotta hover:text-terracotta transition"
                >
                  Catálogo completo
                </Link>
              </div>
            </div>

            <div className="flex justify-center md:justify-end">
              <div className="bg-white rounded-2xl p-8 shadow-sm max-w-md w-full">
                <img
                  src="/logo-mm.png"
                  alt="M&M Shop - Tu belleza es primero"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== DESTACADAS (solo si hay) ===== */}
      {displayFeatured.length > 0 && (
        <CategorySlider
          title="Destacadas"
          subtitle="SELECCIÓN DE LA CASA"
          products={displayFeatured}
          linkAll="/catalogo"
        />
      )}

      {/* ===== SLIDERS POR CATEGORÍA ===== */}
      {categoriesToShow.length > 0 ? (
        categoriesToShow.map(([category, products]) => (
          <CategorySlider
            key={category}
            title={category}
            subtitle="COLECCIÓN"
            products={products}
            linkAll={`/catalogo?cat=${encodeURIComponent(category)}`}
          />
        ))
      ) : allProducts.length > 0 ? (
        // Si hay productos pero no se agruparon bien, mostrar todos
        <CategorySlider
          title="Productos"
          subtitle="NUEVA COLECCIÓN"
          products={allProducts.slice(0, 8)}
          linkAll="/catalogo"
        />
      ) : null}

      {/* Si no hay productos en absoluto */}
      {allProducts.length === 0 && (
        <section className="py-24 md:py-32 bg-gradient-to-b from-bone to-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            {/* Animación de bolsa flotante */}
            <div className="relative mb-8">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-terracotta/20 to-cream rounded-full flex items-center justify-center animate-pulse">
                <div className="w-24 h-24 bg-gradient-to-br from-terracotta/40 to-cream rounded-full flex items-center justify-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="w-12 h-12 text-terracotta" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={1.5} 
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
                    />
                  </svg>
                </div>
              </div>
              {/* Círculos decorativos */}
              <div className="absolute top-0 left-1/4 w-16 h-16 bg-terracotta/10 rounded-full blur-xl"></div>
              <div className="absolute bottom-0 right-1/4 w-20 h-20 bg-cream rounded-full blur-xl"></div>
            </div>

            {/* Texto principal */}
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-charcoal mb-4">
              Próximamente
            </h2>
            
            <p className="text-charcoal-light font-light text-lg md:text-xl mb-8 max-w-xl mx-auto leading-relaxed">
              Estamos preparando algo especial para ti. 
              <span className="text-terracotta font-medium"> Nuestra colección exclusiva </span> 
              estará disponible muy pronto.
            </p>

            {/* Divider decorativo */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-terracotta/30"></div>
              <div className="w-2 h-2 bg-terracotta rounded-full"></div>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-terracotta/30"></div>
            </div>

            {/* Mensaje secundario */}
            <p className="text-sm text-charcoal-light/60 italic">
              Piezas exclusivas para la mujer venezolana moderna
            </p>
          </div>
        </section>
      )}
    </div>
  )
}