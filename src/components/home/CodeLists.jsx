"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

function CodeLists({ newCodes: propsNewCodes, expiringCodes: propsExpiringCodes }) {
  const [fetchedNewCodes, setFetchedNewCodes] = useState([]);
  const [fetchedExpiringCodes, setFetchedExpiringCodes] = useState([]);

  useEffect(() => {
    if (propsNewCodes !== undefined && propsExpiringCodes !== undefined) return;
    let isMounted = true;
    fetch("/api/features")
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;
        const features = data.features || [];
        
        const mappedNew = features
          .filter(feature => feature.homepageSection === "new")
          .map(feature => ({
            tag: "",
            title: feature.title || "",
            logo: feature.storeId?.logoPath || "/images/placeholder.png",
            dealUrl: feature.storeId?.slug ? `/store/${feature.storeId.slug}` : "#"
          }));

        const mappedExpiring = features
          .filter(feature => feature.homepageSection === "expiring")
          .map(feature => ({
            tag: "",
            title: feature.title || "",
            logo: feature.storeId?.logoPath || "/images/placeholder.png",
            dealUrl: feature.storeId?.slug ? `/store/${feature.storeId.slug}` : "#"
          }));

        setFetchedNewCodes(mappedNew);
        setFetchedExpiringCodes(mappedExpiring);
      })
      .catch((err) => console.error("Failed to fetch features for CodeLists", err));
    return () => {
      isMounted = false;
    };
  }, [propsNewCodes, propsExpiringCodes]);

  const newCodes = propsNewCodes !== undefined ? propsNewCodes : fetchedNewCodes;
  const expiringCodes = propsExpiringCodes !== undefined ? propsExpiringCodes : fetchedExpiringCodes;

  return (
    <section className="bg-main py-3 sm:py-4">
      <div className="mx-auto max-w-[1200px] rounded-[8px] bg-[#EDF3FA] px-3 py-4 sm:px-6 sm:py-5">

        {/* Titles Row */}
        <div className="mb-4 flex flex-col md:flex-row">
          <div className="w-full md:w-1/2">
            <h3 className="text-center text-[16px] text-[#00285C] sm:text-[19px]">
              <span className="font-bold">Codici sconto</span> <span className="font-light">novità</span>
            </h3>
          </div>
          <div className="w-full md:w-1/2 hidden md:block">
            <h3 className="text-center text-[16px] text-[#00285C] sm:text-[19px]">
              <span className="font-bold">Codici sconto</span> <span className="font-light">in scadenza</span>
            </h3>
          </div>
        </div>

        {/* Light Grey Background Container */}
        <div className="rounded-[8px] bg-white p-2 sm:p-2.5">
          <div className="flex flex-col md:flex-row gap-3 sm:gap-4">

            {/* Left Column: Nuovi */}
            <div className="w-full md:w-1/2 flex flex-col gap-2">
              {newCodes.length > 0 ? (
                newCodes.map((item, index) => (
                  <Link key={index} href={item.dealUrl} className="bg-white flex items-center h-[68px] sm:h-[72px] hover:shadow-md transition-shadow group rounded-[6px] overflow-hidden border border-[#E6EBF2]">
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
                  <Link key={index} href={item.dealUrl} className="bg-white flex items-center h-[68px] sm:h-[72px] hover:shadow-md transition-shadow group rounded-[6px] overflow-hidden border border-[#E6EBF2]">
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
