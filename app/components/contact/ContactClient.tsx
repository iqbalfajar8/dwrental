"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CATEGORIES } from "@/data/equipment";
import { WA_NUMBER, waLink } from "@/lib/whatsapp";
import { CONTACT } from "@/lib/contact";

const NEEDS = [...CATEGORIES.map((c) => c.label), "Lainnya"];

const field =
  "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-white/40 [color-scheme:dark]";

const label = "mb-2 block text-xs font-medium uppercase tracking-wider text-white/50";

type Form = {
  name: string;
  company: string;
  needs: string[];
  date: string;
  location: string;
  message: string;
};

const EMPTY: Form = { name: "", company: "", needs: [], date: "", location: "", message: "" };

function buildMessage(f: Form) {
  const lines = [
    "Halo DWRENTAL, saya ingin konsultasi dan minta penawaran.",
    "",
    `Nama: ${f.name.trim()}`,
    f.company.trim() && `Perusahaan/instansi: ${f.company.trim()}`,
    f.needs.length > 0 && `Kebutuhan: ${f.needs.join(", ")}`,
    f.date && `Tanggal acara: ${f.date}`,
    f.location.trim() && `Lokasi acara: ${f.location.trim()}`,
    f.message.trim() && `Catatan: ${f.message.trim()}`,
  ];
  return lines.filter((l) => l !== false).join("\n");
}

const fade = (i: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] as const },
});

export default function ContactClient() {
  const [form, setForm] = useState<Form>(EMPTY);
  const [error, setError] = useState("");
  const [sentLink, setSentLink] = useState("");

  const set = <K extends keyof Form>(key: K, value: Form[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const toggleNeed = (n: string) =>
    set(
      "needs",
      form.needs.includes(n) ? form.needs.filter((x) => x !== n) : [...form.needs, n]
    );

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim()) return setError("Nama wajib diisi.");
    if (form.needs.length === 0 && !form.message.trim())
      return setError("Pilih kebutuhan atau tulis catatan singkat.");

    setError("");
    const url = waLink(buildMessage(form));
    window.open(url, "_blank", "noopener,noreferrer");
    setSentLink(url);
  };

  return (
    <section className="mx-auto max-w-7xl px-6 pb-28 pt-32 md:pb-40 md:pt-40">
      {/* Header */}
      <motion.div {...fade(0)} className="mb-12 max-w-3xl md:mb-16">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-white/50">
          Kontak
        </p>
        <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
          Ceritakan kebutuhan eventmu
        </h1>
        <p className="mt-5 max-w-xl text-white/60">
          Isi form singkat di bawah, dan pesannya langsung kami terima lewat WhatsApp.
          Biasanya kami balas di hari kerja yang sama.
        </p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        {/* ───── Info ───── */}
        <div className="flex flex-col gap-4">
          <motion.a
            {...fade(1)}
            href={waLink("Halo DWRENTAL, saya ingin bertanya.")}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between rounded-2xl bg-white p-6 text-black transition hover:-translate-y-0.5"
          >
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-black/50">
                Respon tercepat
              </p>
              <p className="mt-1 text-xl font-semibold tracking-tight">Chat via WhatsApp</p>
              <p className="mt-1 text-sm text-black/60">{CONTACT.phoneDisplay}</p>
            </div>
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white transition-transform duration-300 group-hover:rotate-45">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M8 7h9v9" />
              </svg>
            </span>
          </motion.a>

          <motion.div {...fade(2)} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-xs font-medium uppercase tracking-wider text-white/45">Email</p>
            <a
              href={`mailto:${CONTACT.email}`}
              className="mt-1 inline-block text-lg font-medium tracking-tight underline-offset-4 hover:underline"
            >
              {CONTACT.email}
            </a>
          </motion.div>

          <motion.div {...fade(3)} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-xs font-medium uppercase tracking-wider text-white/45">Alamat</p>
            <p className="mt-1 text-white/80">
              {CONTACT.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
            <a
              href={CONTACT.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm text-white/60 underline-offset-4 transition hover:text-white hover:underline"
            >
              Buka di Google Maps
            </a>
          </motion.div>

          <motion.div {...fade(4)} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-xs font-medium uppercase tracking-wider text-white/45">
              Jam operasional
            </p>
            <ul className="mt-2 space-y-1.5 text-sm">
              {CONTACT.hours.map((h) => (
                <li key={h.day} className="flex justify-between gap-4">
                  <span className="text-white/60">{h.day}</span>
                  <span className="text-white/85">{h.time}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* ───── Form ───── */}
        <motion.form
          {...fade(2)}
          onSubmit={submit}
          noValidate
          className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className={label}>Nama *</label>
              <input
                id="name"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="Nama lengkap"
                autoComplete="name"
                className={field}
              />
            </div>
            <div>
              <label htmlFor="company" className={label}>Perusahaan / instansi</label>
              <input
                id="company"
                value={form.company}
                onChange={(e) => set("company", e.target.value)}
                placeholder="Opsional"
                autoComplete="organization"
                className={field}
              />
            </div>
          </div>

          <div className="mt-5">
            <span className={label}>Kebutuhan</span>
            <div className="flex flex-wrap gap-2">
              {NEEDS.map((n) => {
                const on = form.needs.includes(n);
                return (
                  <button
                    key={n}
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggleNeed(n)}
                    className={`rounded-full border px-4 py-2 text-sm transition ${
                      on
                        ? "border-white bg-white font-medium text-black"
                        : "border-white/15 text-white/65 hover:border-white/40 hover:text-white"
                    }`}
                  >
                    {n}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="date" className={label}>Tanggal acara</label>
              <input
                id="date"
                type="date"
                value={form.date}
                onChange={(e) => set("date", e.target.value)}
                className={field}
              />
            </div>
            <div>
              <label htmlFor="location" className={label}>Lokasi acara</label>
              <input
                id="location"
                value={form.location}
                onChange={(e) => set("location", e.target.value)}
                placeholder="Venue / kota"
                className={field}
              />
            </div>
          </div>

          <div className="mt-5">
            <label htmlFor="message" className={label}>Catatan</label>
            <textarea
              id="message"
              rows={4}
              value={form.message}
              onChange={(e) => set("message", e.target.value)}
              placeholder="Ceritakan singkat: jenis acara, jumlah tamu, atau barang yang dicari"
              className={`${field} resize-none`}
            />
          </div>

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                role="alert"
                className="mt-4 text-sm text-red-400"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <button
            type="submit"
            className="group mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full bg-white py-3.5 text-sm font-semibold text-black transition hover:-translate-y-0.5 sm:w-auto sm:px-8"
          >
            Kirim lewat WhatsApp
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>

          <AnimatePresence>
            {sentLink && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 text-sm text-white/55"
              >
                WhatsApp dibuka di tab baru. Kalau nggak muncul,{" "}
                <a
                  href={sentLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white underline underline-offset-4"
                >
                  klik di sini
                </a>
                .
              </motion.p>
            )}
          </AnimatePresence>
        </motion.form>
      </div>
    </section>
  );
}