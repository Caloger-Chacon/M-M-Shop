import { client } from '@/sanity/lib/client'
import { siteSettingsQuery } from '@/sanity/lib/queries'
import type { SiteSettings } from '@/sanity/lib/types'
import CartView from '@/components/CartView'

const catalogQuery = /* groq */ `*[_type == "product"] {
  _id,
  price,
  variants[] { color, stock }
}`

export default async function CartPage() {
  const [settings, catalog] = await Promise.all([
    client.fetch(siteSettingsQuery),
    client.fetch(catalogQuery),
  ])

  // Mapa: "productId::color" → { precio y stock REALES del servidor }
  const serverInfo: Record<string, { price: number; stock: number }> = {}
  for (const p of catalog ?? []) {
    for (const v of p.variants ?? []) {
      serverInfo[`${p._id}::${v.color}`] = {
        price: p.price ?? 0,
        stock: v.stock ?? 0,
      }
    }
  }

  return (
    <CartView
      whatsappNumber={(settings as SiteSettings | null)?.whatsappNumber ?? ''}
      serverInfo={serverInfo}
    />
  )
}