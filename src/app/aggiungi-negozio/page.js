import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function AggiungiNegozioPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      
      <main className="flex-grow w-full bg-main">
        <div className="max-w-[1000px] mx-auto px-4 py-8">
          
          <div className="bg-white border border-[#e5e5e5] rounded-[4px] p-[30px] md:p-[40px] shadow-sm">
            <h1 className="text-accent text-[24px] md:text-[28px] font-normal uppercase mb-[16px] tracking-wide">
              AGGIUNGI IL TUO NEGOZIO SU CODICESCONTO
            </h1>
            <p className="text-[#666666] text-[15px] leading-relaxed mb-[16px]">
              CodiceSconto, il portale dedicato a codici sconto, sconti, offerte e voucher, è una realtà tutta italiana che dal 2008 si occupa di entrare in contatto con le principali realtà commerciali per raccogliere e mettere a disposizione dei propri utenti le promozioni più esclusive del momento.
            </p>
            <a href="#" className="text-[#0073e6] hover:underline text-[15px] font-medium">
              Aggiungi il tuo negozio e le tue offerte su CodiceSconto!
            </a>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
