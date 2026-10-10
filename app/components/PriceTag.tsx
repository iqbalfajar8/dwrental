import { formatRupiah } from "@/lib/format";
import type { EquipmentItem } from "@/data/equipment";

export default function PriceTag({ item }: { item: EquipmentItem }) {
  if (!item.price) {
    return <p className="text-sm text-white/55">Hubungi kami untuk harga</p>;
  }

  return (
    <p className="flex items-baseline gap-1.5">
      <span className="text-xs text-white/45">Mulai</span>
      <span className="text-xl font-semibold tracking-tight">
        {formatRupiah(item.price)}
      </span>
      <span className="text-xs text-white/45">/ {item.unit ??"hari"}</span>
    </p>
  );
}