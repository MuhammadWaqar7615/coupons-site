"use client";

import React, { useState, useEffect } from 'react';
import DealCard from './DealCard';

function MosaicGrid() {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    fetch("/api/features")
      .then((res) => res.json())
      .then((data) => {
        const fetchedDeals = (data.features || [])
          .filter(feature => feature.homepageSection === "featured")
          .map((feature) => ({
            store: feature.storeId?.name || "Store",
            discount: feature.discount || "",
            labelTop: feature.labelTop || "",
            labelBottom: feature.labelBottom || "",
            title: feature.title || "",
            dealUrl: feature.storeId?.slug ? `/store/${feature.storeId.slug}` : "#",
            logo: feature.storeId?.logoPath || "",
          }));
        setDeals(fetchedDeals);
      })
      .catch((err) => console.error("Failed to fetch features", err));
  }, []);

  return (
    <section className="py-12 bg-white">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6">

        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-[30px] font-light text-gray-500">
            Offerte in evidenza
          </h2>
        </div>

        {/* 3x3 Grid Wrapper */}
        <div className="bg-[#e9ecef] p-3 sm:p-4 rounded-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {deals.map((deal, idx) => (
              <DealCard key={idx} deal={deal} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default MosaicGrid;