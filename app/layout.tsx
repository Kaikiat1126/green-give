import type { Metadata, Viewport  } from "next";
import { Inter as FontSans } from "next/font/google";
import '../styles/globals.css'
import { Toaster } from "@/components/ui/toaster"
import NavBar from "@/components/nav-bar";
import BottomNavBar from "@/components/bottom-nav-bar";

import { cn } from "@/lib/utils"
import { createClient } from "@/utils/supabase/server";
import { useUserStore } from "@/utils/zustand/zustand";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "GreenGive",
  description: "GreenGive PWA application with Next 13",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "nextjs13", "GreenGive", "pwa", "next-pwa"],
};

const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
}
export { viewport };

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  // const { setUser } = useUserStore();
  if (user) {
    // setUser(user);
  }

  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"></link>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"></link>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"></link>
      </head>
      <body className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}>
          { user ? <NavBar user={user} /> : null}
          {children}
          { user ? <BottomNavBar /> : null}
          <Toaster />
        </body>
    </html>
  );
}
