"use client";

import { useEffect, useState } from "react";
import { AnimatedCounter } from "@/components/sections/hero/AnimatedCounter";
import { Icon } from "@/components/ui/Icon";
import { type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import type { ReactNode } from "react";


const SLIDES = 3;
const AUTOPLAY_MS = 6000;

// ... (CheckCircleMono та MarkMono залишаються без змін)

interface InfoSliderProps {
  locale: Locale;
  revealed: boolean;
  cta?: ReactNode;
}


function CheckCircleMono({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 1.875C5.512 1.875 1.875 5.512 1.875 10S5.512 18.125 10 18.125 18.125 14.488 18.125 10 14.488 1.875 10 1.875Zm3.53 6.03a.75.75 0 0 0-1.06-1.06L9.25 10.065 8.03 8.845a.75.75 0 1 0-1.06 1.06l1.75 1.75a.75.75 0 0 0 1.06 0l3.75-3.75Z"
      />
    </svg>
  );
}

function MarkMono({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 2.5A1.5 1.5 0 0 0 2.5 4v12A1.5 1.5 0 0 0 4 17.5h12a1.5 1.5 0 0 0 1.5-1.5V4A1.5 1.5 0 0 0 16 2.5H4Zm6 3.1a.9.9 0 0 1 .9.9v4.2a.9.9 0 1 1-1.8 0V6.5a.9.9 0 0 1 .9-.9Zm0 8.9a1.1 1.1 0 1 0 0-2.2 1.1 1.1 0 0 0 0 2.2Z"
      />
    </svg>
  );
}

export function InfoSlider({ locale, revealed, cta }: InfoSliderProps) {
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const t = getDictionary(locale);

  // Відстеження ширини екрана
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1025);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setActive((p) => (p + 1) % SLIDES), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [active]);

  const slideClass = (i: number) =>
    `lg:[grid-area:1/1] lg:w-full lg:self-center transition-opacity duration-700 ${
      active === i ? "lg:opacity-100" : "lg:pointer-events-none lg:opacity-0"
    }`;

  const itemClass = (i: number) =>
    !revealed ? "opacity-0" : active === i ? "lg:animate-fade-up" : "";

  const delayStyle = (i: number, ms: number) =>
    revealed && active === i ? { animationDelay: `${ms}ms` } : undefined;

  return (
    <div className="relative w-full">
      <div className="flex flex-col gap-56 lg:grid lg:gap-0 lg:pr-80">
        {/* Слайд 1: заголовок + підзаголовок */}
        <div className={slideClass(0)}>
          <div className="flex flex-col gap-24">
            <h1
              className={`text-h1-sm md:text-h1-md lg:text-h1 ${itemClass(0)}`}
              style={delayStyle(0, 100)}
            >
              {t.hero.titleLine1}
              <br />
              {t.hero.titleLine2}
            </h1>
            <p
              className={`text-body text-secondary md:text-title-m lg:text-title-l ${itemClass(0)}`}
              style={delayStyle(0, 250)}
            >
              {t.hero.subtitle}
            </p>
          </div>
        </div>
        
         {/* CTA-кнопки на мобільних: одразу після заголовка */}
        {cta && <div className="lg:hidden">{cta}</div>}

        {/* Слайд 2: статистика + партнер */}
        <div className={slideClass(1)}>
          <div className="flex flex-col items-center gap-40 lg:items-start lg:gap-56">
            <div className="flex flex-wrap items-center justify-center gap-16 lg:justify-start lg:gap-80">
              {t.hero.stats.map((s, idx) => {
                const raw = s.value.replace(/\s/g, "");
                const match = raw.match(/^(\d+)(\+?)$/);
                const num = match ? parseInt(match[1], 10) : 0;
                const suffix = match?.[2] ?? "";

                return (
                  <div
                    key={s.label}
                    className={`flex flex-col items-center gap-8 text-center lg:items-start lg:text-left ${itemClass(1)}`}
                    style={delayStyle(1, idx * 120)}
                  >
                    <span className="text-h4 lg:text-h3">
                      <AnimatedCounter
                        target={isMobile ? num : active === 1 ? num : 0}
                        suffix={suffix}
                        duration={1500}
                        once={isMobile}
                      />
                    </span>
                    <span className="text-caption uppercase text-secondary">
                      {s.label}
                    </span>
                  </div>
                );
              })}
            </div>
            <span
              className={`text-title-m uppercase lg:text-h4 ${itemClass(1)}`}
              style={delayStyle(1, 360)}
            >
              {t.hero.partner}
            </span>
          </div>
        </div>

        {/* Слайд 3: проблеми / рішення */}
        <div className={slideClass(2)}>
          <div className="flex flex-col gap-40">
            <h2
              className={`text-h5 lg:text-h3 ${itemClass(2)}`}
              style={delayStyle(2, 0)}
            >
              {t.hero.startTitle}
            </h2>

            <div className="grid gap-40 md:grid-cols-2 md:gap-32">
              <div className={`flex flex-col gap-24 ${itemClass(2)}`} style={delayStyle(2, 120)}>
                <div className="flex h-36 items-center gap-8 rounded-full bg-primary px-16 text-on-dark">
                  <MarkMono className="h-16 w-16 shrink-0" />
                  <span className="text-body">{t.hero.problemsTitle}</span>
                </div>
                <ul className="flex flex-col gap-12">
                  {t.hero.problems.map((p) => (
                    <li key={p} className="flex items-start gap-16">
                      <img
                        src="/icons/mark-icon.svg"
                        alt=""
                        width={20}
                        height={20}
                        className="mt-2 h-20 w-20 shrink-0"
                      />
                      <span className="text-body text-secondary">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`flex flex-col gap-24 ${itemClass(2)}`} style={delayStyle(2, 240)}>
                <div className="flex h-36 items-center gap-8 rounded-full bg-primary px-16 text-on-dark">
                  <CheckCircleMono className="h-16 w-16 shrink-0" />
                  <span className="text-body">{t.hero.solutionsTitle}</span>
                </div>
                <ul className="flex flex-col gap-12">
                  {t.hero.solutions.map((s) => (
                    <li key={s} className="flex items-start gap-16">
                      <img
                        src="/icons/checkCircle-icon.svg"
                        alt=""
                        width={20}
                        height={20}
                        className="mt-2 h-20 w-20 shrink-0"
                      />
                      <span className="text-body text-primary">{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Вертикальна пагінація (лише десктоп) */}
      <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-16 lg:flex">
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