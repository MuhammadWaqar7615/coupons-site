"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AUTH_TOKEN_STORAGE_KEY } from "@/config/auth";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = window.localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
      if (!token) {
        router.replace("/account/login");
        return;
      }

      try {
        const storedUser = window.localStorage.getItem("codicesconto_user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (err) {
        console.error("Failed to parse user session:", err);
      }
      setLoading(false);
    }
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" }).catch(() => null);
    } finally {
      window.localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
      window.localStorage.removeItem("codicesconto_user");
      router.push("/account/login");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-main">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-gray-500 text-sm">Caricamento in corso...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-main">
      <Navbar />

      {/* Header Banner */}
      <div className="bg-primary-dark w-full py-4">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 flex justify-between items-center">
          <h1 className="text-white text-2xl font-light">Il mio profilo</h1>
          <button
            onClick={handleLogout}
            className="text-white/80 hover:text-white text-xs uppercase font-bold tracking-wider py-1.5 px-3 rounded border border-white/30 hover:border-white transition-colors cursor-pointer"
          >
            Disconnetti
          </button>
        </div>
      </div>

      <main className="flex-grow w-full py-8">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-md shadow-sm border border-gray-100 p-6 sm:p-8 mb-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-full bg-accent text-white flex items-center justify-center font-bold text-xl">
                {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  {user?.name || "Utente Registrato"}
                </h2>
                <p className="text-sm text-gray-500">{user?.email || "Account CodiceSconto"}</p>
                {user?.role && (
                  <span className="inline-block bg-purple-50 text-accent font-bold text-[10px] px-2 py-0.5 rounded mt-1 uppercase tracking-wider">
                    {user.role}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
              <Link
                href="/negozi"
                className="bg-gray-50 hover:bg-gray-100 p-4 rounded border border-gray-200 transition-colors block text-center"
              >
                <div className="text-accent font-bold text-sm mb-1">Negozi Partner</div>
                <div className="text-xs text-gray-500">Esplora tutti i negozi e marchi</div>
              </Link>

              <Link
                href="/offerte"
                className="bg-gray-50 hover:bg-gray-100 p-4 rounded border border-gray-200 transition-colors block text-center"
              >
                <div className="text-accent font-bold text-sm mb-1">Tutte le Offerte</div>
                <div className="text-xs text-gray-500">Scopri le categorie di coupon</div>
              </Link>

              <Link
                href="/blog"
                className="bg-gray-50 hover:bg-gray-100 p-4 rounded border border-gray-200 transition-colors block text-center"
              >
                <div className="text-accent font-bold text-sm mb-1">Blog e Consigli</div>
                <div className="text-xs text-gray-500">Leggi le ultime novità sul risparmio</div>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
