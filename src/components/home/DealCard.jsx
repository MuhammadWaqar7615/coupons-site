import React from 'react';
import Link from 'next/link';

function DealCard({ deal }) {
  const isTextOffer = deal.discount === "OFFERTA";
  const storeName =
    typeof deal.store === "string"
      ? deal.store
      : deal.store?.name || deal.storeId?.name || "Store";
  const storeLogo =
    deal.logo ||
    deal.store?.logoPath ||
    deal.storeId?.logoPath ||
    "/images/placeholder.png";
  const storeSlug =
    deal.storeId?.slug ||
    (typeof deal.store === "object" ? deal.store?.slug : null);
  const targetUrl =
    deal.dealUrl ||
    (storeSlug ? `/store/${encodeURIComponent(storeSlug)}` : "#");

  return (
    <Link 
      href={targetUrl}
      className="bg-white flex flex-col items-center h-[205px] hover:shadow-md transition-shadow cursor-pointer relative px-4 sm:px-5 group"
    >
      {/* Top Logo */}
      <div className="w-full flex-1 flex justify-center items-start pt-4 sm:pt-5">
        <div className="flex items-center justify-center w-full h-10 sm:h-11">
          <img
            src={storeLogo}
            alt={storeName}
            className="max-h-full max-w-[150px] sm:max-w-[180px] object-contain"
          />
        </div>
      </div>

      {/* Middle Discount with Dotted Lines */}
      <div className="flex items-center justify-center w-full relative z-10">
        <div className="flex-grow border-t border-dashed border-accent"></div>

        <div className="px-3 flex flex-col items-center justify-center min-w-[105px]">
          {deal.labelTop && (
            <span className="text-[11px] font-bold text-gray-500 mb-0.5 uppercase tracking-wider">
              {deal.labelTop}
            </span>
          )}

          <span
            className={`${
              isTextOffer
                ? "text-[15px] tracking-widest uppercase mt-1"
                : "text-[30px]"
            } font-bold text-accent leading-none`}
          >
            {deal.discount}
          </span>

          {deal.labelBottom && (
            <span className="text-[11px] font-bold text-accent mt-1 uppercase tracking-wider">
              {deal.labelBottom}
            </span>
          )}
        </div>

        <div className="flex-grow border-t border-dashed border-accent"></div>
      </div>

      {/* Description */}
      <div className="w-full flex-1 flex justify-center items-end pb-4 sm:pb-5 text-center px-1">
        <span className="text-gray-500 text-[11px] sm:text-[12px] group-hover:text-accent transition-colors leading-relaxed line-clamp-2">
          {deal.title}
        </span>
      </div>
    </Link>
  );
}

export default DealCard;
