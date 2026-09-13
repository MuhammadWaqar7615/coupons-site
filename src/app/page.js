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

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-main">
      <Navbar />

      <main className="flex-grow">
        <HeroSection />
        <Banner />
        <MosaicGrid />
        <SecondaryOffers />
        <PromoBanner />
        <CodeLists />
        <Newsletter />
      </main>

      <Footer />
    </div>
  );
}
