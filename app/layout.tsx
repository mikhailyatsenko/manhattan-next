import type { Metadata } from "next";
import { Source_Serif_4 } from "next/font/google";
import "./globals.css";
import "./App.scss";

const sourceSerif = Source_Serif_4({
  subsets: ["latin", "cyrillic"],
  weight: ["200", "300", "400", "500", "600"],
  display: "swap",
  variable: "--font-source-serif",
});

export const metadata: Metadata = {
  title: 'Студия красоты "Манхэттен beauty bar"',
  description:
    "Ногтевая студия в Москве, ТЦ «Триумфальный» (м. Профсоюзная, м. Университет). Маникюр и педикюр: классический, аппаратный, комбинированный, моделирование искусственных ногтей и многое другое.",
  keywords: [
    "маникюр",
    "педикюр",
    "ногтевая студия",
    "Москва",
    "Триумфальный",
    "Профсоюзная",
  ],
  openGraph: {
    title: 'Студия красоты "Манхэттен beauty bar"',
    description: "Ногтевая студия в Москве, ТЦ «Триумфальный»",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-icon-180x180.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="preload"
          as="image"
          href="img/slide-1.webp"
          fetchPriority="high"
        />
      </head>
      <body className={sourceSerif.className}>{children}</body>
    </html>
  );
}
