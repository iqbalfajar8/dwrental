"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  CATEGORIES,
  EQUIPMENT,
  type CategoryId,
  type EquipmentItem,
} from "@/data/equipment";
import { waLink } from "@/lib/whatsapp";
import PriceTag from "@/components/PriceTag";

type Filter = "all" | CategoryId;

const isFilter = (v: string | null): v is Filter =>
  v === "all" || CATEGORIES.some((c) => c.id === v);

function onMove(e: React.MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
}

const matches = (item: EquipmentItem, q: string) => {
  if (!q) return true;
  const hay = [item.title, item.desc, ...item.specs].join(" ").toLowerCase();
  return q
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => hay.includes(word));
};

export default function CatalogClient() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const catParam = params.get("category");
  const category: Filter = isFilter(catParam) ? catParam : "all";

  const [query, setQuery] = useState(params.get("q") ?? "");

  // sinkronkan search ke URL (debounce biar nggak spam history)
  useEffect(() => {
    const t = setTimeout(() => {
      const next = new URLSearchParams(params.toString());
      if (query.trim()) next.set("q", query.trim());
      else next.delete("q");
      const qs = next.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    }, 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const setCategory = (id: Filter) => {
    const next = new URLSearchParams(params.toString());
    if (id === "all") next.delete("category");
    else next.set("category", id);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  // item yang cocok dengan search (dipakai untuk hitung badge per kategori)
  const searched = useMemo(() => EQUIPMENT.filter((i) => matches(i, query)), [query]);
  const results = useMemo(
    () => (category === "all" ? searched : searched.filter((i) => i.category === category)),
    [searched, category]
  );

  const countFor = (id: Filter) =>
    id === "all" ? searched.length : searched.filter((i) => i.category === id).length;

  const tabs: { id: Filter; label: string; partner?: boolean }[] = [
    { id: "all", label: "Semua" },
    ...CATEGORIES,
  ];

  const activeCat = CATEGORIES.find((c) => c.id === category);

  return (
    <section className="mx-auto max-w-7xl px-6 pb-28 pt-32 md:pb-40 md:pt-40">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mb-10 md:mb-14"
      >
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-white/50">
          Katalog
        </p>
        <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
          Semua perlengkapan event
        </h1>
        <p className="mt-4 max-w-xl text-white/60">
          Cari perlengkapan yang lu butuhin, lalu minta penawaran langsung lewat WhatsApp.
        </p>
      </motion.div>

      {/* Search */}
      <div className="relative mb-6">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-white/40"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" />
        </svg>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari nama, kategori, atau spesifikasi (misal: troli, 150 kg)"
          className="w-full rounded-full border border-white/10 bg-white/[0.04] py-4 pl-14 pr-12 text-base text-white placeholder:text-white/35 outline-none transition focus:border-white/40 [&::-webkit-search-cancel-button]:hidden"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            aria-label="Hapus pencarian"
            className="absolute right-4 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-white/50 transition hover:bg-white/10 hover:text-white"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        )}
      </div>

      {/* Tabs kategori */}
      <div
        role="tablist"
        className="-mx-6 mb-4 flex gap-2 overflow-x-auto px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {tabs.map((t) => {
          const active = t.id === category;
          return (
            <button
              key={t.id}
              role="tab"
              aria-selected={active}
              onClick={() => setCategory(t.id)}
              className={`relative shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                active ? "text-black" : "text-white/60 hover:text-white"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="catalog-pill"
                  className="absolute inset-0 rounded-full bg-white"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {t.label}
                <span className={`text-xs ${active ? "text-black/50" : "text-white/30"}`}>
                  {countFor(t.id)}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Info hasil */}
      <div className="mb-6 flex items-center justify-between text-sm text-white/45" aria-live="polite">
        <span>
          {results.length} item
          {query.trim() && <> untuk &ldquo;{query.trim()}&rdquo;</>}
        </span>
        {(query || category !== "all") && (
          <button
            onClick={() => {
              setQuery("");
              setCategory("all");
            }}
            className="underline-offset-4 transition hover:text-white hover:underline"
          >
            Reset filter
          </button>
        )}
      </div>

      {activeCat?.partner && (
        <p className="mb-6 rounded-xl border border-dashed border-white/15 px-5 py-3 text-sm text-white/55">
          Kategori ini dikoordinasikan bersama rekanan terpercaya kami, dengan satu pintu
          komunikasi lewat tim DWRENTAL.
        </p>
      )}

      {/* Grid */}
      <motion.div layout className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {results.map((item, i) => (
            <motion.article
              key={item.id}
              layout
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.45, delay: Math.min(i, 8) * 0.04, ease: [0.22, 1, 0.36, 1] }}
              onMouseMove={onMove}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors duration-300 hover:border-white/25"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(320px circle at var(--x, 50%) var(--y, 50%), rgba(255,255,255,0.10), transparent 60%)",
                }}
              />

              <div className={`relative mb-5 aspect-square overflow-hidden rounded-xl ${
                item.image ? "bg-white" : "bg-gradient-to-br from-white/10 to-white/[0.02]"
                }`}>
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(min-width:1280px) 25vw, (min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                    className="object-contain p-5 transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <span className="absolute bottom-3 left-4 select-none text-6xl font-bold text-white/10 transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-105">
                    {item.title.slice(0, 2).toUpperCase()}
                  </span>
                )}
                {item.draft && (
                  <span className="absolute right-3 top-3 rounded-full bg-amber-400 px-2 py-0.5 text-[10px] font-semibold text-black">
                    DRAFT
                  </span>
                )}
              </div>

              <div className="relative flex flex-1 flex-col">
                <h2 className="text-lg font-semibold leading-snug tracking-tight">{item.title}</h2>
                <p className="mt-1.5 text-sm leading-relaxed text-white/55">{item.desc}</p>

                <ul className="mt-4 space-y-1.5 border-t border-white/10 pt-4 text-xs text-white/70">
                  {item.specs.map((s) => (
                    <li key={s} className="flex gap-2">
                      <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-white/40" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>

               <div className="mt-auto pt-6">
                  <div className="border-t border-white/10 pt-5">
                    <PriceTag item={item} />
                  </div>

                  <a
                    href={waLink(`Halo DWRENTAL, saya tertarik menyewa ${item.title}. Boleh minta penawarannya?`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 px-4 py-2.5 text-sm font-medium text-white transition hover:border-white hover:bg-white hover:text-black"
                  >
                    Minta Penawaran
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17L17 7M8 7h9v9" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty state */}
      {results.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mt-6 max-w-md rounded-3xl border border-dashed border-white/15 px-8 py-14 text-center"
        >
          <p className="text-xl font-semibold tracking-tight">
            {query.trim() ? "Nggak ada yang cocok" : "Segera hadir"}
          </p>
          <p className="mt-2 text-sm text-white/55">
            {query.trim()
              ? "Coba kata kunci lain, atau tanyain langsung ke kami. Bisa jadi barangnya tersedia lewat rekanan."
              : "Daftar untuk kategori ini lagi disiapkan. Hubungi kami untuk kebutuhan spesifik."}
          </p>
          <a
            href={waLink(
              query.trim()
                ? `Halo DWRENTAL, saya cari "${query.trim()}". Apakah tersedia?`
                : "Halo DWRENTAL, saya butuh perlengkapan event. Boleh konsultasi?"
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5"
          >
            Tanya via WhatsApp
          </a>
        </motion.div>
      )}
    </section>
  );
}