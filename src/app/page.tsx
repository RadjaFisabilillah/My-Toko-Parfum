// src/app/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { supabase } from "@/lib/supabase";
import { Parfum } from "@/types/parfum";
import Link from "next/link";

// Halaman 3
export default function HomePage() {
  const [parfums, setParfums] = useState<Parfum[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchParfums();
  }, []);

  const fetchParfums = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("parfum_stok") // Asumsi nama tabel Anda
      .select("*")
      .order("stok", { ascending: false });

    if (error) {
      console.error("Error fetching data:", error);
      // Di aplikasi nyata, tampilkan notifikasi error ke pengguna
    } else {
      setParfums(data || []);
    }
    setLoading(false);
  };

  return (
    <Layout title="Parfum Terlaris (Home)">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">Stok Utama</h2>

      {loading && <p className="text-center text-gray-500">Memuat data...</p>}

      {!loading && parfums.length === 0 && (
        <p className="text-center text-gray-500">
          Belum ada data parfum. Silakan tambahkan!
        </p>
      )}

      {!loading && parfums.length > 0 && (
        <div className="space-y-3">
          {parfums.map((parfum) => (
            <Link
              key={parfum.id}
              href={`/stok/${parfum.id}`}
              className="block bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-base font-bold text-gray-800">
                    {parfum.nama}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {parfum.merek} - {parfum.ukuran_ml}ml
                  </p>
                </div>
                <div className="text-right">
                  <p
                    className={`text-xl font-bold ${
                      parfum.stok < 10 ? "text-red-500" : "text-green-600"
                    }`}
                  >
                    {parfum.stok}
                  </p>
                  <p className="text-xs text-gray-500">unit</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </Layout>
  );
}
