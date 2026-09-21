'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import ProductCard from './ProductCard'
import type { Product } from '@/sanity/lib/types'

interface Props {
  title: string
  subtitle?: string
  products: Product[]
  linkAll?: string
}

export default function CategorySlider({ title, subtitle, products, linkAll }: Props) {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(4)

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setVisible(2)  // ← Cambiado de 1 a 2
      else if (window.innerWidth < 1024) setVisible(2)
      else if (window.innerWidth < 1280) setVisible(3)
      else setVisible(4)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  // Auto-slide cada 5 segundos
  useEffect(() => {
    if (products.length <= visible) return
    const timer = setInterval(() => {
      setIndex((prev) => {
        const max = products.length - visible
        return prev >= max ? 0 : prev + 1
      })
    }, 5000)
    return () => clearInterval(timer)
  }, [products.length, visible])

  if (products.length === 0) return null

  const maxIndex = Math.max(0, products.length - visible)
  const safeIndex = Math.min(index, maxIndex)
  const translate = -(safeIndex * (100 / visible))

  const prev = () => setIndex((i) => Math.max(0, i - 1))
  const next = () => setIndex((i) => Math.min(maxIndex, i + 1))

  return (
    <section className="py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-6 md:mb-10">
          <div>
            {subtitle && (
              <p className="text-terracotta text-xs md:text-sm font-medium tracking-widest uppercase mb-1 md:mb-2">
                {subtitle}
              </p>
            )}
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-charcoal">
              {title}
            </h2>
          </div>
          {linkAll && (
            <Link
              href={linkAll}
              className="text-xs md:text-sm text-charcoal hover:text-terracotta transition"
            >
              Ver todo →
            </Link>
          )}
        </div>

        <div className="relative group">
          {/* Slider */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(${translate}%)` }}
            >
              {products.map((product) => (
                <div
                  key={product._id}
                  className="shrink-0 px-1 md:px-2"
                  style={{ width: `${100 / visible}%` }}
                >
                  <ProductCard product={product} compact />
                </div>
              ))}
            </div>
          </div>

          {/* Flechas */}
          {products.length > visible && (
            <>
              <button
                onClick={prev}
                disabled={safeIndex === 0}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white border border-cream shadow-md flex items-center justify-center text-charcoal hover:bg-terracotta hover:text-white hover:border-terracotta transition disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Anterior"
              >
                ←
              </button>
              <button
                onClick={next}
                disabled={safeIndex >= maxIndex}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white border border-cream shadow-md flex items-center justify-center text-charcoal hover:bg-terracotta hover:text-white hover:border-terracotta transition disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Siguiente"
              >
                →
              </button>
            </>
          )}

          {/* Indicadores (dots) */}
          {products.length > visible && (
            <div className="flex justify-center gap-2 mt-4 md:mt-6">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === safeIndex
                      ? 'w-8 bg-terracotta'
                      : 'w-1.5 bg-cream hover:bg-terracotta/50'
                  }`}
                  aria-label={`Ir al slide ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}