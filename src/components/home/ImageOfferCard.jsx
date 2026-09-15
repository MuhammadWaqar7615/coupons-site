import React from 'react';
import Link from 'next/link';

function ImageOfferCard({ deal }) {
  return (
    <Link
      href={deal.dealUrl || "#"}
      className="group block h-full overflow-hidden rounded-[8px] border border-[#E1EAF4] bg-white p-2 shadow-[0_2px_8px_rgba(0,40,92,0.06)] transition-shadow hover:shadow-md sm:p-2.5"
    >
      <div className="aspect-[1.55] w-full overflow-hidden rounded-[5px] bg-[#EDF3FA]">
        <img
          src={deal.image || "/images/placeholder.png"}
          alt={deal.store}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>

      <span className="mx-1 mt-2 block rounded-[4px] bg-[#0B1F4D] px-2 py-2 text-center text-[9px] font-bold uppercase tracking-wide text-white transition-colors group-hover:bg-[#1F5FD6] sm:mx-2 sm:mt-2.5">
        Scopri l&apos;offerta
      </span>
    </Link>
  );
}

export default ImageOfferCard;
