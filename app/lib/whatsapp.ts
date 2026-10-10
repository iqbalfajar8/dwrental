// GANTI dengan nomor asli, format internasional tanpa "+" (62812...)
export const WA_NUMBER = "628776803134";

export const waLink = (message: string) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;