import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "M&M Shop - Tu belleza es primero",
  description: "Carteras exclusivas para la mujer venezolana moderna. Envíos a toda Caracas y el interior del país.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-bone text-charcoal">
        {children}
      </body>
    </html>
  );
}