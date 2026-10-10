import { Suspense } from "react";
import type { Metadata } from "next";
import CatalogClient from "@/components/catalog/CatalogClient";

export const metadata: Metadata = {
  title: "Katalog | DWRENTAL",
  description: "Katalog lengkap perlengkapan event DWRENTAL.",
};

export default function CatalogPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      {/* useSearchParams wajib dibungkus Suspense di App Router */}
      <Suspense fallback={null}>
        <CatalogClient />
      </Suspense>
    </main>
  );
}