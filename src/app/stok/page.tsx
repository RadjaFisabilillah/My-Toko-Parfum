// src/app/stok/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { supabase } from "@/lib/supabase";
import { Parfum } from "@/types/parfum";
import Link from "next/link";
import { Search, Trash2 } from "lucide-react";

// Halaman 4
export default function StokPage() {
  const [parfums, setParfums] = useState<Parfum[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchParfums();
  }, []);

  const fetchParfums = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("parfum_stok")
      .select("*")
      .order("nama", { ascending: true });

    if (error) {
      console.error("Error fetching data:", error);
    } else {
      setParfums(data || []);
    }
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus produk ini?"))
      return;

    const { error } = await supabase.from("parfum_stok").delete().eq("id", id);

    if (error) {
      console.error("Error deleting data:", error);
      alert("Gagal menghapus stok.");
    } else {
      alert("Stok berhasil dihapus.");
      fetchParfums(); // Muat ulang data
    }
  };

  const filteredParfums = parfums.filter(
    (parfum) =>
      parfum.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      parfum.merek.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout title="Manajemen Stok Parfum">
      <div className="relative mb-4">
        <Search
          size={20}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Cari parfum (nama/merek)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {loading && <p className="text-center text-gray-500">Memuat data...</p>}

      {!loading && filteredParfums.length === 0 && (
        <p className="text-center text-gray-500">Stok tidak ditemukan.</p>
      )}

      {!loading && filteredParfums.length > 0 && (
        <div className="space-y-3">
          {filteredParfums.map((parfum) => (
            <div
              key={parfum.id}
              className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-100"
            >
              <Link href={`/stok/${parfum.id}`} className="flex-grow min-w-0">
                <h3 className="text-base font-bold text-gray-800 truncate">
                  {parfum.nama}
                </h3>
                <p className="text-sm text-gray-500">
                  {parfum.merek} | Stok: {parfum.stok}
                </p>
              </Link>

              <button
                onClick={() => handleDelete(parfum.id)}
                className="ml-4 p-2 text-red-500 hover:text-red-700 transition-colors"
                aria-label={`Hapus ${parfum.nama}`}
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}
