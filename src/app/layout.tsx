import type { Metadata } from "next"
import { Quicksand } from "next/font/google"
import { Navbar } from "@/components/navbar"
import { SidebarCart } from "@/components/sidebar-cart"
import { Footer } from "@/components/footer"
import { Toaster } from "sonner"
import { Providers } from "@/components/providers/Providers"
import "./globals.css"
import { ToogleDarkMode } from "@/components/dark-mode/toogle-dark-mode/ToogleDarkMode"
import ScrollToTop from "@/components/scroll-to-top/ScrollToTop"

const inter = Quicksand({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Coctelería Champotón",
  description: "Menú digital de cócteles y ensaladas de camarón",
  keywords: [
    "menú digital",
    "menú interactivo",
    "experiencia del cliente",
    "digital menu",
    "restaurant menu",
    "food delivery",
    "cócteles",
    "ensaladas",
    "cócteles de camarón",
    "cócteles de mariscos",
    "cócteles de caldos",
    "pescado frito",
    "mariscos",
    "caldos",
  ],
  authors: [
    {
      name: "David Hilera",
      url: "https://davidhilera.dev",
    },
  ]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <SidebarCart />
          {children}
          <ToogleDarkMode />
          <ScrollToTop />
          <Toaster position="bottom-right" richColors />
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
