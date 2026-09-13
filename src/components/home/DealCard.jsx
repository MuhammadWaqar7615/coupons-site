import React from 'react';
import Link from 'next/link';

function DealCard({ deal }) {
  const isTextOffer = deal.discount === "OFFERTA";
  
  return (
    <Link 
      href={deal.dealUrl || "#"}
      className="bg-white flex flex-col items-center h-[240px] hover:shadow-md transition-shadow cursor-pointer relative px-5 sm:px-6 group"
    >
      
      {/* Top Logo */}
      <div className="w-full flex-1 flex justify-center items-start pt-6 sm:pt-8">
        <div className="flex items-center justify-center w-full h-12 sm:h-14">
          <img
            src={deal.logo || "/images/placeholder.png"}
            alt={deal.store || "Store logo"}
            className="max-h-full max-w-[150px] sm:max-w-[180px] object-contain"
          />
        </div>
      </div>
      
      {/* Middle Discount with Dotted Lines */}
      <div className="flex items-center justify-center w-full relative z-10">
        <div className="flex-grow border-t border-dashed border-accent"></div>
        
        <div className="px-4 flex flex-col items-center justify-center min-w-[120px]">
          {deal.labelTop && (
            <span className="text-[11px] font-bold text-gray-500 mb-0.5 uppercase tracking-wider">{deal.labelTop}</span>
          )}
          
          <span className={`${isTextOffer ? 'text-[15px] tracking-widest uppercase mt-1' : 'text-[36px]'} font-bold text-accent leading-none`}>
            {deal.discount}
          </span>
          
          {deal.labelBottom && (
            <span className="text-[11px] font-bold text-accent mt-1 uppercase tracking-wider">{deal.labelBottom}</span>
          )}
        </div>
        
        <div className="flex-grow border-t border-dashed border-accent"></div>
      </div>
      
      {/* Description */}
      <div className="w-full flex-1 flex justify-center items-end pb-6 sm:pb-8 text-center px-1">
        <span
          className="text-gray-500 text-[11px] sm:text-[12px] group-hover:text-accent transition-colors leading-relaxed"
        >
          {deal.title}
        </span>
      </div>
      
    </Link>
  );
}

export default DealCard;
