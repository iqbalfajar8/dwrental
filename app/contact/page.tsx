import type { Metadata } from "next";
import ContactClient from "@/components/contact/ContactClient";

export const metadata: Metadata = {
  title: "Kontak | DWRENTAL",
  description: "Hubungi DWRENTAL untuk konsultasi dan penawaran perlengkapan event.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <ContactClient />
    </main>
  );
}