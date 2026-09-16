import { groq } from 'next-sanity'

export const apiVersion = '2024-01-01'

export const productsQuery = groq`*[_type == "product"] | order(_createdAt desc) {
  _id,
  name,
  slug,
  category,
  price,
  onSale,
  salePrice,
  mainImage,
  variants[] { color, colorHex, stock }
}`
  
export const featuredProductsQuery = groq`*[_type == "product" && featured == true] | order(_createdAt desc) {
  _id,
  name,
  slug,
  category,
  price,
  onSale,
  salePrice,
  mainImage,
  variants[] { color, colorHex, stock }
}`

export const productBySlugQuery = groq`*[_type == "product" && slug.current == $slug][0] {
  _id,
  _createdAt,
  name,
  slug,
  category,
  price,
  onSale,
  salePrice,
  saleEndDate,
  description,
  mainImage,
  gallery[],
  variants[] {
    color,
    colorHex,
    stock
  },
  features {
    material,
    dimensions,
    compartments,
    closure
  }
}`

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0] {
  whatsappNumber,
  address,
  hours,
  bcvRate,
  deliveryCost
}`