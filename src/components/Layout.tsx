// src/components/Layout.tsx

"use client";

import React from "react";
import { BottomNav } from "./BottomNav";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

export function Layout({ children, title }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-lg mx-auto p-4">
          <h1 className="text-xl font-bold text-gray-800">{title}</h1>
        </div>
      </header>

      {/* Konten Utama. Tambahkan padding-top dan padding-bottom untuk mengakomodasi header dan nav */}
      <main className="pt-20 pb-20 max-w-lg mx-auto p-4">{children}</main>

      <BottomNav />
    </div>
  );
}
