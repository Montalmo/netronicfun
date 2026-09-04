"use client";

import { useEffect, useState } from "react";
import { MenuOverlay } from "@/components/layout/MenuOverlay";
import { Eyebrow } from "@/components/sections/hero/Eyebrow";
import { HeroSlider } from "@/components/sections/hero/HeroSlider";
import { InfoSlider } from "@/components/sections/hero/InfoSlider";
import {
  SlideProblems,
  SlideStats,
  SlideTitle,
} from "@/components/sections/hero/slides";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

const INSTAGRAM_URL = "https://www.instagram.com/lasertagnetronicfun";
const WHATSAPP_URL = "https://wa.me/491778522174";
const CATALOG_URL = "/downloads/netronic-catalog-de-2026.pdf";

function HeroTopbar({
  locale,
  onMenuOpen,
  fixed = false,
}: {
  locale: Locale;
  onMenuOpen: () => void;
  fixed?: boolean;
}) {
  const t = getDictionary(locale);
  return (
    <header
      className={
        fixed
          ? "fixed inset-x-0 top-0 z-40 bg-surface/80 backdrop-blur-md"
          : undefined
      }
    >
      <div
        className={`flex items-center justify-between ${
          fixed ? "px-16 py-16 sm:px-32 sm:py-32 md:px-40 md:py-40" : ""
        }`}
      >
        <div className="flex items-center gap-16">
          <IconButton icon="menu" label={t.menu.open} onClick={onMenuOpen} />
          <span className="text-subtitle text-secondary">{t.menu.label}</span>
        </div>
        <div className="flex items-center gap-16">
          <LanguageToggle locale={locale} />
          <IconButton
            icon="whatsapp"
            label="WhatsApp"
            variant="primary"
            href={WHATSAPP_URL}
            className="lg:hidden"
          />
        </div>
      </div>
    </header>
  );
}

function SocialRow({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <div className="flex flex-col items-center gap-24 lg:flex-row lg:gap-16">
      <div className="flex items-center gap-16">
        <IconButton icon="instagram" label="Instagram" href={INSTAGRAM_URL} />
        <IconButton icon="whatsapp" label="WhatsApp" href={WHATSAPP_URL} />
      </div>
      <span className="hidden text-subtitle text-secondary sm:block">
        {t.hero.contact}
      </span>
    </div>
  );
}

export function Hero({ locale }: { locale: Locale }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const t = getDictionary(locale);

  useEffect(() => {
    const onDone = () => setRevealed(true);
    window.addEventListener("preloader:finish", onDone, { once: true });
    return () => window.removeEventListener("preloader:finish", onDone);
  }, []);

  const ctaButtons = (
    <div className="flex w-full flex-col items-stretch gap-16 sm:w-auto sm:flex-row sm:items-center">
      <Button
        variant="ghost"
        icon="download"
        href={CATALOG_URL}
        className="w-full justify-center sm:w-auto"
      >
        {t.hero.catalog}
      </Button>
      <Button
        variant="primary"
        icon="whatsapp"
        href={WHATSAPP_URL}
        className="w-full justify-center sm:w-auto"
      >
        {t.hero.beratung}
      </Button>
    </div>
  );

  return (
    <section className="relative w-full">
      {/* ===== МОБІЛЬНІ / ПЛАНШЕТИ (<1025): стрічка в новому порядку ===== */}
      <div className="flex flex-col items-center gap-40 px-16 pb-16 pt-104 text-center sm:px-32 sm:pb-32 sm:pt-136 md:px-40 md:pb-40 md:pt-152 md:gap-56 lg:hidden">
        <HeroTopbar locale={locale} onMenuOpen={() => setMenuOpen(true)} fixed />

        <Eyebrow locale={locale} />

        <SlideTitle locale={locale} />

        {ctaButtons}

        {/* Слайдер зображень на всю ширину */}
        <div className="-mx-16 w-screen sm:-mx-32 md:-mx-40">
          <HeroSlider locale={locale} />
        </div>

        <SocialRow locale={locale} />

        <SlideStats
          locale={locale}
          counterTarget={(n) => n}
          counterOnce
        />

        <SlideProblems locale={locale} />
      </div>

      {/* ===== ДЕСКТОП (≥1025): без змін ===== */}
      <div className="hidden lg:flex lg:h-dvh">
        <div className="flex h-full w-1/2 flex-col justify-between px-80 py-80 3xl:px-160">
          <HeroTopbar locale={locale} onMenuOpen={() => setMenuOpen(true)} />

          <div className="flex flex-col items-start gap-56 text-left">
            <Eyebrow locale={locale} />
            <InfoSlider locale={locale} revealed={revealed} />
            {ctaButtons}
          </div>

          <SocialRow locale={locale} />
        </div>

        <div className="h-full w-1/2">
          <HeroSlider locale={locale} />
        </div>
      </div>

      <MenuOverlay
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        locale={locale}
      />
    </section>
  );
}