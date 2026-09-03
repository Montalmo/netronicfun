"use client";

import Link from "next/link";
import { IconButton } from "@/components/ui/IconButton";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

const INSTAGRAM_URL = "https://www.instagram.com/lasertagnetronicfun";
const WHATSAPP_URL = "https://wa.me/491778522174";

const NAV_ITEMS: {
  key: "home" | "geraete" | "geschaeftsmodell" | "schluesselfertig" | "ueberUns" | "kontakt";
  path: string;
}[] = [
  { key: "home", path: "/" },
  { key: "geraete", path: "/geraete" },
  { key: "geschaeftsmodell", path: "/geschaeftsmodell" },
  { key: "schluesselfertig", path: "/schluesselfertig" },
  { key: "ueberUns", path: "/ueber-uns" },
  { key: "kontakt", path: "/kontakt" },
];

interface MenuOverlayProps {
  open: boolean;
  onClose: () => void;
  locale: Locale;
}

export function MenuOverlay({ open, onClose, locale }: MenuOverlayProps) {
  const t = getDictionary(locale);

  return (
    <div
      aria-hidden={!open}
      className={`fixed inset-0 z-50 flex flex-col bg-surface-dark px-16 py-16 transition-opacity duration-500 sm:px-32 sm:py-32 md:px-40 md:py-40 lg:px-80 lg:py-80 3xl:px-160 ${
        open ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-16">
          <IconButton
            icon="x"
            label={t.menu.close}
            variant="outline-dark"
            onClick={onClose}
          />
          <span className="text-subtitle text-on-dark-soft">{t.menu.close}</span>
        </div>
        <LanguageToggle locale={locale} variant="dark" />
      </div>

      <nav className="flex flex-1 flex-col items-center justify-center gap-24 md:gap-36">
        {NAV_ITEMS.map((item, index) => (
          <Link
            key={item.path}
            href={`/${locale}${item.path === "/" ? "" : item.path}`}
            onClick={onClose}
            style={open ? { animationDelay: `${120 + index * 70}ms` } : undefined}
            className={`text-h5 text-on-dark transition-colors hover:text-on-dark-soft md:text-menu ${
              open ? "animate-menu-item" : "opacity-0"
            }`}
          >
            {t.menu[item.key]}
          </Link>
        ))}
      </nav>

      <div className="flex items-center justify-center gap-16 lg:justify-start">
        <IconButton
          icon="instagram"
          label="Instagram"
          variant="outline-dark"
          href={INSTAGRAM_URL}
        />
        <IconButton
          icon="whatsapp"
          label="WhatsApp"
          variant="outline-dark"
          href={WHATSAPP_URL}
        />
        <span className="hidden text-subtitle text-on-dark-soft sm:block">
          {t.hero.contact}
        </span>
      </div>
    </div>
  );
}