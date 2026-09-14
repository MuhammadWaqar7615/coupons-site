import React from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DealCard from "@/components/home/DealCard";

const safeDecode = (str) => {
  if (!str) return "";
  try {
    return decodeURIComponent(str);
  } catch {
    return str;
  }
};

const backendUrl = process.env.BACKEND_URL || "http://localhost:4000";

export async function generateMetadata({ searchParams }) {
  const { q } = await searchParams;
  const query = safeDecode(q || "").trim();
  return {
    title: query ? `Ricerca: ${query} | CodiceSconto` : "Cerca codici sconto | CodiceSconto",
    description: `Cerca tra migliaia di codici sconto, coupon e offerte verificate per i tuoi negozi preferiti.`,
  };
}

export const dynamic = "force-dynamic";

export default async function CercaPage({ searchParams }) {
  const { q } = await searchParams;
  const query = safeDecode(q || "").trim();

  let stores = [];
  let coupons = [];

  if (query.length > 0) {
    try {
      const res = await fetch(
        `${backendUrl}/api/search?q=${encodeURIComponent(query)}`,
        { cache: "no-store" }
      );
      if (res.ok) {
        const data = await res.json();
        stores = data.stores || [];
        coupons = (data.coupons || []).map((c) => ({
          ...c,
          store: c.store?.name || c.storeId?.name || "Store",
          logo: c.store?.logoPath || c.storeId?.logoPath || "/images/placeholder.png",
          dealUrl: c.store?.slug || c.storeId?.slug ? `/store/${c.store?.slug || c.storeId?.slug}` : "#",
        }));
      }
    } catch (err) {
      console.error("Search fetch error:", err);
    }
  }

  const hasResults = stores.length > 0 || coupons.length > 0;

  return (
    <div className="flex flex-col min-h-screen bg-main">
      <Navbar />

      {/* Sub-navbar header */}
      <div className="bg-primary-dark w-full py-4 mb-4">
        <div className="max-w-[1040px] mx-auto px-4 sm:px-6">
          <h1 className="text-white text-2xl font-light">
            {query ? (
              <>
                Risultati per: <span className="font-bold text-white">&quot;{query}&quot;</span>
              </>
            ) : (
              "Cerca sconti e negozi"
            )}
          </h1>
        </div>
      </div>

      <main className="flex-grow w-full mb-12">
        <div className="max-w-[1040px] mx-auto px-4 sm:px-6">
          {/* Breadcrumb */}
          <div className="text-[12px] text-gray-500 mb-6 border-b border-[#eaeaea] pb-4">
            <Link href="/" className="hover:underline cursor-pointer">
              CodiceSconto
            </Link>{" "}
            {">"} <span>Ricerca</span>
            {query && (
              <>
                {" "}
                {">"} <span className="text-gray-800 font-semibold">&quot;{query}&quot;</span>
              </>
            )}
          </div>

          {/* Search Bar on Page */}
          <div className="bg-white p-6 rounded-md shadow-sm border border-gray-100 mb-8">
            <form action="/cerca" method="GET" className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                name="q"
                defaultValue={query}
                placeholder="Cerca un negozio o un'offerta (es. Nike, Amazon, scarpe...)"
                className="flex-1 border border-gray-300 rounded-sm py-2.5 px-4 text-[14px] text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
              />
              <button
                type="submit"
                className="bg-accent hover:bg-accent-hover text-white font-bold text-[13px] uppercase tracking-wider py-2.5 px-6 rounded-sm transition-colors cursor-pointer"
              >
                Cerca
              </button>
            </form>
          </div>

          {!query ? (
            <div className="bg-white p-12 text-center rounded-md border border-gray-100 shadow-sm">
              <p className="text-gray-600 text-lg mb-2">Inserisci un termine di ricerca sopra.</p>
              <p className="text-gray-400 text-sm mb-6">
                Trova codici sconto, voucher e promozioni attive per centinaia di marchi.
              </p>
              <Link
                href="/negozi"
                className="inline-block bg-primary-dark hover:bg-primary-dark-hover text-white font-semibold text-sm py-2.5 px-6 rounded-sm transition-colors"
              >
                Sfoglia tutti i negozi
              </Link>
            </div>
          ) : !hasResults ? (
            <div className="bg-white p-12 text-center rounded-md border border-gray-100 shadow-sm">
              <svg
                className="w-16 h-16 text-gray-300 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <h2 className="text-gray-700 text-xl font-bold mb-2">
                Nessun risultato trovato per &quot;{query}&quot;
              </h2>
              <p className="text-gray-500 text-sm max-w-md mx-auto mb-6">
                Verifica l&apos;ortografia o prova a cercare un termine più generico. Puoi anche
                esplorare il nostro elenco completo di negozi partner.
              </p>
              <div className="flex justify-center gap-4">
                <Link
                  href="/negozi"
                  className="bg-accent hover:bg-accent-hover text-white font-bold text-xs uppercase tracking-wider py-2.5 px-5 rounded-sm transition-colors"
                >
                  Tutti i negozi
                </Link>
                <Link
                  href="/offerte"
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs uppercase tracking-wider py-2.5 px-5 rounded-sm transition-colors"
                >
                  Tutte le categorie
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-10">
              {/* Stores Results */}
              {stores.length > 0 && (
                <div>
                  <h2 className="text-lg font-bold text-gray-800 border-b-2 border-accent inline-block pb-1 mb-4">
                    Negozi ({stores.length})
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {stores.map((store) => (
                      <Link
                        key={store._id || store.id}
                        href={`/store/${store.slug ? encodeURIComponent(store.slug) : ""}`}
                        className="bg-white border border-transparent hover:border-gray-200 rounded-sm shadow-sm hover:shadow-md transition-shadow p-4 flex flex-col items-center justify-center h-[120px] group"
                      >
                        <div className="h-12 w-full relative flex items-center justify-center mb-2">
                          {store.logoPath ? (
                            <img
                              src={store.logoPath}
                              alt={store.name}
                              className="max-h-full max-w-full object-contain"
                            />
                          ) : (
                            <span className="text-xs text-gray-400">Logo</span>
                          )}
                        </div>
                        <span className="text-gray-600 text-xs font-medium text-center group-hover:text-accent transition-colors line-clamp-1 w-full">
                          {store.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Coupons Results */}
              {coupons.length > 0 && (
                <div>
                  <h2 className="text-lg font-bold text-gray-800 border-b-2 border-accent inline-block pb-1 mb-4">
                    Coupon e Offerte ({coupons.length})
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {coupons.map((coupon) => (
                      <DealCard key={coupon._id || coupon.id} deal={coupon} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
