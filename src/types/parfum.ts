// src/types/parfum.ts

export interface Parfum {
  id: number;
  nama: string;
  merek: string;
  ukuran_ml: number;
  stok: number;
  harga: number; // Dalam Rupiah
  deskripsi: string;
  created_at: string;
}

export type NewParfum = Omit<Parfum, "id" | "created_at">;
