"use client";
import { useState } from "react";

export default function CouponCard({ coupon }) {
  const [showCode, setShowCode] = useState(false);

  const handleAction = () => {
    if (coupon.type === "code") {
      setShowCode(true);
    } else if (coupon.type === "link" && coupon.couponUrl) {
      window.open(coupon.couponUrl, "_blank");
    }
  };

  const handleCopyCode = () => {
    if (coupon.code) {
      navigator.clipboard.writeText(coupon.code);
      alert("Code copied!");
    }
  };

  // Format date safely
  const formatExpiry = (dateString) => {
    if (!dateString) return "Senza scadenza";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Senza scadenza";
    return `Scade il ${date.toLocaleDateString('it-IT')}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-gray-100 hover:border-accent/30 hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row overflow-hidden group">
      
      {/* Left Discount Badge */}
      <div className="w-full md:w-[180px] bg-gradient-to-b from-[#fdfbfd] to-[#f8f4f7] md:border-r-2 md:border-dashed border-gray-200 flex flex-col items-center justify-center p-6 flex-shrink-0 relative">
        {coupon.isFeatured && (
          <span className="absolute top-0 left-0 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2 py-1 rounded-br-lg uppercase tracking-wider shadow-sm">
            Top
          </span>
        )}
        <span className="text-[32px] font-extrabold text-gray-800 leading-none text-center tracking-tighter">
          {coupon.discount}
        </span>
        <span className="text-[12px] font-bold text-accent uppercase tracking-widest mb-1 mt-2 md:mt-0">
          {coupon.type === 'code' ? 'CODICE' : 'OFFERTA'}
        </span>
      </div>

      {/* Middle Content */}
      <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
        <h3 className="text-lg md:text-[22px] font-bold text-gray-800 mb-3 hover:text-accent cursor-pointer transition-colors leading-snug">
          {coupon.title}
        </h3>
        <p className="text-[15px] text-gray-600 mb-4 line-clamp-2 leading-relaxed font-light">
          {coupon.description}
        </p>
        {coupon.terms && (
          <p className="text-[12px] text-gray-400 mb-4 line-clamp-1 italic bg-gray-50 p-2 rounded-md border border-gray-100 inline-block">
            {coupon.terms}
          </p>
        )}
        
        <div className="flex flex-wrap items-center text-[13px] text-gray-500 gap-4 mt-auto">
          <span className="flex items-center gap-1.5 text-green-600 font-semibold bg-green-50 px-2.5 py-1 rounded-full">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
            Verificato
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {formatExpiry(coupon.expiresAt)}
          </span>
        </div>
      </div>

      {/* Right Action Button */}
      <div className="w-full md:w-[220px] p-6 flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-gray-100 bg-main/50">
        {showCode ? (
          <div className="w-full flex flex-col gap-2">
            <div 
              onClick={handleCopyCode}
              className="w-full border-2 border-dashed border-accent bg-white text-accent text-center font-mono text-[16px] font-bold py-3 px-2 rounded-lg cursor-pointer hover:bg-accent-light hover:scale-[1.02] active:scale-[0.98] transition-all shadow-sm relative group"
              title="Clicca per copiare"
            >
              <span className="block group-hover:opacity-0 transition-opacity absolute inset-0 flex items-center justify-center">{coupon.code}</span>
              <span className="block opacity-0 group-hover:opacity-100 transition-opacity absolute inset-0 flex items-center justify-center">Copia Codice</span>
            </div>
            <a 
              href={coupon.couponUrl || "#"} 
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-center text-gray-500 hover:text-accent underline underline-offset-2 mt-1"
            >
              Vai al negozio
            </a>
          </div>
        ) : (
          <button 
            onClick={handleAction}
            className="w-full bg-accent hover:bg-accent-hover text-white text-[14px] font-bold py-3.5 px-4 rounded-lg transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm uppercase tracking-wide flex items-center justify-center gap-2"
          >
            {coupon.type === 'code' ? 'Mostra Codice' : 'Vedi L\'offerta'}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
          </button>
        )}
      </div>
    </div>
  );
}
