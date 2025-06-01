
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
  keywords: ['marketing agency', 'digital marketing', 'suparshwa marketing', 'branding', 'seo', 'social media', 'modern design'],
  authors: [{ name: `${BUSINESS_NAME} Team` }],
  openGraph: {
    title: BUSINESS_NAME,
    description: BUSINESS_SLOGAN,
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com', 
    siteName: BUSINESS_NAME,
    // images: [ 
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
  // This is a simplified check. In a real app, this would involve route inspection
  // and potentially a more sophisticated way to determine if the current route is part of the admin area.
  const isActuallyAdminRoute = (children as React.ReactElement)?.props?.childProp?.segment === 'admin';

  // If it's an admin route, we don't render the main Header and Footer
  if (isActuallyAdminRoute) {
    return (
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500&display=swap" rel="stylesheet" />
        </head>
        <body className="font-body antialiased bg-background text-foreground">
            {children}
          <Toaster />
          <SpeedInsights />
          <Analytics />
        </body>
      </html>
    );
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
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

