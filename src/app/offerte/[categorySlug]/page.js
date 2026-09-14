import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DealCard from "@/components/home/DealCard";
import Link from "next/link";

const safeDecode = (str) => {
  if (!str) return "";
  try {
    return decodeURIComponent(str);
  } catch {
    return str;
  }
};

const backendUrl = process.env.BACKEND_URL || "http://localhost:4000";

export async function generateMetadata({ params }) {
  const { categorySlug } = await params;
  const decodedCatSlug = safeDecode(categorySlug);

  try {
    const res = await fetch(
      `${backendUrl}/api/categories/${encodeURIComponent(decodedCatSlug)}`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return { title: "Categoria non trovata | CodiceSconto" };

    const data = await res.json();
    const category = data.category;
    if (!category || category.status !== "enabled") {
      return { title: "Categoria non trovata | CodiceSconto" };
    }

    return {
      title: category.seoTitle || `${category.title} Offerte e Codici Sconto | CodiceSconto`,
      description: category.seoDescription || category.description || `Scopri tutte le offerte e i codici sconto per ${category.title}.`,
    };
  } catch {
    return { title: "CodiceSconto" };
  }
}

export const revalidate = 60;

export default async function CategoryPage({ params }) {
  const { categorySlug } = await params;
  const decodedCatSlug = safeDecode(categorySlug);

  // 1. Fetch category details
  const catRes = await fetch(
    `${backendUrl}/api/categories/${encodeURIComponent(decodedCatSlug)}`,
    { next: { revalidate: 60 } }
  );

  if (!catRes.ok) {
    notFound();
  }

  const catData = await catRes.json();
  const category = catData.category;

  if (!category || category.status !== "enabled") {
    notFound();
  }

  // 2. Fetch stores for this category (which includes their active coupons)
  const storesRes = await fetch(
    `${backendUrl}/api/stores?category=${encodeURIComponent(decodedCatSlug)}&active=true`,
    { next: { revalidate: 60 } }
  );
  let coupons = [];

  if (storesRes.ok) {
    const storesData = await storesRes.json();
    const stores = storesData.stores || [];

    // 3. Extract and flatten coupons from the stores
    stores.forEach((store) => {
      if (store.coupons && Array.isArray(store.coupons)) {
        store.coupons.forEach((coupon) => {
          if (coupon.isActive !== false) {
            coupons.push({
              ...coupon,
              store: store.name,
              logo: store.logoPath || "/images/placeholder.png",
              dealUrl: store.slug ? `/store/${store.slug}` : "#",
              storeId: {
                id: store._id,
                name: store.name,
                slug: store.slug,
                logoPath: store.logoPath,
                _id: store._id,
              },
            });
          }
        });
      }
    });

    // 4. Sort coupons: featured first, then by createdAt desc
    coupons.sort((a, b) => {
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      const dateA = new Date(a.createdAt || 0);
      const dateB = new Date(b.createdAt || 0);
      return dateB - dateA;
    });
  }

  return (
    <div className="flex flex-col min-h-screen bg-main">
      <Navbar />

      {/* Top Banner */}
      <div className="bg-primary-dark w-full py-4 mb-4">
        <div className="max-w-[1040px] mx-auto px-4 sm:px-6">
          <h1 className="text-white text-2xl font-light">
            Offerte e codici sconto <span className="font-bold">{category.title}</span>
          </h1>
          {category.description && (
            <p className="text-white/80 mt-2 text-sm">{category.description}</p>
          )}
        </div>
      </div>

      <main className="flex-grow w-full mb-12">
        <div className="max-w-[1040px] mx-auto px-4 sm:px-6">
          {/* Breadcrumb */}
          <div className="text-[12px] text-gray-500 mb-6 border-b border-[#eaeaea] pb-4">
            <Link href="/" className="hover:underline cursor-pointer">
              CodiceSconto
            </Link>{" "}
            {">"}{" "}
            <Link href="/offerte" className="hover:underline cursor-pointer">
              Categorie
            </Link>{" "}
            {">"}{" "}
            <span className="text-gray-800 font-semibold">{category.title}</span>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Main Content */}
            <div className="flex-1">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-800 border-b-2 border-accent inline-block pb-1 mb-4">
                  Tutti i coupon {category.title}
                </h2>
              </div>

              {coupons.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[10px]">
                  {coupons.map((coupon) => (
                    <DealCard key={coupon._id || coupon.id} deal={coupon} />
                  ))}
                </div>
              ) : (
                <div className="bg-white p-8 text-center text-gray-500 rounded border border-gray-100">
                  Nessun coupon trovato per questa categoria al momento.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
