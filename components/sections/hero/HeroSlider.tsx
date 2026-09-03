"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

const SLIDES = [1, 2, 3, 4, 5, 6];
const AUTOPLAY_MS = 3000;

export function HeroSlider({ locale }: { locale: Locale }) {
  const [active, setActive] = useState(0);
  const t = getDictionary(locale);

  useEffect(() => {
    const id = setInterval(
      () => setActive((prev) => (prev + 1) % SLIDES.length),
      AUTOPLAY_MS
    );
    return () => clearInterval(id);
  }, [active]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {SLIDES.map((slide, index) => (
        <div
          key={slide}
          aria-hidden={index !== active}
          className={`absolute inset-0 transition-opacity duration-700 ease-out ${
            index === active ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={`/images/hero/slide-${slide}.jpg`}
            alt={t.hero.slideAlt}
            fill
            sizes="50vw"
            priority={index === 0}
            className="object-cover"
          />
        </div>
      ))}

      <div className="absolute bottom-40 left-1/2 -translate-x-1/2">
  <div className="flex h-24 items-center gap-8 rounded-full bg-on-dark/40 px-16 backdrop-blur-md">
    {SLIDES.map((slide, index) => (
      <button
        key={slide}
        type="button"
        aria-label={`${t.hero.slideLabel} ${index + 1}`}
        onClick={() => setActive(index)}
        className={`h-8 w-8 cursor-pointer rounded-full transition-colors duration-300 ${
          index === active
            ? "bg-primary"
            : "bg-on-dark hover:bg-on-dark/70"
        }`}
      />
    ))}
  </div>
</div>
    </div>
  );
}