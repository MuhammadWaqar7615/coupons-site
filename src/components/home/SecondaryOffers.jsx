"use client";

import React, { useState, useEffect } from 'react';
import ImageOfferCard from './ImageOfferCard';

function SecondaryOffers() {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    fetch("/api/features")
      .then((res) => res.json())
      .then((data) => {
        const fetchedDeals = (data.features || [])
          .filter(feature => feature.homepageSection === "secondary")
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
        setDeals(fetchedDeals);
      })
      .catch((err) => console.error("Failed to fetch features", err));
  }, []);

  return (
    <section className="py-12">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 bg-primary-dark rounded-2xl py-8">

        {/* 3x3 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {deals.length > 0 ? (
            deals.map((deal, index) => (
              <ImageOfferCard key={index} deal={deal} />
            ))
          ) : (
            <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center text-white py-10">
              Nessuna offerta secondaria disponibile.
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

export default SecondaryOffers;
