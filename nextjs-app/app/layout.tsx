import type { Metadata } from 'next';
import { DM_Sans, Outfit } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MotionEffects from '@/components/MotionEffects';
import { ToastProvider } from '@/components/ToastProvider';
import { PrismicPreview } from '@prismicio/next';
import { linkResolver, repositoryName } from '@/lib/prismicio';
import * as prismic from '@prismicio/client';
import { getSiteSettings } from '@/lib/site-content';
import type { NavLink } from '@/lib/nav';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'EED Research Institute — Advancing Evidence-Based Sustainability',
  description:
    'EED Research Institute is a multidisciplinary organization advancing scientific inquiry in WASH, energy, climate change, and agriculture.',
  icons: {
    icon: '/assets/logo/eri-logo-mark.png',
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: any = settings?.data || {};
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const destination = (field: any) => field?.link_type === 'Document' && field?.type === 'site_page'
    ? linkResolver(field) : prismic.asLink(field);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const links = (items: any[]): NavLink[] => items.filter((item) => item.label && destination(item.link))
    .map((item) => ({ label: item.label, href: destination(item.link)! }));
  const navLinks = links(data.navigation || []);
  const pillarLinks = links(data.pillar_navigation || []);
  const quickLinks = links(data.footer_quick_links || []);
  const infoLinks = links(data.footer_information || []);
  const legalLinks = links(data.footer_legal || []);
  const ctaHref = destination(data.cta_link);
  return (
    <html lang="en" className={`${dmSans.variable} ${outfit.variable}`}>
      <head>
        {/* Sets .js before first paint so the reveal/motion system in
            globals.css (scoped to `.js [data-reveal]` etc.) never flashes
            unstyled content — matches the inline snippet every original
            page had in <head>. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body>
        <ToastProvider>
          <Header
            logo={data.header_logo?.url || undefined}
            links={navLinks.length ? navLinks : undefined}
            pillars={pillarLinks.length ? pillarLinks : undefined}
            cta={data.cta_label && ctaHref ? { label: data.cta_label, href: ctaHref } : undefined}
          />
          <main>{children}</main>
          <Footer
            logo={data.footer_logo?.url || undefined}
            description={data.footer_description || undefined}
            quickLinks={quickLinks.length ? quickLinks : undefined}
            pillars={pillarLinks.length ? pillarLinks : undefined}
            infoLinks={infoLinks.length ? infoLinks : undefined}
            legalLinks={legalLinks.length ? legalLinks : undefined}
            copyright={data.copyright || undefined}
          />
        </ToastProvider>
        <MotionEffects />
        {repositoryName && <PrismicPreview repositoryName={repositoryName} />}
      </body>
    </html>
  );
}
