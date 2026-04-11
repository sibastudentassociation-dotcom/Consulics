import HomeContent from './components/HomeContent';

export const metadata = {
  title: 'CONSULICS | USA Tax & Trucking Compliance Platform',
  description: 'CONSULICS delivers high-conversion tax, trucking, and compliance services for U.S. businesses and drivers with AI automation, secure client portal, and expert support.',
  keywords: 'tax filing, trucking compliance, IFTA, IRP, Form 2290, US tax services, trucking services, client portal, business compliance',
  openGraph: {
    title: 'CONSULICS | Tax & Trucking Compliance',
    description: 'High-converting tax and trucking compliance solutions for the USA.',
    type: 'website',
    url: 'https://consulics.com',
    images: [
      {
        url: 'https://consulics.com/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function Home() {
  return <HomeContent />;
}
