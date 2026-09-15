import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/home/HeroSection";
import Banner from "@/components/home/Banner";
import MosaicGrid from "@/components/home/MosaicGrid";
import SecondaryOffers from "@/components/home/SecondaryOffers";
import PromoBanner from "@/components/home/PromoBanner";
import CodeLists from "@/components/home/CodeLists";
import Newsletter from "@/components/home/Newsletter";
import Footer from "@/components/layout/Footer";

export const revalidate = 60;

export default async function Home() {
  const backendUrl = process.env.BACKEND_URL || "http://localhost:4000";

  let heroSlides = [];
  let heroBadges = [];
  let categories = [];
  let featuredDeals = [];
  let secondaryDeals = [];
  let newCodes = [];
  let expiringCodes = [];
  let promoBanner = null;

  try {
    const [slidersRes, badgesRes, categoriesRes, featuresRes, promoBannersRes] = await Promise.all([
      fetch(`${backendUrl}/api/sliders?status=enabled`, { next: { revalidate: 60 } }).catch(() => null),
      fetch(`${backendUrl}/api/badges`, { next: { revalidate: 60 } }).catch(() => null),
      fetch(`${backendUrl}/api/categories?status=enabled`, { next: { revalidate: 60 } }).catch(() => null),
      fetch(`${backendUrl}/api/features`, { next: { revalidate: 60 } }).catch(() => null),
      fetch(`${backendUrl}/api/promo-banners?status=enabled`, { next: { revalidate: 60 } }).catch(() => null),
    ]);

    if (slidersRes && slidersRes.ok) {
      const slidersData = await slidersRes.json();
      heroSlides = (slidersData.sliders || []).map((slider) => ({
        id: slider._id,
        image: slider.image,
        logo: slider.logo || slider.image,
        text: slider.description || slider.title,
        discount: slider.discount || slider.title,
        link: slider.link || "#",
      }));
    }

    if (badgesRes && badgesRes.ok) {
      const badgesData = await badgesRes.json();
      heroBadges = (badgesData.badges || []).map((badge) => ({
        name: badge.name,
        logo: badge.image,
      }));
    }

    if (categoriesRes && categoriesRes.ok) {
      const categoriesData = await categoriesRes.json();
      categories = (categoriesData.categories || []).map((category) => ({
        id: category._id,
        name: category.title || category.name || "",
        image: category.image || "/images/placeholder.png",
        link: category.slug ? `/offerte/${category.slug}` : "#",
      }));
    }

    if (featuresRes && featuresRes.ok) {
      const featuresData = await featuresRes.json();
      const features = featuresData.features || [];

      featuredDeals = features
        .filter((feature) => feature.homepageSection === "featured")
        .map((feature) => ({
          store: feature.storeId?.name || "Store",
          discount: feature.discount || "",
          labelTop: feature.labelTop || "",
          labelBottom: feature.labelBottom || "",
          title: feature.title || "",
          dealUrl: feature.storeId?.slug ? `/store/${feature.storeId.slug}` : "#",
          logo: feature.storeId?.logoPath || "",
          image: feature.image || "/images/placeholder.png",
        }));

      secondaryDeals = features
        .filter((feature) => feature.homepageSection === "secondary")
        .map((feature) => ({
          store: feature.storeId?.name || "Store",
          discount: feature.discount || "",
          labelTop: feature.labelTop || "",
          labelBottom: feature.labelBottom || "",
          title: feature.title || "",
          dealUrl: feature.storeId?.slug ? `/store/${feature.storeId.slug}` : "#",
          logo: feature.storeId?.logoPath || "/images/placeholder.png",
          image: feature.image || "/images/placeholder.png",
        }));

      newCodes = features
        .filter((feature) => feature.homepageSection === "new")
        .map((feature) => ({
          tag: "",
          title: feature.title || "",
          logo: feature.storeId?.logoPath || "/images/placeholder.png",
          dealUrl: feature.storeId?.slug ? `/store/${feature.storeId.slug}` : "#",
        }));

      expiringCodes = features
        .filter((feature) => feature.homepageSection === "expiring")
        .map((feature) => ({
          tag: "",
          title: feature.title || "",
          logo: feature.storeId?.logoPath || "/images/placeholder.png",
          dealUrl: feature.storeId?.slug ? `/store/${feature.storeId.slug}` : "#",
        }));
    }

    if (promoBannersRes && promoBannersRes.ok) {
      const promoData = await promoBannersRes.json();
      promoBanner = promoData.promoBanners?.[0] || null;
    }
  } catch (err) {
    console.error("Failed to prefetch homepage data on server:", err);
  }

  return (
    <div className="flex flex-col min-h-screen bg-main">
      <Navbar />

      <main className="flex-grow">
        <HeroSection initialSlides={heroSlides} initialBadges={heroBadges} />
        <Banner initialCategories={categories} />
        <MosaicGrid deals={featuredDeals} />
        <SecondaryOffers deals={secondaryDeals} />
        <PromoBanner promoBanner={promoBanner} />
        <CodeLists newCodes={newCodes} expiringCodes={expiringCodes} />
        <Newsletter />
      </main>

      <Footer />
    </div>
  );
}

