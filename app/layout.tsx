import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Consulics - Tax & Trucking Services',
  description: 'Professional tax filing and trucking compliance services for individuals and businesses',
  keywords: 'tax services, trucking, IFTA, IRP, tax filing, small business',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://consulics.com',
    title: 'Consulics - Tax & Trucking Services',
    description: 'Professional tax and trucking compliance services',
    images: [
      {
        url: 'https://consulics.com/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
      </head>
      <body className="min-h-screen bg-[#123B77] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
