// app/layout.tsx
import './globals.css';
import { type Metadata } from 'next';
import { Inter, Orbitron } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import GlitchingEffect from '@/components/ui/glitching-effect';
import Header from '@/components/layout/header';
import Null404EasterEgg from '@/components/ui/null404-easter-egg';
import { Toaster } from "sonner";
import { AuthProvider } from '@/contexts/AuthContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
});

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  weight: ['400', '500', '600', '700', '900'],
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Guild 00:00 | Information Brokers',
  description: 'A guild that trades in secrets, spying, and information gathering.',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${orbitron.variable} font-sans antialiased overflow-x-hidden min-h-screen`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <AuthProvider>
          <GlitchingEffect />
          <div className="relative min-h-screen bg-black">
            <div className="fixed inset-0 bg-[url('/images/grid-pattern.png')] bg-repeat opacity-10 z-0" />
            <div className="fixed inset-0 bg-gradient-to-b from-transparent to-background/80 z-0" />
            <Null404EasterEgg />
            <Header />
            <main className="relative z-10">{children}</main>
          </div>
          <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}