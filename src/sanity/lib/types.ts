export interface ProductVariant {
  color: string
  colorHex?: string
  stock: number
  sku?: string
}

export interface ProductFeatures {
  material?: string
  dimensions?: string
  compartments?: number
  closure?: string
}

export interface Product {
  _id: string
  _createdAt: string
  name: string
  slug: { current: string }
  category: string
  price: number
  onSale?: boolean
  salePrice?: number
  saleEndDate?: string
  description?: string
  mainImage?: any
  features?: ProductFeatures
  variants: ProductVariant[]
  isFeatured?: boolean
  isActive?: boolean
}

export interface SiteSettings {
  whatsappNumber?: string
  exchangeRate?: number
  deliveryCost?: number
  pagoMovil?: {
    bank?: string
    bankCode?: string
    idNumber?: string
    phone?: string
  }
  binance?: {
    email?: string
    walletAddress?: string
    network?: string
  }
}