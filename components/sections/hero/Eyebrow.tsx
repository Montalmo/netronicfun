"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export function Eyebrow({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const brandRef = useRef<HTMLSpanElement>(null);
  const cityRef = useRef<HTMLSpanElement>(null);
  const countryRef = useRef<HTMLSpanElement>(null);
  const [hiddenDots, setHiddenDots] = useState<[boolean, boolean]>([false, false]);

  useLayoutEffect(() => {
    const check = () => {
      const brand = brandRef.current?.offsetTop ?? 0;
      const city = cityRef.current?.offsetTop ?? 0;
      const country = countryRef.current?.offsetTop ?? 0;
      setHiddenDots([city > brand, country > city]);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [locale]);

  return (
    <div className="flex flex-wrap items-center justify-center gap-16 text-caption uppercase text-primary lg:justify-start">
      <span ref={brandRef} className="whitespace-nowrap">
        {t.hero.eyebrowBrand}
      </span>

      <span aria-hidden="true" className={hiddenDots[0] ? "hidden" : undefined}>
        •
      </span>

      <span ref={cityRef} className="whitespace-nowrap">
        {t.hero.eyebrowCity}
      </span>

      <span aria-hidden="true" className={hiddenDots[1] ? "hidden" : undefined}>
        •
      </span>

      {/* Прапор + країна — неподільний блок */}
      <span
        ref={countryRef}
        className="inline-flex items-center gap-16 whitespace-nowrap"
      >
        <img
          src="/icons/germany-flag.svg"
          alt=""
          width={24}
          height={16}
          className="h-16 w-24"
        />
        <span>{t.hero.eyebrowCountry}</span>
      </span>
    </div>
  );
}