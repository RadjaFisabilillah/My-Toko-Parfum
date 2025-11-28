// src/components/BottomNav.tsx

import Link from "next/link";
import { Home, ListChecks, Plus, User } from "lucide-react";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", icon: Home, label: "Beranda" },
  { href: "/stok", icon: ListChecks, label: "Stok" },
  { href: "/tambah", icon: Plus, label: "Tambah" },
  { href: "/profil", icon: User, label: "Profil" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    // Memastikan Navigasi selalu berada di bawah
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg md:hidden">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center p-2 text-xs font-medium transition-colors ${
                isActive ? "text-blue-600" : "text-gray-500 hover:text-blue-600"
              }`}
            >
              <Icon size={20} />
              <span className="mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
