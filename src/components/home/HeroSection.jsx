"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

function HeroSection({ initialBadges = [], initialSlides = [] }) {
  const scrollContainerRef = useRef(null);
  const [fetchedBadges, setFetchedBadges] = useState([]);
  const [fetchedSlides, setFetchedSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isBadgesHovered, setIsBadgesHovered] = useState(false);

  const hasInitialData = initialSlides.length > 0 || initialBadges.length > 0;
  const badges = hasInitialData ? initialBadges : fetchedBadges;
  const mockSlides = hasInitialData ? initialSlides : fetchedSlides;

  useEffect(() => {
    if (hasInitialData) return;
    let isMounted = true;
    Promise.all([
      fetch("/api/sliders?status=enabled"),
      fetch("/api/badges"),
    ])
      .then(async ([slidersResponse, badgesResponse]) => ({
        sliders: slidersResponse.ok ? (await slidersResponse.json()).sliders : [],
        badges: badgesResponse.ok ? (await badgesResponse.json()).badges : [],
      }))
      .then((data) => {
        if (!isMounted) return;
        setFetchedBadges((data.badges || []).map((badge) => ({
          name: badge.name,
          logo: badge.image,
        })));
        setFetchedSlides((data.sliders || []).map((slider) => ({
          id: slider._id,
          image: slider.image,
          logo: slider.logo || slider.image,
          text: slider.description || slider.title,
          discount: slider.discount || slider.title,
          link: slider.link || "#",
        })));
      })
      .catch((err) => console.error("Failed to fetch sliders/badges:", err));
    return () => {
      isMounted = false;
    };
  }, [hasInitialData]);

  useEffect(() => {
    if (mockSlides.length < 2) return undefined;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % mockSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [mockSlides.length]);

  // Auto-scroll for badges carousel
  useEffect(() => {
    if (badges.length < 2 || isBadgesHovered) return undefined;
    const timer = setInterval(() => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
      }
    }, 3500);
    return () => clearInterval(timer);
  }, [badges.length, isBadgesHovered]);

  const handlePrev = () => {
    if (mockSlides.length === 0) return;
    setCurrentSlide((prev) => (prev === 0 ? mockSlides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (mockSlides.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % mockSlides.length);
  };

  return (
    <section className="bg-main pt-2 pb-3 sm:pt-3">
      <div className="w-full">

        <div className="relative h-[270px] w-full overflow-hidden bg-[#0056a6] shadow-[0_8px_24px_rgba(0,40,92,0.16)] group sm:h-[315px] md:h-[350px]">
          {mockSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            >
              <img
                src={slide.image}
                alt={`Slide ${slide.id}`}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#003d80]/90 via-[#0059aa]/65 to-transparent" />
              <div className="relative z-10 flex h-full max-w-[53%] sm:max-w-[48%] flex-col justify-center px-6 sm:px-10 md:px-12 text-white">
                <div className="mb-3 flex h-8 items-center">
                  <img src={slide.logo} alt="Logo" className="max-h-full max-w-[145px] object-contain object-left brightness-0 invert" />
                </div>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#FBD654] sm:text-xs">
                  Le migliori offerte, sempre con te
                </p>
                <h1 className="text-[29px] font-extrabold leading-[0.98] sm:text-[38px] md:text-[48px]">
                  {slide.discount || "Risparmia ogni giorno"}
                </h1>
                <p className="mt-3 max-w-[330px] text-[12px] leading-relaxed text-white/90 sm:text-sm">
                  {slide.text}
                </p>
                <a href={slide.link || "#"} className="mt-5 inline-flex w-fit items-center rounded-full bg-[#FBD654] px-5 py-2.5 text-[10px] font-extrabold uppercase tracking-wide text-[#00285C] transition-colors hover:bg-white sm:text-[11px]">
                  Scopri ora <span className="ml-2 text-base leading-none">&#8594;</span>
                </a>
              </div>
            </div>
          ))}

          {mockSlides.length > 1 && (
            <>
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-[#00285C]/55 text-white opacity-0 transition-opacity hover:bg-[#00285C] group-hover:opacity-100"
              aria-label="Previous slide"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-[#00285C]/55 text-white opacity-0 transition-opacity hover:bg-[#00285C] group-hover:opacity-100"
              aria-label="Next slide"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            </>
          )}

          {mockSlides.length > 1 && (
            <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
              {mockSlides.map((slide, index) => (
                <button
                  key={`dot-${slide.id}`}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-1.5 rounded-full transition-all ${index === currentSlide ? 'w-6 bg-[#FBD654]' : 'w-1.5 bg-white/70'}`}
                  aria-label={`Vai alla slide ${index + 1}`}
                />
              ))}
            </div>
          )}
          </div>

        {/* Store Logos Row (Offers Slider) */}
        <div
          className="relative group mt-3 sm:mt-4"
          onMouseEnter={() => setIsBadgesHovered(true)}
          onMouseLeave={() => setIsBadgesHovered(false)}
        >
          <button 
            onClick={() => scrollContainerRef.current?.scrollBy({ left: -300, behavior: 'smooth' })}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-20 w-8 h-8 bg-white shadow-md hover:bg-gray-100 text-gray-700 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex border border-gray-200"
            aria-label="Scroll left"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto flex-nowrap gap-2 pb-1 snap-x hide-scrollbar scroll-smooth"
          >
            {badges.map((store, idx) => (
              <a key={idx} href="#" className="flex h-[70px] min-w-[31%] shrink-0 snap-start flex-1 flex-col items-center justify-between rounded-[8px] border border-[#E6EBF2] bg-white p-2.5 transition-shadow hover:shadow-md sm:h-[78px] sm:min-w-[20%] md:min-w-[15%] lg:min-w-[12%]">
                <div className="flex-1 flex items-center justify-center w-full">
                  <img src={store.logo} alt={store.name} className="max-h-[28px] max-w-full object-contain" />
                </div>
                <span className="mt-1 text-[9px] font-medium tracking-wide text-gray-500">{store.name}</span>
              </a>
            ))}
          </div>

          <button 
            onClick={() => scrollContainerRef.current?.scrollBy({ left: 300, behavior: 'smooth' })}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-20 w-8 h-8 bg-white shadow-md hover:bg-gray-100 text-gray-700 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex border border-gray-200"
            aria-label="Scroll right"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
}

export default HeroSection;
