"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  duration?: number;
  className?: string;
  once?: boolean;
}

export function AnimatedCounter({
  target,
  suffix = "",
  duration = 1500,
  className,
  once = false,
}: AnimatedCounterProps) {
  const [value, setValue] = useState(0);
  const rafId = useRef<number | null>(null);
  const startedAt = useRef<number | null>(null);
  const hasAnimated = useRef(false);

  const formatNumber = (n: number) => {
    return n.toLocaleString("de-DE").replace(/\u202F/g, " ").replace(/\./g, " ");
  };

  useEffect(() => {
    // Якщо once=true і вже анімувалось — показуємо фінальне значення
    if (once && hasAnimated.current) {
      setValue(target);
      return;
    }

    setValue(0);
    startedAt.current = null;
    if (rafId.current) cancelAnimationFrame(rafId.current);

    if (target === 0) return;

    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

    const step = (now: number) => {
      if (!startedAt.current) startedAt.current = now;
      const elapsed = now - startedAt.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuart(progress);
      const current = Math.round(eased * target);

      setValue(current);

      if (progress < 1) {
        rafId.current = requestAnimationFrame(step);
      } else if (once) {
        hasAnimated.current = true;
      }
    };

    rafId.current = requestAnimationFrame(step);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [target, duration, once]);

  return (
    <span className={className}>
      {formatNumber(value)}
      {suffix ? ` ${suffix}` : ""}
    </span>
  );
}