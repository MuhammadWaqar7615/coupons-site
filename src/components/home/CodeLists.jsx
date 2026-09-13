"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

function CodeLists() {
  const [newCodes, setNewCodes] = useState([]);
  const [expiringCodes, setExpiringCodes] = useState([]);

  useEffect(() => {
    fetch("/api/features")
      .then((res) => res.json())
      .then((data) => {
        const features = data.features || [];
        
        const fetchedNewCodes = features
          .filter(feature => feature.homepageSection === "new")
          .map(feature => ({
            tag: "",
            title: feature.title || "",
            logo: feature.storeId?.logoPath || "/images/placeholder.png",
            dealUrl: feature.storeId?.slug ? `/store/${feature.storeId.slug}` : "#"
          }));

        const fetchedExpiringCodes = features
          .filter(feature => feature.homepageSection === "expiring")
          .map(feature => ({
            tag: "",
            title: feature.title || "",
            logo: feature.storeId?.logoPath || "/images/placeholder.png",
            dealUrl: feature.storeId?.slug ? `/store/${feature.storeId.slug}` : "#"
          }));

        setNewCodes(fetchedNewCodes);
        setExpiringCodes(fetchedExpiringCodes);
      })
      .catch((err) => console.error("Failed to fetch features for CodeLists", err));
  }, []);

  return (
    <section className="py-12">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 bg-primary-dark rounded-2xl py-8">

        {/* Titles Row */}
        <div className="flex flex-col md:flex-row mb-5">
          <div className="w-full md:w-1/2">
            <h3 className="text-white text-center text-[19px] sm:text-[22px]">
              <span className="font-bold">Codici sconto</span> <span className="font-light">novità</span>
            </h3>
          </div>
          <div className="w-full md:w-1/2 hidden md:block">
            <h3 className="text-white text-center text-[19px] sm:text-[22px]">
              <span className="font-bold">Codici sconto</span> <span className="font-light">in scadenza</span>
            </h3>
          </div>
        </div>

        {/* Light Grey Background Container */}
        <div className="bg-section-light p-3 sm:p-4 rounded-md">
          <div className="flex flex-col md:flex-row gap-3 sm:gap-4">

            {/* Left Column: Nuovi */}
            <div className="w-full md:w-1/2 flex flex-col gap-2">
              {newCodes.length > 0 ? (
                newCodes.map((item, index) => (
                  <Link key={index} href={item.dealUrl} className="bg-white flex items-center h-[76px] sm:h-[80px] hover:shadow-md transition-shadow group rounded-sm overflow-hidden">
                    <div className="w-[110px] sm:w-[130px] h-full flex-shrink-0 flex items-center justify-center p-3">
                      {/* TODO: Replace placeholder with original image if needed */}
                      <img src={item.logo} alt="Store Logo" className="max-h-[35px] max-w-[85px] object-contain" />
                    </div>

                    <div className="h-[55%] border-l border-dashed border-accent opacity-40"></div>

                    <div className="flex-1 pl-4 pr-3 py-2 flex flex-col justify-center">
                      {item.tag && <div className="text-[10px] font-bold text-accent uppercase tracking-wider mb-0.5">{item.tag}</div>}
                      <div className="text-[12px] sm:text-[13px] text-gray-700 group-hover:text-accent transition-colors leading-tight line-clamp-2">{item.title}</div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="text-center py-4 text-gray-500">Nessun codice novità.</div>
              )}
            </div>

            {/* Mobile Title for Right Column */}
            <div className="w-full md:hidden mt-4 mb-2">
              <h3 className="text-gray-800 text-center text-[18px]">
                <span className="font-bold">Codici sconto</span> <span className="font-light">in scadenza</span>
              </h3>
            </div>

            {/* Right Column: In Scadenza */}
            <div className="w-full md:w-1/2 flex flex-col gap-2">
              {expiringCodes.length > 0 ? (
                expiringCodes.map((item, index) => (
                  <Link key={index} href={item.dealUrl} className="bg-white flex items-center h-[76px] sm:h-[80px] hover:shadow-md transition-shadow group rounded-sm overflow-hidden">
                    <div className="w-[110px] sm:w-[130px] h-full flex-shrink-0 flex items-center justify-center p-3">
                      {/* TODO: Replace placeholder with original image if needed */}
                      <img src={item.logo} alt="Store Logo" className="max-h-[35px] max-w-[85px] object-contain" />
                    </div>

                    <div className="h-[55%] border-l border-dashed border-accent opacity-40"></div>

                    <div className="flex-1 pl-4 pr-3 py-2 flex flex-col justify-center">
                      {item.tag && <div className="text-[10px] font-bold text-accent uppercase tracking-wider mb-0.5">{item.tag}</div>}
                      <div className="text-[12px] sm:text-[13px] text-gray-700 group-hover:text-accent transition-colors leading-tight line-clamp-2">{item.title}</div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="text-center py-4 text-gray-500">Nessun codice in scadenza.</div>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default CodeLists;
