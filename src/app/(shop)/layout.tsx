import { client } from '@/sanity/lib/client'
import { siteSettingsQuery } from '@/sanity/lib/queries'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { CartProvider } from '../../lib/cart-context'
import WhatsAppButton from '@/components/WhatsAppButton'

export default async function ShopLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = await client.fetch(siteSettingsQuery)

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-cream/20">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        
        {/* Pasamos el número directamente como prop */}
        <WhatsAppButton whatsappNumber={settings?.whatsappNumber} />
      </div>
    </CartProvider>
  )
}