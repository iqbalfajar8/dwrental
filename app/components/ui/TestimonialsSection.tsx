"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

type Testimonial = {
  text: string;
  name: string;
  role: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    text: "Barang datang sesuai jadwal dan kondisinya juga rapi. Buat acara kampus kami, proses sewanya juga cukup gampang.",
    name: "Rizky Pratama",
    role: "Mahasiswa",
  },
  {
    text: "Koordinasinya enak dari awal sampai hari-H. Waktu ada perubahan kebutuhan di venue, timnya juga cepat membantu.",
    name: "Dinda Maharani",
    role: "Panitia Acara Kampus",
  },
  {
    text: "Harga dan detail barangnya dijelaskan dari awal, jadi kami bisa menyesuaikan dengan budget acara tanpa khawatir ada biaya tambahan.",
    name: "Fajar Ramadhan",
    role: "Ketua Panitia",
  },
  {
    text: "Sudah beberapa kali sewa untuk kebutuhan acara dan sejauh ini barangnya selalu sesuai dengan yang kami pesan.",
    name: "Andika Saputra",
    role: "Wedding Organizer",
  },
  {
    text: "Responnya cepat, terutama saat ada kebutuhan tambahan mendadak menjelang acara. Sangat membantu untuk persiapan di lapangan.",
    name: "Nadia Putri",
    role: "Event Organizer",
  },
  {
    text: "Peralatannya datang dalam kondisi baik dan proses pengembaliannya juga tidak ribet. Cocok buat kebutuhan acara komunitas.",
    name: "Bagas Wijaya",
    role: "Komunitas Kreatif",
  },
  {
    text: "Kami sewa untuk acara launching produk. Dari komunikasi sampai pemasangan cukup lancar dan timnya kooperatif.",
    name: "Kevin Aditya",
    role: "Brand Activation",
  },
  {
    text: "Untuk acara gathering kantor, kebutuhan perlengkapan bisa dipenuhi cukup lengkap. Koordinasinya juga jelas dari awal.",
    name: "Sarah Amelia",
    role: "PIC Gathering",
  },
  {
    text: "Awalnya cuma coba sewa untuk satu acara, ternyata pelayanannya cukup memuaskan. Sekarang beberapa kebutuhan event kami sewa di sini.",
    name: "Arief Nugraha",
    role: "Event Production",
  },
];


const COL_1 = TESTIMONIALS.slice(0, 3);
const COL_2 = TESTIMONIALS.slice(3, 6);
const COL_3 = TESTIMONIALS.slice(6, 9);

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function Column({
  items,
  duration,
  className = "",
}: {
  items: Testimonial[];
  duration: number;
  className?: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const tween = gsap.to(track.current, {
        yPercent: -50,
        duration,
        ease: "none",
        repeat: -1,
      });

      const el = wrap.current!;
      const slow = () => gsap.to(tween, { timeScale: 0.15, duration: 0.6 });
      const normal = () => gsap.to(tween, { timeScale: 1, duration: 0.6 });
      el.addEventListener("mouseenter", slow);
      el.addEventListener("mouseleave", normal);

      return () => {
        el.removeEventListener("mouseenter", slow);
        el.removeEventListener("mouseleave", normal);
      };
    }, wrap);

    return () => ctx.revert();
  }, [duration]);

  return (
    <div ref={wrap} className={className}>
      {/* konten digandakan, geser -50% = loop mulus */}
      <div ref={track} className="flex flex-col gap-6 pb-6 will-change-transform">
        {[0, 1].map((dup) => (
          <React.Fragment key={dup}>
            {items.map((t, i) => (
              <figure
                key={`${dup}-${i}`}
                aria-hidden={dup === 1}
                className="w-full max-w-xs rounded-3xl border border-white/10 bg-white/[0.03] p-8"
              >
                <blockquote className="text-sm leading-relaxed text-white/75">
                  {t.text}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-xs font-semibold text-white/80">
                    {initials(t.name)}
                  </span>
                  <span className="flex flex-col">
                    <span className="text-sm font-medium leading-5 tracking-tight text-white">
                      {t.name}
                    </span>
                    <span className="text-xs leading-5 text-white/50">
                      {t.role}
                    </span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="relative scroll-mt-20 bg-neutral-950 px-6 py-28 text-white md:py-40"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto flex max-w-xl flex-col items-center text-center"
        >
          <span className="rounded-full border border-white/15 px-4 py-1 text-xs uppercase tracking-[0.2em] text-white/50">
            Testimoni
          </span>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight md:text-5xl">
            Kata mereka tentang kami
          </h2>
          <p className="mt-5 text-white/60">
            Pengalaman klien yang sudah mempercayakan kebutuhan eventnya kepada kami.
          </p>
        </motion.div>

        <div
          className="mt-14 flex max-h-[740px] justify-center gap-6 overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
          }}
        >
          <Column items={COL_1} duration={32} />
          <Column items={COL_2} duration={40} className="hidden md:block" />
          <Column items={COL_3} duration={36} className="hidden lg:block" />
        </div>
      </div>
    </section>
  );
}