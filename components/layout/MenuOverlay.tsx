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
      className={`fixed inset-0 z-50 flex flex-col bg-surface-dark px-160 py-80 transition-opacity duration-500 ${
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

      <nav className="flex flex-1 flex-col items-center justify-center gap-36">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.path}
            href={`/${locale}${item.path === "/" ? "" : item.path}`}
            onClick={onClose}
            className="text-menu text-on-dark transition-colors hover:text-on-dark-soft"
          >
            {t.menu[item.key]}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-16">
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
        <span className="text-subtitle text-on-dark-soft">{t.hero.contact}</span>
      </div>
    </div>
  );
}