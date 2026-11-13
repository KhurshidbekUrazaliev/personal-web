import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ScrollProgress } from '@/components/scroll-progress';

/**
 * The frame of the main site: header, scroll bar and footer.
 * Pages outside this folder (the links page) are drawn without it.
 */
export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollProgress />
      <Header />
      <main id="main" className="flex-1 pt-16">{children}</main>
      <Footer />
    </div>
  );
}
