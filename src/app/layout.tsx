import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ScrollProgress } from '@/components/scroll-progress';

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

export const metadata: Metadata = {
  title: {
    default: 'Khurshidbek Urazaliev — AI & Tech Innovator',
    template: '%s | Khurshidbek Urazaliev',
  },
  description:
    'AI & Tech Innovator · Multilingual · Faith-Driven Creator. Building technology, mastering languages, creating leverage for a bigger future.',
  keywords: ['AI', 'Web Development', 'Machine Learning', 'Portfolio', 'Data Science'],
  authors: [{ name: 'Khurshidbek Urazaliev' }],
  creator: 'Khurshidbek Urazaliev',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Khurshidbek Urazaliev — AI & Tech Innovator',
    description: 'AI & Tech Innovator · Multilingual · Faith-Driven Creator',
    siteName: 'Khurshidbek Urazaliev',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <div className="flex min-h-screen flex-col">
            <ScrollProgress />
            <Header />
            <main className="flex-1 pt-16">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
