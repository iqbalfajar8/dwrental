"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Spotlight } from "@/components/ui/spotlight";
import Link from "next/link";


const LINES = ["Your Trusted Event", "Equipment Solutions"];

export default function Hero({ delay = 6 }: { delay?: number }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.set(".h-word", { yPercent: 110 });
      gsap.set(".h-fade", { y: 24, opacity: 0 });

      gsap
        .timeline({ delay, defaults: { ease: "power4.out" } })
        .to(".h-word", { yPercent: 0, duration: 1, stagger: 0.08 })
        .to(".h-fade", { y: 0, opacity: 1, duration: 0.9, stagger: 0.12 }, "-=0.5");
    }, root);

    return () => ctx.revert();
  }, [delay]);

  return (
    <section
      ref={root}
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-neutral-950 px-6 pt-24 antialiased"
    >
      {/* grid */}
      <div
        className="pointer-events-none absolute inset-0 select-none"
        style={{
          backgroundImage:
            "linear-gradient(to right,#171717 1px,transparent 1px),linear-gradient(to bottom,#171717 1px,transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 40%, #000 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 50% 40%, #000 30%, transparent 100%)",
        }}
      />

      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="white" delay={delay} />

      {/* fade ke section berikutnya */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-40 bg-gradient-to-t from-neutral-950 to-transparent" />

      {/* konten */}
      <div className="relative z-10 mx-auto w-full max-w-7xl p-4 text-center">
        <h1 className="text-4xl font-bold leading-[1.1] tracking-tight md:text-7xl">
          {LINES.map((line) => (
            <span key={line} className="block">
              {line.split(" ").map((w, i) => (
                <span
                  key={i}
                  className="mr-[0.25em] inline-block overflow-hidden pb-[0.12em] align-bottom"
                >
                  <span className="h-word inline-block bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-transparent">
                    {w}
                  </span>
                </span>
              ))}
            </span>
          ))}
        </h1>

        <p className="h-fade mx-auto mt-6 max-w-lg text-base text-neutral-300 md:text-lg">
          Sewa perlengkapan event untuk acara korporat dan komersial. Kami
          siapkan, kirim, dan kawal sampai acara selesai.
        </p>

        <div className="h-fade mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/catalog"
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5"
          >
            Lihat Katalog
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-white/50"
          >
            Hubungi Kami
          </Link>
        </div>
      </div>
    </section>
  );
}