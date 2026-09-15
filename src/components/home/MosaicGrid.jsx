"use client";

import React, { useState, useEffect } from 'react';
import ImageOfferCard from './ImageOfferCard';

function MosaicGrid({ deals: propsDeals }) {
  const [fetchedDeals, setFetchedDeals] = useState([]);

  useEffect(() => {
    if (propsDeals !== undefined) return;
    let isMounted = true;
    fetch("/api/features")
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;
        const mapped = (data.features || [])
          .filter(feature => feature.homepageSection === "featured")
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
        setFetchedDeals(mapped);
      })
      .catch((err) => console.error("Failed to fetch features", err));
    return () => {
      isMounted = false;
    };
  }, [propsDeals]);

  const deals = propsDeals !== undefined ? propsDeals : fetchedDeals;

  return (
    <section className="bg-main py-3 sm:py-4">
      <div className="mx-auto max-w-[1180px] px-3 sm:px-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-[15px] font-extrabold text-[#0B1F4D] sm:text-[18px]">Offerte in evidenza</h2>
          <a href="#" className="text-[10px] font-bold text-[#1F5FD6] sm:text-xs">Vedi tutte le offerte <span className="ml-1">&#8594;</span></a>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {deals.map((deal, idx) => (
            <ImageOfferCard key={idx} deal={deal} />
          ))}
        </div>

      </div>
    </section>
  );
}

export default MosaicGrid;