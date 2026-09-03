import type { Metadata } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { Preloader } from "@/components/ui/Preloader"; // ← новий імпорт
import { locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import "../globals.css";

const gillroy = localFont({
  src: [
    { path: "../fonts/Gilroy-Regular.woff", weight: "400", style: "normal" },
    { path: "../fonts/Gilroy-Medium.woff", weight: "500", style: "normal" },
  ],
  variable: "--font-gillroy",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getDictionary(locale as Locale);
  return { title: t.meta.title, description: t.meta.description };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) notFound();

  return (
    <html lang={locale} className={gillroy.variable}>
      <body className="antialiased">
        <Preloader /> {/* ← ось тут, першим елементом перед {children} */}
        {children}
      </body>
    </html>
  );
}