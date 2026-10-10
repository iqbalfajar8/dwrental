"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { EQUIPMENT } from "@/data/equipment";
import { waLink } from "@/lib/whatsapp";
import PriceTag from "@/components/PriceTag";

const HOME_LIMIT = 8;

function onMove(e: React.MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
}

export default function EquipmentList() {
  const featured = EQUIPMENT.filter((i) => i.featured);
  const items = (featured.length ? featured : EQUIPMENT).slice(0, HOME_LIMIT);
  const total = EQUIPMENT.length;

  return (
    <section
      id="popular"
      className="relative scroll-mt-20 bg-neutral-950 px-6 pb-28 text-white md:pb-40"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 flex flex-col gap-3 md:mb-14 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-white/50">
              Pilihan populer
            </p>
            <h3 className="text-3xl font-semibold tracking-tight md:text-5xl">
              Siap dikirim ke lokasi
            </h3>
          </div>
         
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {items.map((item, i) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.7,
                delay: (i % 4) * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
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
                    sizes="(min-width:1280px) 25vw, (min-width:640px) 50vw, 100vw"
                    className="object-contain p-5 transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <span className="absolute bottom-3 left-4 select-none text-6xl font-bold text-white/10 transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-105">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                )}
               
              </div>

              <div className="relative flex flex-1 flex-col">
                <h4 className="text-lg font-semibold leading-snug tracking-tight">
                  {item.title}
                </h4>
                <p className="mt-1.5 text-sm leading-relaxed text-white/55">
                  {item.desc}
                </p>

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
        </div>

        {/* CTA ke katalog */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex justify-center"
        >
          <Link
            href="/catalog"
            className="group inline-flex items-center gap-3 rounded-full bg-white py-2 pl-7 pr-2 text-sm font-semibold text-black transition hover:-translate-y-0.5"
          >
            Lihat semua di katalog
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white transition-transform duration-300 group-hover:rotate-45">
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
          </Link>
        </motion.div>
      </div>
    </section>
  );
}