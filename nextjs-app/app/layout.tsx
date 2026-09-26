import type { Metadata } from 'next';
import { DM_Sans, Outfit } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MotionEffects from '@/components/MotionEffects';
import { ToastProvider } from '@/components/ToastProvider';

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
          <Header />
          <main>{children}</main>
          <Footer />
        </ToastProvider>
        <MotionEffects />
      </body>
    </html>
  );
}
