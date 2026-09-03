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
    <div className="relative h-420 md:h-520 lg:h-full">
      {/* <1024: горизонтальна стрічка зі scroll-snap; ≥1024: crossfade-стопка */}
      <div className="flex h-full snap-x snap-mandatory gap-16 overflow-x-auto px-16 sm:px-32 md:px-40 lg:block lg:snap-none lg:gap-0 lg:overflow-visible lg:px-0">
        {SLIDES.map((slide, index) => (
          <div
            key={slide}
            aria-hidden={index !== active}
            className={`relative h-full w-[85%] shrink-0 snap-center transition-opacity duration-700 ease-out sm:w-[70%] md:w-[60%] lg:absolute lg:inset-0 lg:w-full ${
              index === active ? "lg:opacity-100" : "lg:opacity-0"
            }`}
          >
            <Image
              src={`/images/hero/slide-${slide}.jpg`}
              alt={t.hero.slideAlt}
              fill
              sizes="(max-width: 1023px) 85vw, 50vw"
              priority={index === 0}
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Пагінація лише на десктопі */}
      <div className="absolute bottom-80 left-1/2 hidden -translate-x-1/2 lg:block">
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