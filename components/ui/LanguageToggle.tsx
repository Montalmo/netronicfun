"use client";

import { usePathname, useRouter } from "next/navigation";
import { type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

interface LanguageToggleProps {
  locale: Locale;
  variant?: "light" | "dark";
}

export function LanguageToggle({ locale, variant = "light" }: LanguageToggleProps) {
  const router = useRouter();
  const pathname = usePathname();
  const t = getDictionary(locale);

  const nextLocale: Locale = locale === "de" ? "en" : "de";

  const switchLocale = () => {
    const segments = pathname.split("/");
    segments[1] = nextLocale;
    router.replace("/" + segments.slice(1).join("/"));
  };

  const labelColor = variant === "dark" ? "text-on-dark-soft" : "text-secondary";
  const buttonColor =
    variant === "dark"
      ? "border-on-dark-soft/40 text-on-dark hover:bg-on-dark/10"
      : "border-line text-primary hover:bg-ghost";

  return (
    <div className="flex items-center gap-16">
      <span className={`text-subtitle ${labelColor}`}>{t.language.label}</span>
      <button
        type="button"
        aria-label={t.language.switch}
        onClick={switchLocale}
        className={`flex h-56 w-56 cursor-pointer items-center justify-center rounded-full border bg-transparent text-subtitle transition-colors ${buttonColor}`}
      >
        {locale.toUpperCase()}
      </button>
    </div>
  );
}