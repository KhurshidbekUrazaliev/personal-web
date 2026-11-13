import Link from 'next/link';
import SiteLayout from './(site)/layout';

// An address that does not exist still gets the site's header and footer.
export default function NotFound() {
  return (
    <SiteLayout>
      <section className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="text-3xl font-bold" style={{ color: 'var(--brand-text)' }}>
          Page not found
        </h1>
        <p style={{ color: 'var(--brand-muted)' }}>
          There is nothing at this address.
        </p>
        <Link href="/" className="underline" style={{ color: 'var(--brand-gold)' }}>
          Go to the home page
        </Link>
      </section>
    </SiteLayout>
  );
}
