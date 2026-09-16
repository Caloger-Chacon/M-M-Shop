'use client'

import Link from 'next/link'
import { useCart } from '../lib/cart-context'

export default function CartBadge() {
  const { totalItems } = useCart()

  return (
    <Link 
      href="/carrito" 
      className="relative text-charcoal hover:text-terracotta transition"
      aria-label="Ver carrito"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
        <line x1="3" y1="6" x2="21" y2="6"/>
        <path d="M16 10a4 4 0 0 1-8 0"/>
      </svg>
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-terracotta text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </Link>
  )
}