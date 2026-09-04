"use client";

import type { CSSProperties } from "react";
import { AnimatedCounter } from "@/components/sections/hero/AnimatedCounter";
import { type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export interface SlideAnim {
  itemClass: string;
  delay: (ms: number) => CSSProperties | undefined;
}

export function CheckCircleMono({ className }: { className?: string }) {
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

export function MarkMono({ className }: { className?: string }) {
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

export function SlideTitle({ locale, anim }: { locale: Locale; anim?: SlideAnim }) {
  const t = getDictionary(locale);
  const ic = anim?.itemClass ?? "";
  return (
    <div className="flex flex-col gap-24">
      <h1
        className={`text-h1-sm md:text-h1-md lg:text-h1 ${ic}`}
        style={anim?.delay(100)}
      >
        {t.hero.titleLine1}
        <br />
        {t.hero.titleLine2}
      </h1>
      <p
        className={`text-body text-secondary md:text-title-m lg:text-title-l ${ic}`}
        style={anim?.delay(250)}
      >
        {t.hero.subtitle}
      </p>
    </div>
  );
}

export function SlideStats({
  locale,
  anim,
  counterTarget,
  counterOnce = false,
}: {
  locale: Locale;
  anim?: SlideAnim;
  counterTarget: (num: number) => number;
  counterOnce?: boolean;
}) {
  const t = getDictionary(locale);
  const ic = anim?.itemClass ?? "";
  return (
    <div className="flex flex-col items-center gap-40 lg:items-start lg:gap-56">
      <div className="flex flex-wrap items-center justify-center gap-32 lg:justify-start lg:gap-80">
        {t.hero.stats.map((s, idx) => {
          const raw = s.value.replace(/\s/g, "");
          const match = raw.match(/^(\d+)(\+?)$/);
          const num = match ? parseInt(match[1], 10) : 0;
          const suffix = match?.[2] ?? "";
          return (
            <div
              key={s.label}
              className={`flex flex-col items-center gap-8 text-center lg:items-start lg:text-left ${ic}`}
              style={anim?.delay(idx * 120)}
            >
              <span className="text-h4 lg:text-h3">
                <AnimatedCounter
                  target={counterTarget(num)}
                  suffix={suffix}
                  duration={1500}
                  once={counterOnce}
                />
              </span>
              <span className="text-caption uppercase text-secondary">{s.label}</span>
            </div>
          );
        })}
      </div>
      <span className={`text-title-m uppercase lg:text-h4 ${ic}`} style={anim?.delay(360)}>
        {t.hero.partner}
      </span>
    </div>
  );
}

export function SlideProblems({ locale, anim }: { locale: Locale; anim?: SlideAnim }) {
  const t = getDictionary(locale);
  const ic = anim?.itemClass ?? "";
  return (
    <div className="flex flex-col gap-40">
      <h2 className={`text-h5 lg:text-h3 ${ic}`} style={anim?.delay(0)}>
        {t.hero.startTitle}
      </h2>

      <div className="grid gap-40 md:grid-cols-2 md:gap-32">
        <div className={`flex flex-col gap-24 ${ic}`} style={anim?.delay(120)}>
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

        <div className={`flex flex-col gap-24 ${ic}`} style={anim?.delay(240)}>
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
  );
}