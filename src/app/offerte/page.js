import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export const revalidate = 60;

const defaultCategories = [
  {
    _id: "c1",
    title: "Abbigliamento e Moda",
    slug: "abbigliamento-e-moda",
    image: "/images/placeholder.png",
    subs: [
      { _id: "s1", title: "Scarpe e Calzature", slug: "scarpe-e-calzature", status: "enabled" },
      { _id: "s2", title: "Accessori Moda", slug: "accessori-moda", status: "enabled" },
      { _id: "s3", title: "Borse e Valigie", slug: "borse-e-valigie", status: "enabled" },
    ],
  },
  {
    _id: "c2",
    title: "Elettronica e Informatica",
    slug: "elettronica-e-informatica",
    image: "/images/placeholder.png",
    subs: [
      { _id: "s4", title: "Smartphone e Telefonia", slug: "smartphone-e-telefonia", status: "enabled" },
      { _id: "s5", title: "Computer e Tablet", slug: "computer-e-tablet", status: "enabled" },
      { _id: "s6", title: "TV e Audio", slug: "tv-e-audio", status: "enabled" },
    ],
  },
  {
    _id: "c3",
    title: "Viaggi e Vacanze",
    slug: "viaggi-e-vacanze",
    image: "/images/placeholder.png",
    subs: [
      { _id: "s7", title: "Voli e Compagnie Aeree", slug: "voli-e-compagnie-aeree", status: "enabled" },
      { _id: "s8", title: "Hotel e Alloggi", slug: "hotel-e-alloggi", status: "enabled" },
      { _id: "s9", title: "Noleggio Auto", slug: "noleggio-auto", status: "enabled" },
    ],
  },
  {
    _id: "c4",
    title: "Salute e Bellezza",
    slug: "salute-e-bellezza",
    image: "/images/placeholder.png",
    subs: [
      { _id: "s10", title: "Farmacie Online", slug: "farmacie-online", status: "enabled" },
      { _id: "s11", title: "Profumi e Cosmetici", slug: "profumi-e-cosmetici", status: "enabled" },
    ],
  },
  {
    _id: "c5",
    title: "Casa e Giardino",
    slug: "casa-e-giardino",
    image: "/images/placeholder.png",
    subs: [
      { _id: "s12", title: "Arredamento", slug: "arredamento", status: "enabled" },
      { _id: "s13", title: "Bricolage e Fai da Te", slug: "bricolage-fai-da-te", status: "enabled" },
    ],
  },
  {
    _id: "c6",
    title: "Sport e Tempo Libero",
    slug: "sport-e-tempo-libero",
    image: "/images/placeholder.png",
    subs: [
      { _id: "s14", title: "Abbigliamento Sportivo", slug: "abbigliamento-sportivo", status: "enabled" },
      { _id: "s15", title: "Attrezzatura Fitness", slug: "attrezzatura-fitness", status: "enabled" },
    ],
  },
];

export default async function OffertePage() {
  const backendUrl = process.env.BACKEND_URL || "https://coupons-site-backend.vercel.app";
  let rawCategories = [];
  try {
    const res = await fetch(`${backendUrl}/api/categories?status=enabled`, { next: { revalidate: 60 } });
    if (res.ok) {
      const data = await res.json();
      rawCategories = data.categories || [];
    }
  } catch (err) {
    console.error("Failed to fetch categories:", err);
  }

  const backendCategories = rawCategories.map((cat) => ({
    ...cat,
    subs: (cat.subs || cat.subcategories || []).filter((s) => s.status === "enabled"),
  }));

  const categories = backendCategories.length > 0 ? backendCategories : defaultCategories;

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
              <div key={category._id || category.id} className="bg-white shadow-sm flex flex-col">
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
                  {category.subs && category.subs.length > 0 && (
                    <ul className="mt-2">
                      {category.subs.map((item) => (
                        <li
                          key={item._id || item.id}
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
