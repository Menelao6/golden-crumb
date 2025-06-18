import './globals.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import { CartProvider } from "../context/CartContext";

const inter = Inter({ subsets: ['latin'] });
export const metadata: Metadata = {
  title: 'Embelsira Tradicionale',
  description: 'Embelsira Tradicionale - Receta tradicionale te embelsirave shqiptare',
  openGraph: {
    title: 'Embelsira Tradicionale',
    description: 'Embelsira Tradicionale - Receta tradicionale te embelsirave shqiptare',
    url: 'https://embelsiratradicionale.com',
    siteName: 'Embelsira Tradicionale',
    
  },
}

  export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
} 
