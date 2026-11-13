import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { MotionProvider } from '@/components/providers/motion-provider';
import { SITE } from '@/lib/site';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

const title = `${SITE.name} — ${SITE.role}`;

export const metadata: Metadata = {
  // Makes the canonical link and the share image point at the real address,
  // also when the same build is opened through a *.vercel.app URL.
  metadataBase: new URL(SITE.url),
  title: {
    default: title,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    SITE.name,
    'Software Engineer',
    'React',
    'Next.js',
    'React Native',
    'Python',
    'Busan',
    'Portfolio',
  ],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title,
    description: SITE.tagline,
    siteName: SITE.name,
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description: SITE.tagline,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {/* The header and footer are added in (site)/layout.tsx. */}
          <MotionProvider>{children}</MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
