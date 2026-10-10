export type CategoryId = "support" | "sound" | "led";

export const CATEGORIES: { id: CategoryId; label: string; partner: boolean }[] = [
  { id: "support", label: "Event Support", partner: false },
  { id: "sound", label: "Sound System", partner: true },
  { id: "led", label: "LED Screen", partner: true },
];

export type EquipmentItem = {
  id: string;
  category: CategoryId;
  title: string;
  desc: string;
  specs: string[];
  /** harga dalam Rupiah (angka saja, tanpa titik). Kosongkan kalau harga lewat penawaran */
  price?: number;
  /** satuan sewa, default "hari" */
  unit?: string;
  /** path di /public, misal "/equipment/ht.webp" */
  image?: string;
  /** placeholder: hanya tampil saat development, otomatis tersembunyi di production */
  draft?: boolean;
  /** true = tampil di homepage. Kalau tidak ada yang di-set, homepage ambil 8 item pertama */
  featured?: boolean;
};

const ALL: EquipmentItem[] = [
  // ───── Event Support ─────
  {
    id: "ht",
    category: "support",
    title: "HT WLN KD C1+ (UHF)",
    desc: "Handy talkie untuk komunikasi tim di lapangan.",
    specs: ["Baterai Li-ion 1500 mAh", "Jangkauan hingga 5 km", "16 channel"],
    price: 50000,
    unit: "hari",
    image: "/equipment/ht.webp",
  },
  {
    id: "signage",
    category: "support",
    title: "Standing Signage",
    desc: "Penyangga poster dan papan petunjuk arah.",
    specs: ["Aluminum alloy premium", "Tinggi 125–225 cm", "Tampilan 2 sisi"],
    price: 50000,
    unit: "hari",
    image: "/equipment/signage.webp",
  },
  {
    id: "bar-stool",
    category: "support",
    title: "Bar Stool",
    desc: "Kursi bar untuk lounge, registrasi, dan area networking.",
    specs: ["Bahan kulit berkualitas", "Tinggi 63–84 cm", "Putar 360°"],
    image: "/equipment/bar-stool.webp",
  },
  {
    id: "trolley",
    category: "support",
    title: "Foldable Trolley",
    desc: "Troli lipat Krisbow untuk bongkar muat barang.",
    specs: ["Beban maks. 150 kg", "Platform karet anti-slip", "Roda putar 360°"],
    image: "/equipment/trolley.webp",
  },
  {
    id: "canal-cable",
    category: "support",
    title: "Canal Cable",
    desc: "Pelindung kabel jalan supaya jalur kabel aman dilewati.",
    specs: ["3 channel", "100 × 30 × 5 cm", "Tahan beban kendaraan 4,5 ton"],
    image: "/equipment/canal-cable.webp",
  },
  {
    id: "air-cooler",
    category: "support",
    title: "Air Cooler",
    desc: "Pendingin udara portabel Midea AC100 Series.",
    specs: ["Tangki air 6 liter", "Daya 50W–55W", "3 kecepatan"],
    image: "/equipment/air-cooler.webp",
  },
  {
    id: "apar",
    category: "support",
    title: "APAR",
    desc: "Alat pemadam api ringan Krisbow SRFX3.",
    specs: [
      "Dry chemical powder 3 kg",
      "Untuk kebakaran kelas A, B, C",
      "Sistem stored-pressure",
    ],
    image: "/equipment/apar.webp",
  },

  // ───── Sound System · PLACEHOLDER, ganti dengan data asli ─────
  {
    id: "sound-1",
    category: "sound",
    draft: true,
    title: "Line Array Speaker",
    desc: "Sebaran suara merata untuk venue besar.",
    specs: ["Spesifikasi menyusul"],
    image: "/equipment/sound-1.webp",
  },
  {
    id: "printer",
    category: "support",
    title: "Printer",
    desc: "Pilihan printer untuk kebutuhan cetak di lokasi acara.",
    specs: [
      "HP DeskJet Ink Advantage 2135",
      "HP OfficeJet 250 Mobile AiO",
      "Epson EcoTank L14150",
      "USB 2.0 · 7.5 ppm · 4800 dpi",
    ],
    image: "/equipment/printer.webp",
  },
  {
    id: "sound-2",
    category: "sound",
    draft: true,
    title: "Wireless Microphone",
    desc: "Mic nirkabel untuk speaker dan presenter.",
    specs: ["Spesifikasi menyusul"],
    image: "/equipment/sound-2.webp",
  },

  // ───── LED Screen · PLACEHOLDER, ganti dengan data asli ─────
  {
    id: "led-1",
    category: "led",
    draft: true,
    title: "LED Screen Indoor",
    desc: "Layar LED resolusi tinggi untuk ruangan.",
    specs: ["Spesifikasi menyusul"],
    image: "/equipment/led-1.webp",
  },
  {
    id: "led-2",
    category: "led",
    draft: true,
    title: "LED Screen Outdoor",
    desc: "Layar LED tahan cuaca untuk acara terbuka.",
    specs: ["Spesifikasi menyusul"],
    image: "/equipment/led-2.webp",
  },
];

// item draft cuma muncul di `npm run dev`
export const EQUIPMENT: EquipmentItem[] = ALL.filter(
  (i) => !i.draft || process.env.NODE_ENV !== "production"
);