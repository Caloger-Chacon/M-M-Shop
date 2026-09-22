import { client } from '@/sanity/lib/client'
import { productsQuery } from '@/sanity/lib/queries'
import type { Product } from '@/sanity/lib/types'
import CatalogView from '../../../components/CatalogView'

// 👇 ESTA LÍNEA ES LA MAGIA: Obliga a actualizar la página en cada visita
export const revalidate = 0 

export default async function CatalogPage() {
  const products = (await client.fetch(productsQuery)) as Product[]
  return <CatalogView products={products} />
}