"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const MIN_VISIBLE = 1800;
const EXIT = 700;

export function Preloader() {
  const [stage, setStage] = useState<"in" | "out" | "done">("in");

  useEffect(() => {
    document.body.style.overflow = "hidden";

    let finished = false;
    const start = Date.now();

    const reveal = () => {
      if (finished) return;
      finished = true;
      const wait = Math.max(0, MIN_VISIBLE - (Date.now() - start));

      window.setTimeout(() => {
        setStage("out");
        document.body.style.overflow = "";
        window.setTimeout(
          () => window.dispatchEvent(new Event("preloader:finish")),
          300
        );
      }, wait);

      window.setTimeout(() => setStage("done"), wait + EXIT);
    };

    if (document.readyState === "complete") reveal();
    else window.addEventListener("load", reveal, { once: true });

    const fallback = window.setTimeout(reveal, 3000);

    return () => {
      window.clearTimeout(fallback);
      window.removeEventListener("load", reveal);
      document.body.style.overflow = "";
    };
  }, []);

  if (stage === "done") return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-100 flex flex-col items-center justify-center bg-surface-dark transition-transform duration-700 ease-premium ${
        stage === "out" ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="preloader-logo">
        {/* Шар 1: приглушені темні смуги */}
        <Image
          src="/logo.png"
          alt=""
          fill
          priority
          className="object-contain opacity-30 grayscale"
        />

        {/* Шар 2: кольорове лого, що проявляється за променем */}
        <Image
          src="/logo.png"
          alt="Netronic Fun"
          fill
          priority
          className="animate-preloader-reveal object-contain"
        />

        {/* Лазерний промінь */}
        <span className="preloader-beam animate-preloader-beam" />
      </div>

      <p className="preloader-signature animate-preloader-signature">
        Netronic Fun
      </p>
    </div>
  );
}