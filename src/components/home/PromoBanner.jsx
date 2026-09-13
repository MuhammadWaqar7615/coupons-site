"use client";

import React, { startTransition, useEffect, useState } from 'react';

function PromoBanner() {
  const [promoBanner, setPromoBanner] = useState(null);

  useEffect(() => {
    fetch("/api/promo-banners?status=enabled")
      .then((response) => response.ok ? response.json() : { promoBanners: [] })
      .then((data) => {
        startTransition(() => {
          setPromoBanner(data.promoBanners?.[0] || null);
        });
      })
      .catch(() => setPromoBanner(null));
  }, []);

  if (!promoBanner) return null;

  return (
    <section className="bg-section-light py-5">
      <div className="max-w-[850px] mx-auto px-4 sm:px-6">
        <div className="bg-white shadow-sm flex flex-col md:flex-row items-stretch overflow-hidden h-auto md:h-[230px]">

          {/* Left: Illustration */}
          <div className="w-full md:w-1/2 h-[200px] md:h-full relative">
            {/* TODO: Replace placeholder with original image */}
            <img
              src={promoBanner.image}
              alt={promoBanner.heading}
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          </div>

          {/* Right: Text and Button */}
          <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col items-center justify-center text-center px-4 sm:px-12">
            <h3 className="text-accent text-[14px] sm:text-[16px] font-bold mb-3">
              {promoBanner.heading}
            </h3>

            <p className="text-[13px] sm:text-[14px] text-gray-500 leading-relaxed mb-6 px-2">
              {promoBanner.description}
            </p>

            <div className="w-40 h-px bg-accent opacity-60 mb-5"></div>

            <a href="#" className="bg-accent hover:bg-accent-hover text-white text-[14px] py-2 px-5 rounded-sm transition-colors">
              Leggi l&apos;articolo
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}

export default PromoBanner;
