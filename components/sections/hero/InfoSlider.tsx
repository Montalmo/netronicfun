"use client";

import { useEffect, useState } from "react";
import {
  SlideProblems,
  SlideStats,
  SlideTitle,
  type SlideAnim,
} from "@/components/sections/hero/slides";
import { Icon } from "@/components/ui/Icon";
import { type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

const SLIDES = 3;
const AUTOPLAY_MS = 6000;

interface InfoSliderProps {
  locale: Locale;
  revealed: boolean;
}

export function InfoSlider({ locale, revealed }: InfoSliderProps) {
  const [active, setActive] = useState(0);
  const t = getDictionary(locale);

  useEffect(() => {
    const id = setInterval(() => setActive((p) => (p + 1) % SLIDES), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [active]);

  const slideClass = (i: number) =>
    `[grid-area:1/1] w-full self-center transition-opacity duration-700 ${
      active === i ? "opacity-100" : "pointer-events-none opacity-0"
    }`;

  const animFor = (i: number): SlideAnim => ({
    itemClass: !revealed ? "opacity-0" : active === i ? "animate-fade-up" : "",
    delay: (ms) =>
      revealed && active === i ? { animationDelay: `${ms}ms` } : undefined,
  });

  return (
    <div className="relative hidden w-full lg:block">
      <div className="grid gap-0 pr-80">
        <div className={slideClass(0)}>
          <SlideTitle locale={locale} anim={animFor(0)} />
        </div>
        <div className={slideClass(1)}>
          <SlideStats
            locale={locale}
            anim={animFor(1)}
            counterTarget={(n) => (active === 1 ? n : 0)}
          />
        </div>
        <div className={slideClass(2)}>
          <SlideProblems locale={locale} anim={animFor(2)} />
        </div>
      </div>

      {/* Вертикальна пагінація */}
      <div className="absolute right-0 top-1/2 flex -translate-y-1/2 flex-col items-center gap-16">
        <button
          type="button"
          aria-label={t.hero.sliderPrev}
          onClick={() => setActive((active + SLIDES - 1) % SLIDES)}
          className="flex h-32 w-32 cursor-pointer items-center justify-center rounded-full border border-line bg-transparent text-primary transition-colors hover:bg-ghost"
        >
          <Icon name="arrow-up" size={16} />
        </button>

        <div className="flex flex-col items-center gap-8">
          {Array.from({ length: SLIDES }, (_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`${i + 1}`}
              onClick={() => setActive(i)}
              className={`cursor-pointer rounded-full transition-all duration-300 ${
                i === active ? "h-8 w-8 bg-primary" : "h-6 w-6 bg-ghost hover:bg-ghost-hover"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          aria-label={t.hero.sliderNext}
          onClick={() => setActive((active + 1) % SLIDES)}
          className="flex h-32 w-32 cursor-pointer items-center justify-center rounded-full border border-line bg-transparent text-primary transition-colors hover:bg-ghost"
        >
          <Icon name="arrow-down" size={16} />
        </button>
      </div>
    </div>
  );
}