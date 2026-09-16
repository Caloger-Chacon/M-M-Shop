import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: 'M&M Shop - Tu belleza es primero',
  description: 'Carteras exclusivas para la mujer venezolana moderna',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet" />
        {/* Favicon: Solo la cartera, grande y en color terracota */}
        <link
          rel="icon"
          href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M 35 45 Q 35 20 50 20 Q 65 20 65 45' fill='none' stroke='%23C67B5C' stroke-width='6' stroke-linecap='round'/%3E%3Cpath d='M 20 45 L 80 45 L 80 85 Q 80 90 75 90 L 25 90 Q 20 90 20 85 Z' fill='%23C67B5C'/%3E%3C/svg%3E"
        />
      </head>
      <body className="bg-bone text-charcoal">
        {children}
      </body>
    </html>
  )
}