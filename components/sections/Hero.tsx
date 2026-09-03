"use client";

import { useEffect, useState } from "react";
import { MenuOverlay } from "@/components/layout/MenuOverlay";
import { HeroSlider } from "@/components/sections/hero/HeroSlider";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

const INSTAGRAM_URL = "https://www.instagram.com/lasertagnetronicfun";
const WHATSAPP_URL = "https://wa.me/491778522174";
const CATALOG_URL = "/downloads/netronic-katalog-2026.pdf";

const SECTION_PADDING =
  "px-16 py-16 sm:px-32 sm:py-32 md:px-40 md:py-40 lg:px-80 lg:py-80 3xl:px-160";

export function Hero({ locale }: { locale: Locale }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const t = getDictionary(locale);

  useEffect(() => {
    const onDone = () => setRevealed(true);
    window.addEventListener("preloader:finish", onDone, { once: true });
    return () => window.removeEventListener("preloader:finish", onDone);
  }, []);

  return (
    <section className="relative w-full lg:flex lg:h-dvh">
      {/* Ліва колонка */}
      <div
        className={`flex flex-col gap-40 lg:h-full lg:w-1/2 lg:justify-between lg:gap-0 ${SECTION_PADDING}`}
      >
        {/* Топбар */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-16">
            <IconButton
              icon="menu"
              label={t.menu.open}
              onClick={() => setMenuOpen(true)}
            />
            <span className="text-subtitle text-secondary">{t.menu.label}</span>
          </div>
          <LanguageToggle locale={locale} />
        </div>

        {/* Центр */}
        <div className="flex flex-col items-center gap-40 text-center lg:items-start lg:gap-56 lg:text-left">
          <div className="flex flex-wrap items-center justify-center gap-16 text-caption uppercase text-primary lg:justify-start">
            <span>{t.hero.eyebrowBrand}</span>
            <span aria-hidden="true">•</span>
            <span>{t.hero.eyebrowCity}</span>
            <span aria-hidden="true">•</span>
            <img
              src="/icons/germany-flag.svg"
              alt=""
              width={24}
              height={16}
              className="h-16 w-24"
            />
            <span>{t.hero.eyebrowCountry}</span>
          </div>

          <div className="flex flex-col items-center gap-24 lg:items-start">
            <h1
              className={`text-h1-sm md:text-h1-md lg:text-h1 ${
                revealed ? "animate-fade-up" : "opacity-0"
              }`}
              style={{ animationDelay: "100ms" }}
            >
              {t.hero.titleLine1}
              <br />
              {t.hero.titleLine2}
            </h1>
            <p
              className={`text-body text-secondary md:text-title-m lg:text-title-l ${
                revealed ? "animate-fade-up" : "opacity-0"
              }`}
              style={{ animationDelay: "250ms" }}
            >
              {t.hero.subtitle}
            </p>
          </div>

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
        </div>

        {/* Соцмережі */}
        <div className="flex flex-col items-center gap-24 lg:flex-row lg:gap-16">
          <div className="flex items-center gap-16">
            <IconButton icon="instagram" label="Instagram" href={INSTAGRAM_URL} />
            <IconButton icon="whatsapp" label="WhatsApp" href={WHATSAPP_URL} />
          </div>
          <span className="hidden text-subtitle text-secondary sm:block">{t.hero.contact}</span>
        </div>
      </div>

      {/* Слайдер */}
      <div className="lg:h-full lg:w-1/2">
        <HeroSlider locale={locale} />
      </div>

      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} locale={locale} />
    </section>
  );
}