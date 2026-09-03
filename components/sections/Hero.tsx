"use client";

import { useEffect, useState } from "react"; // ← нове: додався useEffect
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

export function Hero({ locale }: { locale: Locale }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [revealed, setRevealed] = useState(false); // ← нове: стан "прелоадер завершився"
  const t = getDictionary(locale);

  // ← нове: слухаємо подію від Preloader
  useEffect(() => {
    const onDone = () => setRevealed(true);
    window.addEventListener("preloader:finish", onDone, { once: true });
    return () => window.removeEventListener("preloader:finish", onDone);
  }, []);

  return (
    <section className="relative flex h-dvh w-full">
      <div className="flex h-full w-1/2 flex-col justify-between px-160 py-80">
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

        <div className="flex flex-col items-start gap-40">
          <div className="flex flex-col gap-24">
            {/* ← нове: клас анімації вмикається лише після revealed */}
            <h1
              className={`text-h1 ${revealed ? "animate-fade-up" : "opacity-0"}`}
              style={{ animationDelay: "100ms" }}
            >
              {t.hero.titleLine1}
              <br />
              {t.hero.titleLine2}
            </h1>
            <p
              className={`text-title-l text-secondary ${revealed ? "animate-fade-up" : "opacity-0"}`}
              style={{ animationDelay: "250ms" }}
            >
              {t.hero.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-16">
            <Button variant="ghost" icon="download" href={CATALOG_URL}>
              {t.hero.catalog}
            </Button>
            <Button variant="primary" icon="whatsapp" href={WHATSAPP_URL}>
              {t.hero.beratung}
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-16">
          <IconButton icon="instagram" label="Instagram" href={INSTAGRAM_URL} />
          <IconButton icon="whatsapp" label="WhatsApp" href={WHATSAPP_URL} />
          <span className="text-subtitle text-secondary">{t.hero.contact}</span>
        </div>
      </div>

      <div className="h-full w-1/2">
        <HeroSlider locale={locale} />
      </div>

      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} locale={locale} />
    </section>
  );
}