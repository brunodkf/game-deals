import type { Metadata } from "next";
import { Sora, Orbitron } from "next/font/google";
import "./globals.css";
import { GamesProvider } from "@/app/context/GamesContext";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
})

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
})

export const metadata: Metadata = {
  title: "CheapShark Game Deals Dashboard",
  description: "Dashboard de ofertas de jogos com filtros avançados, visual moderno e integração com a CheapShark API.",
  keywords: [
    "CheapShark",
    "Ofertas de jogos",
    "Game deals",
    "React",
    "Next.js",
    "Tailwind CSS",
    "Shadcn UI",
    "Dashboard de jogos",
    "Promoções de games",
    "CheapShark API"
  ],
  authors: [
    { name: "Bruno Furtado", url: "https://brunodkf.netlify.app/" }
  ],
  icons: {
    icon: "/icon.webp",
  },
  creator: "Bruno Furtado",
  openGraph: {
    title: "CheapShark Game Deals Dashboard",
    description:
      "Explore as melhores ofertas de jogos com visual moderno e filtros personalizados usando a CheapShark API.",
    url: "https://seu-dominio.com", // substitua com uma imagem real depois
    siteName: "CheapShark Game Deals",
    images: [
      {
        url: "https://seu-dominio.com/og-image.png", // substitua com uma imagem real depois
        width: 1200,
        height: 630,
        alt: "CheapShark Game Deals Dashboard",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body
        className={`${sora.variable} ${orbitron.variable} antialiased bg-[#2d2d2d] bg-gradient-to-br from-foreground text-branco`}
      >
        <GamesProvider>
          {children}
        </GamesProvider>
      </body>
    </html>
  );
}
