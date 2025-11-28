// src/app/profil/page.tsx
import { Layout } from "@/components/Layout";
import { Info, ExternalLink } from "lucide-react";

// Halaman 7
export default function ProfilPage() {
  return (
    <Layout title="Profil & Tentang Aplikasi">
      <div className="bg-white p-6 rounded-xl shadow-lg space-y-6">
        <div className="flex items-center space-x-3 border-b pb-4">
          <Info size={28} className="text-blue-500" />
          <h2 className="text-xl font-bold text-gray-800">
            Parfum Stok Manager PWA
          </h2>
        </div>

        <div className="space-y-3 text-gray-700">
          <p className="text-base">
            Aplikasi Web Progresif (PWA) ini dirancang untuk mempermudah
            manajemen stok produk parfum Anda secara *real-time*. Aplikasi ini
            dibangun menggunakan **Next.js** dan **Tailwind CSS** dengan
            *backend* data yang didukung oleh **Supabase**.
          </p>
          <p className="text-sm italic">
            Fitur utama: Login/Register, Manajemen Stok (CRUD), dan tampilan
            list/detail produk.
          </p>
        </div>

        <div className="border-t pt-4 space-y-2">
          <h3 className="text-lg font-semibold text-gray-800">
            Tentang Teknologi
          </h3>
          <ul className="text-sm space-y-1">
            <li className="flex items-center">
              <span className="font-medium w-20">Frontend:</span> Next.js
              (React/TypeScript)
            </li>
            <li className="flex items-center">
              <span className="font-medium w-20">Backend:</span> Supabase
              (Database & Auth)
            </li>
            <li className="flex items-center">
              <span className="font-medium w-20">Styling:</span> Tailwind CSS
            </li>
            <li className="flex items-center">
              <span className="font-medium w-20">Hosting:</span> Vercel
            </li>
          </ul>
        </div>

        <div className="pt-4 border-t text-center">
          <a
            href="https://supabase.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            Kunjungi Supabase <ExternalLink size={16} className="ml-1" />
          </a>
        </div>
      </div>
    </Layout>
  );
}
