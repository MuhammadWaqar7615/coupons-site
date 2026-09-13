import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import Link from "next/link";

export const revalidate = 60;

export default async function OffertePage() {
  const backendUrl = process.env.BACKEND_URL || 'http://localhost:4000';
  const res = await fetch(`${backendUrl}/api/categories?status=enabled`, { next: { revalidate: 60 } });
  
  if (!res.ok) {
    throw new Error('Failed to fetch categories');
  }
  
  const data = await res.json();
  const rawCategories = data.categories || [];

  const categories = rawCategories.map((cat) => ({
    ...cat,
    subs: (cat.subs || []).filter(s => s.status === "enabled"),
  }));

  return (
    <div className="flex flex-col min-h-screen bg-main">
      <Navbar />

      {/* Top Banner */}
      <div className="bg-primary-dark w-full py-4 mb-4">
        <div className="max-w-[1040px] mx-auto px-4 sm:px-6">
          <h1 className="text-white text-2xl font-light">Tutte le categorie</h1>
        </div>
      </div>

      <main className="flex-grow w-full">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6">

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[10px]">
            {categories.map((category) => (
              <div key={category._id} className="bg-white shadow-sm flex flex-col">
                <Link href={`/offerte/${category.slug}`}>
                  <img
                    src={category.image || "/images/placeholder.png"}
                    alt={category.title}
                    className="w-full h-[150px] object-cover cursor-pointer hover:opacity-90 transition-opacity"
                  />
                </Link>
                <div className="p-3 px-10">
                  <Link href={`/offerte/${category.slug}`}>
                    <h2 className="text-accent font-bold text-[14px] mb-1 cursor-pointer hover:underline">{category.title}</h2>
                  </Link>
                  {category.subs.length > 0 && (
                    <ul className="mt-2">
                      {category.subs.map((item) => (
                        <li
                          key={item._id}
                          className="text-[#666] text-[14px] border-t border-dotted border-[#e5e5e5] py-1"
                        >
                          <Link href={`/offerte/${category.slug}/${item.slug}`} className="hover:text-accent hover:underline">
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Breadcrumb */}
          <div className="text-[12px] text-gray-500 mb-8 border-t border-[#eaeaea] pt-4 mt-8">
            <Link href="/" className="hover:underline cursor-pointer">CodiceSconto</Link> {'>'} <span className="hover:underline cursor-pointer text-gray-800 font-semibold">Categorie</span>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
