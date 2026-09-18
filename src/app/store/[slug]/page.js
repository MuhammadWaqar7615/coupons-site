import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CouponCard from "./CouponCard";

const backendUrl = process.env.BACKEND_URL || "http://localhost:4000";

const safeDecode = (str) => {
  if (!str) return "";
  try {
    return decodeURIComponent(str);
  } catch {
    return str;
  }
};

export async function generateStaticParams() {
  const backendUrl = process.env.BACKEND_URL || "https://coupons-site-backend.vercel.app";
  try {
    const res = await fetch(`${backendUrl}/api/stores?active=true`, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      const stores = data.stores || [];
      const slugs = stores
        .filter((s) => s.slug && s.slug.trim())
        .map((s) => ({ slug: s.slug.trim() }));
      if (slugs.length > 0) return slugs;
    }
  } catch (err) {
    console.warn("generateStaticParams stores fetch failed:", err);
  }
  return [{ slug: "amazon" }, { slug: "nike" }];
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const decodedSlug = safeDecode(slug);

  try {
    const res = await fetch(
      `${backendUrl}/api/stores/${encodeURIComponent(decodedSlug)}`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) {
      return {
        title: "Store Not Found | CodiceSconto",
      };
    }

    const data = await res.json();
    const store = data.store;

    if (!store || !store.isActive) {
      return {
        title: "Store Not Found | CodiceSconto",
      };
    }

    return {
      title: store.seoTitle || `${store.name} Offerte e Codici Sconto | CodiceSconto`,
      description:
        store.seoDescription ||
        `Scopri le migliori offerte e codici sconto per ${store.name}.`,
    };
  } catch {
    return {
      title: "CodiceSconto",
    };
  }
}

export const revalidate = 60;

export default async function StorePage({ params }) {
  const { slug } = await params;
  const decodedSlug = safeDecode(slug);

  let store = null;
  try {
    const res = await fetch(
      `${backendUrl}/api/stores/${encodeURIComponent(decodedSlug)}`,
      { next: { revalidate: 60 } }
    );
    if (res.ok) {
      const data = await res.json();
      store = data.store;
    }
  } catch (err) {
    console.warn("Store fetch error:", err);
  }

  if (!store || !store.isActive) {
    notFound();
  }

  const coupons = store.coupons || [];

  return (
    <div className="flex flex-col min-h-screen bg-main">
      <Navbar />

      {/* Hero Banner Section */}
      <div className="bg-gradient-to-r from-[#7a4e6b] to-[#8d5e7d] w-full pt-4 pb-20 shadow-inner">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          {/* Breadcrumbs */}
          <div className="text-white/80 text-[12px] flex items-center gap-2 font-medium tracking-wide mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/negozi" className="hover:text-white transition-colors">
              Negozi
            </Link>
            <span>/</span>
            <span className="text-white">{store.name}</span>
          </div>

          <div className="md:ml-[280px]">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-sm">
              Codici Sconto e Offerte {store.name}
            </h1>
            <p className="text-white/90 text-sm md:text-base font-light max-w-2xl">
              Scopri tutte le offerte, i prodotti e i codici sconto attivi per acquistare
              su {store.name} al miglior prezzo. Tutte le promozioni sono verificate.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Overlapping Banner */}
      <main className="flex-grow w-full max-w-[1200px] mx-auto px-4 sm:px-6 pb-12 -mt-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Sidebar - Store Logo & Info */}
          <div className="w-full md:w-[250px] shrink-0">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 flex flex-col items-center sticky top-6">
              <div className="w-[160px] h-[160px] flex items-center justify-center p-4 mb-4 border border-gray-100 rounded-lg bg-white shadow-sm -mt-16">
                <img
                  src={store.logoPath}
                  alt={`${store.name} logo`}
                  className="max-w-full max-h-full object-contain"
                  loading="lazy"
                />
              </div>

              <h2 className="text-xl font-extrabold text-gray-800 mb-4 text-center">
                {store.name}
              </h2>

              <div className="w-full flex justify-between items-center text-sm text-gray-600 bg-gray-50 rounded-lg p-3 border border-gray-100">
                <span className="font-medium">Offerte attive</span>
                <span className="font-bold text-white bg-accent px-2.5 py-1 rounded-md text-xs">
                  {coupons.length}
                </span>
              </div>
            </div>
          </div>

          {/* Right Main Content - Products / Deals List */}
          <div className="flex-1 flex flex-col space-y-6 pt-2 md:pt-14">
            {coupons.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-10 text-center flex flex-col items-center justify-center">
                <svg
                  className="w-16 h-16 text-gray-300 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-gray-600 text-lg font-medium">
                  Nessuna offerta disponibile per {store.name}
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Torna a trovarci presto per nuovi codici sconto.
                </p>
              </div>
            ) : (
              <div className="flex flex-col space-y-4">
                {coupons.map((coupon) => (
                  <CouponCard key={coupon._id || coupon.id} coupon={coupon} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
