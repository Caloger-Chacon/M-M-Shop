import { client } from '@/sanity/lib/client'
import { siteSettingsQuery } from '@/sanity/lib/queries'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { CartProvider } from '../../lib/cart-context'

async function getSettings() {
  try {
    return await client.fetch(siteSettingsQuery)
  } catch {
    return null
  }
}

export default async function ShopLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = await getSettings()

  return (
    <CartProvider>
      <Header />
      <main className="min-h-screen bg-bone">{children}</main>
      <Footer
        whatsappNumber={settings?.whatsappNumber}
        address={settings?.address}
        hours={settings?.hours}
      />
    </CartProvider>
  )
}