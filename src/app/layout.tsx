import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'YOKE Voltage Regulator | Automatic Voltage Stabilizer Manufacturer',
  description: 'YOKE Electric - Professional automatic voltage regulator (AVR) manufacturer. SVC series stabilizers for home and industrial use. Global shipping. Quality products at factory prices.',
  verification: {
    google: 'B8o4b_2zfT64y2bbOMBlBLBpyMsc01wKJKcB8HlUYTg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Root layout is minimal — middleware redirects to /en or /zh
  // The [locale] layout handles the actual HTML rendering
  return children;
}
