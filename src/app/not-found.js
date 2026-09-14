import React from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-main">
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-16 px-4">
        <div className="max-w-[600px] w-full bg-white rounded-lg shadow-sm border border-gray-100 p-8 sm:p-12 text-center">
          <div className="text-6xl sm:text-7xl font-extrabold text-accent mb-4 tracking-tighter">
            404
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
            Pagina non trovata
          </h1>
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-8">
            La pagina che stai cercando non esiste, è stata rimossa o l&apos;indirizzo digitato non è
            corretto. Usa i collegamenti sottostanti per continuare a navigare.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href="/"
              className="bg-accent hover:bg-accent-hover text-white font-bold text-xs uppercase tracking-wider py-3 px-6 rounded-sm transition-colors"
            >
              Torna alla Home
            </Link>
            <Link
              href="/negozi"
              className="bg-primary-dark hover:bg-primary-dark-hover text-white font-bold text-xs uppercase tracking-wider py-3 px-6 rounded-sm transition-colors"
            >
              Tutti i negozi
            </Link>
            <Link
              href="/offerte"
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs uppercase tracking-wider py-3 px-6 rounded-sm transition-colors"
            >
              Tutte le offerte
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
