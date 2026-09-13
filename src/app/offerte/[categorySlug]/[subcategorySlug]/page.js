import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DealCard from "@/components/home/DealCard";
import Link from "next/link";


export const revalidate = 60;

export default async function SubcategoryPage({ params }) {
  const { categorySlug, subcategorySlug } = await params;

  const backendUrl = process.env.BACKEND_URL || 'http://localhost:4000';

  // 1. Fetch category details
  const catRes = await fetch(`${backendUrl}/api/categories/${encodeURIComponent(categorySlug)}`, { next: { revalidate: 60 } });
  
  if (!catRes.ok) {
    notFound();
  }
  
  const catData = await catRes.json();
  const category = catData.category;

  if (!category || category.status !== "enabled") {
    notFound();
  }

  // 2. Find subcategory in category
  const subcategory = category.subcategories?.find(s => s.slug === subcategorySlug && s.status === "enabled");

  if (!subcategory) {
    notFound();
  }

  // 3. Fetch stores for the parent category (which includes their active coupons and subcategory associations)
  const storesRes = await fetch(`${backendUrl}/api/stores?category=${encodeURIComponent(categorySlug)}&active=true`, { next: { revalidate: 60 } });
  let coupons = [];
  
  if (storesRes.ok) {
    const storesData = await storesRes.json();
    const allCategoryStores = storesData.stores || [];
    
    // Filter stores that belong to this subcategory
    const subcategoryStores = allCategoryStores.filter(store => 
      store.subcategories && store.subcategories.includes(subcategory._id)
    );
    
    // 4. Extract and flatten coupons from the subcategory stores
    subcategoryStores.forEach(store => {
      if (store.coupons && Array.isArray(store.coupons)) {
        store.coupons.forEach(coupon => {
          coupons.push({
            ...coupon,
            storeId: { id: store._id, name: store.name, slug: store.slug, logoPath: store.logoPath, _id: store._id },
            store: { id: store._id, name: store.name, slug: store.slug, logoPath: store.logoPath, _id: store._id },
          });
        });
      }
    });

    // 5. Sort coupons: featured first, then by createdAt desc
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
            Offerte e codici sconto <span className="font-bold">{subcategory.title}</span>
          </h1>
          {subcategory.description && (
            <p className="text-white/80 mt-2 text-sm">{subcategory.description}</p>
          )}
        </div>
      </div>

      <main className="flex-grow w-full mb-12">
        <div className="max-w-[1040px] mx-auto px-4 sm:px-6">

          {/* Breadcrumb */}
          <div className="text-[12px] text-gray-500 mb-6 border-b border-[#eaeaea] pb-4">
            <Link href="/" className="hover:underline cursor-pointer">CodiceSconto</Link> {'>'}{" "}
            <Link href="/offerte" className="hover:underline cursor-pointer">Categorie</Link> {'>'}{" "}
            <Link href={`/offerte/${category.slug}`} className="hover:underline cursor-pointer">{category.title}</Link> {'>'}{" "}
            <span className="text-gray-800 font-semibold">{subcategory.title}</span>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Main Content */}
            <div className="flex-1">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-800 border-b-2 border-accent inline-block pb-1 mb-4">
                  Tutti i coupon {subcategory.title}
                </h2>
              </div>

              {coupons.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[10px]">
                  {coupons.map((coupon) => (
                    <DealCard key={coupon._id} deal={coupon} />
                  ))}
                </div>
              ) : (
                <div className="bg-white p-8 text-center text-gray-500 rounded border border-gray-100">
                  Nessun coupon trovato per questa sottocategoria al momento.
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
