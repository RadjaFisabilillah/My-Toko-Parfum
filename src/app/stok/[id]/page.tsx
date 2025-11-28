// src/app/stok/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { supabase } from "@/lib/supabase";
import { Parfum } from "@/types/parfum";
import { useParams, useRouter } from "next/navigation";
import { Edit, RefreshCw } from "lucide-react";
import Link from "next/link";

// Halaman 5 (Detail dari List 2)
export default function ParfumDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [parfum, setParfum] = useState<Parfum | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchParfumDetail(parseInt(id));
    }
  }, [id]);

  const fetchParfumDetail = async (parfumId: number) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("parfum_stok")
      .select("*")
      .eq("id", parfumId)
      .single();

    if (error) {
      console.error("Error fetching detail:", error);
      alert("Detail produk tidak ditemukan.");
      router.push("/stok");
    } else {
      setParfum(data);
    }
    setLoading(false);
  };

  const handleUpdateStok = async (amount: number) => {
    if (!parfum) return;

    const newStok = parfum.stok + amount;
    if (newStok < 0) {
      alert("Stok tidak boleh kurang dari nol.");
      return;
    }

    const { error } = await supabase
      .from("parfum_stok")
      .update({ stok: newStok })
      .eq("id", parfum.id);

    if (error) {
      console.error("Error updating stok:", error);
      alert("Gagal memperbarui stok.");
    } else {
      alert(`Stok berhasil diubah menjadi ${newStok}.`);
      setParfum((prev) => (prev ? { ...prev, stok: newStok } : null)); // Update state lokal
    }
  };

  if (loading) {
    return (
      <Layout title="Memuat Detail...">
        <p className="text-center mt-8">Memuat detail parfum...</p>
      </Layout>
    );
  }

  if (!parfum) {
    return (
      <Layout title="Error">
        <p className="text-center mt-8 text-red-500">Parfum tidak ditemukan.</p>
      </Layout>
    );
  }

  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  return (
    <Layout title={`Detail: ${parfum.nama}`}>
      <div className="bg-white p-6 rounded-xl shadow-lg space-y-4">
        <div className="flex justify-between items-start">
          <h2 className="text-2xl font-extrabold text-gray-900">
            {parfum.nama}
          </h2>
          <Link
            href={`/tambah?id=${parfum.id}`}
            className="p-2 text-blue-500 hover:text-blue-700 transition-colors bg-blue-50 rounded-full"
            aria-label="Edit Produk"
          >
            <Edit size={20} />
          </Link>
        </div>

        <p className="text-gray-600 border-b pb-4">
          {parfum.deskripsi || "Tidak ada deskripsi."}
        </p>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <p>
            <span className="font-semibold text-gray-700">Merek:</span>{" "}
            {parfum.merek}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Ukuran:</span>{" "}
            {parfum.ukuran_ml} ml
          </p>
          <p>
            <span className="font-semibold text-gray-700">Harga:</span>{" "}
            {formatRupiah(parfum.harga)}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Dibuat:</span>{" "}
            {new Date(parfum.created_at).toLocaleDateString()}
          </p>
        </div>

        <div className="pt-4 border-t">
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Stok Saat Ini:
            <span
              className={`ml-2 ${
                parfum.stok < 10 ? "text-red-600" : "text-green-600"
              }`}
            >
              {parfum.stok}
            </span>
          </h3>

          <div className="flex space-x-3">
            <button
              onClick={() => handleUpdateStok(-1)}
              className="flex-1 px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
            >
              - Kurangi 1
            </button>
            <button
              onClick={() => handleUpdateStok(1)}
              className="flex-1 px-4 py-2 text-sm font-semibold text-white bg-green-500 rounded-lg hover:bg-green-600 transition-colors"
            >
              + Tambah 1
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
