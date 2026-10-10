"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = [
  {
    id: "support",
    label: "Event Support",
    desc: "Perlengkapan operasional di lokasi acara dari stok kami sendiri, dikirim dan diambil kembali sesuai jadwal.",
    primary: true,
    glow: "rgba(255,255,255,0.14)",
    preview: [
      "HT UHF",
      "Standing Signage",
      "Bar Stool",
      "Printer",
      "Foldable Trolley",
      "Canal Cable",
      "Air Cooler",
      "APAR",
    ],
  },
  {
    id: "sound",
    label: "Sound System",
    desc: "Audio untuk berbagai skala acara, dikoordinasikan lewat rekanan terpercaya kami.",
    primary: false,
    glow: "rgba(147,197,253,0.18)",
    preview: [],
  },
  {
    id: "led",
    label: "LED Screen",
    desc: "Layar LED indoor dan outdoor, dikoordinasikan lewat rekanan terpercaya kami.",
    primary: false,
    glow: "rgba(196,181,253,0.18)",
    preview: [],
  },
];

function onMove(e: React.MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
}

export default function EquipmentSection() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
  const ctx = gsap.context(() => {
    // pakai from (bukan set + to)
    gsap.from(".eq-word", {
      yPercent: 110,
      duration: 0.9,
      stagger: 0.07,
      ease: "power4.out",
      scrollTrigger: { trigger: ".eq-heading", start: "top 85%", once: true },
    });

    gsap.from(".eq-fade", {
      y: 20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: { trigger: ".eq-heading", start: "top 85%", once: true },
    });

    // panel: tetap set + batch (batch butuh state awal)
    gsap.set(".eq-panel", { y: 80, opacity: 0 });
    ScrollTrigger.batch(".eq-panel", {
      start: "top 90%",
      once: true,
      onEnter: (els) =>
        gsap.to(els, { y: 0, opacity: 1, duration: 1, stagger: 0.14, ease: "power3.out" }),
    });
  }, root);

  // hitung ulang posisi setelah font dan semua resource siap
  const refresh = () => ScrollTrigger.refresh();
  document.fonts?.ready.then(refresh);
  window.addEventListener("load", refresh);

  return () => {
    window.removeEventListener("load", refresh);
    ctx.revert();
  };
}, []);

  const heading = "Perlengkapan event yang siap pakai".split(" ");

  return (
    <section
      ref={root}
      id="equipment"
      className="relative scroll-mt-40 bg-neutral-950 px-6 py-28 text-white md:py-40"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="eq-heading mb-16 flex flex-col gap-8 md:mb-20 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="eq-fade mb-1 text-sm font-medium uppercase tracking-[0.2em] text-white/50">
              What we provide
            </p>
            <h2 className="text-4xl font-semibold leading-[1.30] tracking-tight md:text-6xl">
              {heading.map((w, i) => (
                <span key={i} className="mr-[0.10em] inline-block overflow-hidden align-bottom">
                  <span className="eq-word inline-block">{w}</span>
                </span>
              ))}
            </h2>
          </div>
        </div>

        {/* Panels */}
        <div className="flex flex-col gap-4 lg:h-[34rem] lg:flex-row">
          {CATEGORIES.map((c, i) => {
            const isActive = active === i;
            return (
              <Link
                key={c.id}
                href={`/catalog?category=${c.id}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onMouseMove={onMove}
                // di layar sentuh: tap pertama membuka panel, tap kedua pindah halaman
                onClick={(e) => {
                  if (!isActive && window.matchMedia("(min-width: 1024px)").matches) {
                    e.preventDefault();
                    setActive(i);
                  }
                }}
                className={`eq-panel group relative flex min-h-[24rem] flex-col overflow-hidden rounded-3xl border bg-white/[0.03] transition-[flex-grow,border-color] duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] lg:min-h-0 lg:basis-0 ${
                  isActive
                    ? "border-white/25 lg:grow-[3.4]"
                    : "border-white/10 lg:grow-[1]"
                }`}
              >
                {/* glow ikut kursor */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(480px circle at var(--x, 50%) var(--y, 50%), ${c.glow}, transparent 60%)`,
                  }}
                />

                {/* grid halus */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.07]"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)",
                    backgroundSize: "32px 32px",
                    maskImage: "linear-gradient(to bottom, transparent, #000 70%)",
                    WebkitMaskImage: "linear-gradient(to bottom, transparent, #000 70%)",
                  }}
                />

                {/* nomor besar */}
                <span
                  className={`pointer-events-none absolute right-5 top-2 select-none text-[9rem] font-bold leading-none transition-all duration-700 ${
                    isActive ? "text-white/[0.06]" : "text-white/[0.03]"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* ───── STRIP (panel tidak aktif, desktop saja) ───── */}
                <div
                  className={`absolute inset-0 hidden flex-col items-center justify-between py-8 transition-opacity duration-500 lg:flex ${
                    isActive ? "pointer-events-none opacity-0" : "opacity-100 delay-300"
                  }`}
                >
                  <span className="text-sm font-medium text-white/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-2xl font-semibold tracking-tight text-white/80 [writing-mode:vertical-rl] rotate-180">
                    {c.label}
                  </span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white/40"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </div>

                {/* ───── KONTEN (panel aktif; di mobile selalu tampil) ───── */}
                <div
                    className={`relative flex h-full flex-col justify-end p-7 transition-opacity duration-500 md:p-8 lg:w-[34rem] lg:shrink-0 ${
                        isActive
                        ? "lg:opacity-100 lg:delay-300"
                        : "lg:pointer-events-none lg:opacity-0"
                    }`}
                >
                  {/* {c.primary ? (
                    <span className="w-fit rounded-full bg-white px-3 py-1 text-xs font-semibold text-black">
                      Main Item
                    </span>
                  ) : (
                    <span className="w-fit rounded-full bg-white px-3 py-1 text-xs font-semibold text-black">
                      Sewa
                    </span>
                  )} */}

                  <div>
                    {c.preview.length > 0 && (
                      <div className="mb-6 flex flex-wrap gap-2">
                        {c.preview.map((p, k) => (
                          <span
                            key={p}
                            style={{ transitionDelay: isActive ? `${450 + k * 45}ms` : "0ms" }}
                            className={`rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/70 transition-all duration-500 ${
                              isActive
                                ? "lg:translate-y-0 lg:opacity-100"
                                : "lg:translate-y-3 lg:opacity-0"
                            }`}
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                    )}

                    <h3 className="text-4xl font-semibold tracking-tight md:text-5xl">
                      {c.label}
                    </h3>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-white/55 md:text-base">
                      {c.desc}
                    </p>

                    <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-white/20 py-2 pl-5 pr-2 text-sm font-medium text-white transition-colors group-hover:border-white/50">
                      Lihat katalog
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black transition-transform duration-300 group-hover:rotate-45">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M7 17L17 7M8 7h9v9" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}