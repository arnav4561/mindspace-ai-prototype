import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from '@/contexts/AuthContext';
import AppLayout from '@/components/AppLayout';

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'MindSpace - Mental Wellness Platform',
  description: 'Your safe space to express, explore, and grow with AI-powered mental wellness tools',
  other: {
    'cache-control': 'no-cache, no-store, must-revalidate',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${geistMono.variable} antialiased bg-white min-h-screen`}>
        <AuthProvider>
          <AppLayout>
            {children}
          </AppLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
