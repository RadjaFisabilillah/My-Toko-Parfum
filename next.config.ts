/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Konfigurasi App Router
  // Secara default sudah diaktifkan karena inisialisasi awal.
  experimental: {
    // Jika Anda ingin mengaktifkan opsi eksperimental lainnya, masukkan di sini.
  },

  // 2. Output Mode (Optional, untuk Ekspor PWA Statis Penuh)
  // Jika Anda ingin mengekspor aplikasi Anda sebagai HTML/CSS/JS statis murni
  // (misalnya untuk PWA murni tanpa Server Side Rendering), aktifkan opsi ini.
  // Untuk Vercel dan App Router, biasanya mode default sudah cukup.
  // output: 'export',

  // 3. Konfigurasi Transpiler (untuk mendukung fitur-fitur modern)
  // Ini memastikan kompatibilitas yang lebih baik dan build yang lebih cepat.
  transpilePackages: ["lucide-react"], // Contoh: Jika ada package yang perlu ditranspile.

  // 4. Konfigurasi Header (PWA/Keamanan)
  async headers() {
    return [
      {
        // Terapkan ke semua rute
        source: "/:path*",
        headers: [
          // Header dasar PWA: Memastikan konten di-cache dengan baik
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, must-revalidate",
          },
          // Header keamanan: Mencegah serangan XSS
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
    ];
  },
};

// Next.js tidak secara bawaan mendukung Service Worker/Web Manifest PWA.
// Kita akan menggunakan 'next-pwa' (atau solusi serupa) jika Anda ingin PWA penuh.
// Untuk saat ini, kita akan menyediakan konfigurasi dasar.

module.exports = nextConfig;
