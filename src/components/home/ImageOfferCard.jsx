import React from 'react';
import Link from 'next/link';

function ImageOfferCard({ deal }) {
  const isTextOffer = deal.discount === "OMAGGIO";
  
  return (
    <Link href={deal.dealUrl || "#"} className="bg-white flex flex-col items-center h-full hover:shadow-md transition-shadow cursor-pointer relative pb-6 sm:pb-8 block">
      
      {/* Top Full-width Image */}
      <div className="w-full h-[150px] sm:h-[170px] overflow-hidden">
        <img
          src={deal.image || "/images/placeholder.png"}
          alt={deal.store}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Logo */}
      <div className="w-full flex justify-center items-center h-12 sm:h-14 mt-6">
        <img
          src={deal.logo || "/images/placeholder.png"}
          alt={deal.store}
          className="max-h-full max-w-[140px] object-contain px-2"
        />
      </div>
      
      {/* Middle Discount with Dotted Lines */}
      <div className="flex items-center justify-center w-full relative z-10 mt-5 px-5 sm:px-6">
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
      <div className="w-full text-center px-4 mt-6 flex-1 flex items-start justify-center">
        <span className="text-gray-500 text-[11px] sm:text-[12px] hover:text-accent transition-colors leading-relaxed">
          {deal.title}
        </span>
      </div>
      
    </Link>
  );
}

export default ImageOfferCard;
