'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export interface CartItem {
  productId: string
  name: string
  category: string
  price: number
  color: string
  colorHex?: string
  quantity: number
  imageUrl?: string
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (productId: string, color: string) => void
  updateQuantity: (productId: string, color: string, delta: number) => void
  clearCart: () => void
  totalItems: number
  subtotal: number
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('mm-shop-cart')
      if (saved) setItems(JSON.parse(saved))
    } catch {}
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (loaded) localStorage.setItem('mm-shop-cart', JSON.stringify(items))
  }, [items, loaded])

  const addItem = (item: CartItem) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.productId === item.productId && i.color === item.color
      )
      if (existing) {
        return prev.map((i) =>
          i.productId === item.productId && i.color === item.color
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        )
      }
      return [...prev, item]
    })
  }

  const removeItem = (productId: string, color: string) => {
    setItems((prev) =>
      prev.filter((i) => !(i.productId === productId && i.color === color))
    )
  }

  const updateQuantity = (productId: string, color: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((i) =>
          i.productId === productId && i.color === color
            ? { ...i, quantity: Math.max(0, i.quantity + delta) }
            : i
        )
        .filter((i) => i.quantity > 0)
    )
  }

  const clearCart = () => setItems([])

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)
  const subtotal = items.reduce((sum, i) => sum + i.quantity * i.price, 0)

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, subtotal }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart debe usarse dentro de <CartProvider>')
  return ctx
}