// src/app/tambah/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { supabase } from "@/lib/supabase";
import { NewParfum, Parfum } from "@/types/parfum";
import { useRouter, useSearchParams } from "next/navigation";

// Halaman 6 (Form CRUD)
export default function TambahParfumPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("id");

  const [formData, setFormData] = useState<NewParfum>({
    nama: "",
    merek: "",
    ukuran_ml: 0,
    stok: 0,
    harga: 0,
    deskripsi: "",
  });
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (editId) {
      setIsEditMode(true);
      fetchParfumToEdit(parseInt(editId));
    } else {
      setIsEditMode(false);
      setFormData({
        nama: "",
        merek: "",
        ukuran_ml: 0,
        stok: 0,
        harga: 0,
        deskripsi: "",
      });
    }
  }, [editId]);

  const fetchParfumToEdit = async (id: number) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("parfum_stok")
      .select("*")
      .eq("id", id)
      .single();

    if (data) {
      // Hilangkan 'id' dan 'created_at' agar sesuai dengan NewParfum
      const { id: _, created_at: __, ...rest } = data;
      setFormData(rest);
    } else {
      console.error("Error fetching data for edit:", error);
      alert("Produk untuk diedit tidak ditemukan.");
      router.push("/stok");
    }
    setLoading(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "ukuran_ml" || name === "stok" || name === "harga"
          ? parseInt(value) || 0
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const dataToSubmit = {
      ...formData,
      // Pastikan angka tidak NaN (Not a Number)
      ukuran_ml: Number(formData.ukuran_ml),
      stok: Number(formData.stok),
      harga: Number(formData.harga),
    };

    let result;
    if (isEditMode && editId) {
      // UPDATE
      result = await supabase
        .from("parfum_stok")
        .update(dataToSubmit)
        .eq("id", parseInt(editId));
    } else {
      // CREATE
      result = await supabase.from("parfum_stok").insert(dataToSubmit);
    }

    setLoading(false);

    if (result.error) {
      console.error("Error submitting form:", result.error);
      alert(
        `Gagal ${isEditMode ? "mengedit" : "menambah"} produk: ${
          result.error.message
        }`
      );
    } else {
      alert(`Produk berhasil di${isEditMode ? "edit" : "tambah"}!`);
      // Arahkan ke halaman list stok
      router.push("/stok");
    }
  };

  if (isEditMode && loading) {
    return (
      <Layout title="Memuat Data Edit...">
        <p className="text-center mt-8">Memuat data produk...</p>
      </Layout>
    );
  }

  return (
    <Layout title={isEditMode ? "Edit Produk Parfum" : "Tambah Produk Parfum"}>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-xl shadow-lg"
      >
        <div>
          <label
            htmlFor="nama"
            className="block text-sm font-medium text-gray-700"
          >
            Nama Parfum
          </label>
          <input
            type="text"
            id="nama"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label
            htmlFor="merek"
            className="block text-sm font-medium text-gray-700"
          >
            Merek
          </label>
          <input
            type="text"
            id="merek"
            name="merek"
            value={formData.merek}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="ukuran_ml"
              className="block text-sm font-medium text-gray-700"
            >
              Ukuran (ml)
            </label>
            <input
              type="number"
              id="ukuran_ml"
              name="ukuran_ml"
              value={formData.ukuran_ml}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label
              htmlFor="stok"
              className="block text-sm font-medium text-gray-700"
            >
              Stok Awal
            </label>
            <input
              type="number"
              id="stok"
              name="stok"
              value={formData.stok}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="harga"
            className="block text-sm font-medium text-gray-700"
          >
            Harga (Rp)
          </label>
          <input
            type="number"
            id="harga"
            name="harga"
            value={formData.harga}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label
            htmlFor="deskripsi"
            className="block text-sm font-medium text-gray-700"
          >
            Deskripsi
          </label>
          <textarea
            id="deskripsi"
            name="deskripsi"
            rows={3}
            value={formData.deskripsi}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors`}
        >
          {loading
            ? "Memproses..."
            : isEditMode
            ? "Simpan Perubahan"
            : "Tambahkan Produk"}
        </button>
      </form>
    </Layout>
  );
}
