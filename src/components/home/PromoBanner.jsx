"use client";

import React, { startTransition, useEffect, useState } from 'react';

function PromoBanner({ promoBanner: propsPromoBanner }) {
  const [fetchedPromoBanner, setFetchedPromoBanner] = useState(null);

  useEffect(() => {
    if (propsPromoBanner !== undefined) return;
    let isMounted = true;
    fetch("/api/promo-banners?status=enabled")
      .then((response) => (response.ok ? response.json() : { promoBanners: [] }))
      .then((data) => {
        if (!isMounted) return;
        startTransition(() => {
          setFetchedPromoBanner(data.promoBanners?.[0] || null);
        });
      })
      .catch(() => {
        if (isMounted) setFetchedPromoBanner(null);
      });
    return () => {
      isMounted = false;
    };
  }, [propsPromoBanner]);

  const promoBanner = propsPromoBanner !== undefined ? propsPromoBanner : fetchedPromoBanner;

  if (!promoBanner) return null;

  return (
    <section className="bg-main py-3 sm:py-4">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="flex flex-col items-stretch overflow-hidden rounded-[8px] bg-[#005FB7] shadow-[0_5px_18px_rgba(0,40,92,0.14)] md:h-[210px] md:flex-row">

          {/* Left: Illustration */}
          <div className="relative h-[170px] w-full md:h-full md:w-1/2">
            {/* TODO: Replace placeholder with original image */}
            <img
              src={promoBanner.image}
              alt={promoBanner.heading}
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          </div>

          {/* Right: Text and Button */}
          <div className="flex w-full flex-col items-center justify-center px-6 py-6 text-center md:w-1/2 md:px-12">
            <h3 className="mb-3 text-[14px] font-bold text-[#FBD654] sm:text-[16px]">
              {promoBanner.heading}
            </h3>

            <p className="mb-5 px-2 text-[12px] leading-relaxed text-white/85 sm:text-[13px]">
              {promoBanner.description}
            </p>

            <div className="mb-4 h-px w-32 bg-white/30"></div>

            <a href="#" className="rounded-full bg-[#FBD654] px-5 py-2 text-[11px] font-bold text-[#00285C] transition-colors hover:bg-white">
              Leggi l&apos;articolo
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}

export default PromoBanner;
