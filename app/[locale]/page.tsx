import { Hero } from "@/components/sections/Hero";
import type { Locale } from "@/i18n/config";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <Hero locale={locale as Locale} />;
}