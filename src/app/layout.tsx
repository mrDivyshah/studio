import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/toaster';
import { BUSINESS_NAME, BUSINESS_SLOGAN } from '@/lib/constants';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"


export const metadata: Metadata = {
  title: {
    default: BUSINESS_NAME,
    template: `%s | ${BUSINESS_NAME}`,
  },
  description: BUSINESS_SLOGAN,
  keywords: ['electric wholesaler', 'electrical supplies', 'electro hub', 'wiring', 'lighting', 'circuit breakers'],
  authors: [{ name: 'Electro Hub Team' }],
  openGraph: {
    title: BUSINESS_NAME,
    description: BUSINESS_SLOGAN,
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com', // Replace with actual URL
    siteName: BUSINESS_NAME,
    // images: [ // Add a default image for social sharing
    //   {
    //     url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`,
    //     width: 1200,
    //     height: 630,
    //     alt: BUSINESS_NAME,
    //   },
    // ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        <Footer />
        <Toaster />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
