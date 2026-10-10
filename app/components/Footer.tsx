"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import gsap from "gsap";
import {
  FaInstagram,
  FaTiktok,
  FaLinkedinIn,
  FaYoutube,
  FaFacebookF,
  FaXTwitter,
  FaWhatsapp,
} from "react-icons/fa6";
import type { IconType } from "react-icons";
import { CATEGORIES } from "@/data/equipment";
import { CONTACT, SOCIALS } from "@/lib/contact";
import { waLink } from "@/lib/whatsapp";

const ICONS: Record<string, IconType> = {
  instagram: FaInstagram,
  tiktok: FaTiktok,
  linkedin: FaLinkedinIn,
  youtube: FaYoutube,
  facebook: FaFacebookF,
  x: FaXTwitter,
};

const NAV = [
  { name: "Home", href: "/" },
  { name: "Catalog", href: "/catalog" },
  { name: "Testimoni", href: "/#testimonials" },
  { name: "Contact", href: "/contact" },
];

const MARQUEE = ["Event Support", "Sound System", "LED Screen", "Sewa Perlengkapan Event"];

/* ───────────── Marquee (GSAP) ───────────── */

function Marquee() {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tween = gsap.to(track.current, {
      xPercent: -50,
      duration: 40,
      ease: "none",
      repeat: -1,
    });
    return () => {
      tween.kill();
    };
  }, []);

  return (
    <div className="overflow-hidden border-y border-white/10 py-5">
      <div ref={track} className="flex w-max">
        {[0, 1].map((dup) => (
          <div
            key={dup}
            aria-hidden={dup === 1}
            className="flex shrink-0 items-center gap-8 pr-8"
          >
            {[...MARQUEE, ...MARQUEE].map((t, i) => (
              <span key={i} className="flex items-center gap-8">
                <span className="whitespace-nowrap text-2xl font-semibold tracking-tight text-white/70 md:text-4xl">
                  {t}
                </span>
                <span className="text-white/25">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───────────── Footer ───────────── */

export default function Footer() {
  const socials = SOCIALS.filter((s) => s.url);

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  const onLeave = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.removeProperty("--x");
    e.currentTarget.style.removeProperty("--y");
  };

  return (
    <footer className="relative overflow-hidden bg-neutral-950 text-white">
      <Marquee />

      <div className="mx-auto max-w-7xl px-6">
        {/* ───── CTA ───── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-8 py-20 md:flex-row md:items-end md:justify-between md:py-28"
        >
          <h2 className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            Siap bikin eventmu berjalan lancar?
          </h2>

          <a
            href={waLink("Halo DWRENTAL, saya ingin konsultasi kebutuhan perlengkapan event.")}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-fit shrink-0 items-center gap-3 rounded-full bg-white py-2 pl-7 pr-2 text-sm font-semibold text-black transition hover:-translate-y-0.5"
          >
            Chat via WhatsApp
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white transition-transform duration-300 group-hover:rotate-12">
              <FaWhatsapp size={18} />
            </span>
          </a>
        </motion.div>

        {/* ───── Kolom ───── */}
        <div className="grid gap-12 border-t border-white/10 py-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr]">
          {/* Brand */}
          <div>
            <p className="text-xl font-bold tracking-tight">DWRENTAL</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/55">
              Your trusted event equipment solutions. Kami siapkan, kirim, dan
              kawal perlengkapan eventmu sampai acara selesai.
            </p>

            {socials.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-2.5">
                {socials.map((s) => {
                  const Icon = ICONS[s.id];
                  if (!Icon) return null;
                  return (
                    <li key={s.id}>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        title={s.label}
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/70 transition duration-300 hover:-translate-y-1 hover:border-white hover:bg-white hover:text-black"
                      >
                        <Icon size={17} />
                      </a>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Navigasi */}
          <div>
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-white/40">
              Navigasi
            </p>
            <ul className="space-y-3 text-sm">
              {NAV.map((n) => (
                <li key={n.name}>
                  <FooterLink href={n.href}>{n.name}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Katalog */}
          <div>
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-white/40">
              Katalog
            </p>
            <ul className="space-y-3 text-sm">
              {CATEGORIES.map((c) => (
                <li key={c.id}>
                  <FooterLink href={`/catalog?category=${c.id}`}>{c.label}</FooterLink>
                </li>
              ))}
              <li>
                <FooterLink href="/catalog">Semua perlengkapan</FooterLink>
              </li>
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-white/40">
              Kontak
            </p>
            <ul className="space-y-3 text-sm text-white/65">
              <li>
                <a
                  href={waLink("Halo DWRENTAL, saya ingin bertanya.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition hover:text-white"
                >
                  <FaWhatsapp size={15} />
                  {CONTACT.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`} className="transition hover:text-white">
                  {CONTACT.email}
                </a>
              </li>
              <li className="leading-relaxed">
                {CONTACT.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
                <a
                  href={CONTACT.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-white/45 underline-offset-4 transition hover:text-white hover:underline"
                >
                  Buka di Google Maps
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ───── Baris bawah ───── */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 text-xs text-white/40 sm:flex-row">
            <p>© 2026 DWRENTAL. All rights reserved.</p>          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group inline-flex items-center gap-2 transition hover:text-white"
          >
            Kembali ke atas
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:-translate-y-1"
            >
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* ───── Wordmark raksasa ───── */}
      <div
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="select-none overflow-hidden px-4 pt-4"
      >
        <motion.p
          aria-hidden
          initial={{ y: "55%", opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="whitespace-nowrap bg-clip-text text-center text-[19vw] font-bold leading-[0.8] tracking-tighter text-transparent"
          style={{
            backgroundImage:
              "radial-gradient(circle 340px at var(--x, -999px) var(--y, -999px), rgba(255,255,255,0.95), rgba(255,255,255,0.09) 100%)",
            WebkitBackgroundClip: "text",
          }}
        >
          DWRENTAL
        </motion.p>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group relative inline-block text-white/65 transition-colors hover:text-white"
    >
      {children}
      <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-white transition-transform duration-300 group-hover:scale-x-100" />
    </Link>
  );
}