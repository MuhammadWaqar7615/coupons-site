"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

function HeroSection() {
  const scrollContainerRef = useRef(null);
  const [badges, setBadges] = useState([]);
  const [mockSlides, setMockSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isBadgesHovered, setIsBadgesHovered] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("/api/sliders?status=enabled"),
      fetch("/api/badges"),
    ])
      .then(async ([slidersResponse, badgesResponse]) => ({
        sliders: slidersResponse.ok ? (await slidersResponse.json()).sliders : [],
        badges: badgesResponse.ok ? (await badgesResponse.json()).badges : [],
      }))
      .then((data) => {
        setBadges((data.badges || []).map((badge) => ({
          name: badge.name,
          logo: badge.image,
        })));
        setMockSlides((data.sliders || []).map((slider) => ({
        id: slider._id,
        image: slider.image,
        logo: slider.logo || slider.image,
        text: slider.description || slider.title,
        discount: slider.discount || slider.title,
        link: slider.link || "#",
        })));
      });
  }, []);

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
    <section className="bg-main pt-3 pb-2">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">

        {/* Main Hero Card & Image Area */}
        <div className="flex flex-col md:flex-row shadow-lg bg-white rounded-sm h-auto md:h-[350px] overflow-hidden">

          {/* Left: Featured Offer Card (Sliding, no arrows, visible on mobile) */}
          <div className="w-full md:w-[35%] relative h-[350px] md:h-full bg-white">
            {mockSlides.map((slide, index) => (
              <div
                key={`left-${slide.id}`}
                className={`absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-white transition-opacity duration-500 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
              >
                <div className="h-10 mb-4 flex items-center justify-center">
                  <img src={slide.logo} alt="Logo" className="max-h-full object-contain" />
                </div>

                <p className="text-gray-500 text-[15px] leading-relaxed mb-6 px-4">
                  {slide.text}
                </p>

                <div className="w-full border-t border-dashed border-gray-300 my-2"></div>

                <div className="mt-4 flex flex-col items-center">
                  <span className="text-gray-600 font-bold text-xs uppercase tracking-wider mb-1">FINO A</span>
                  <span className="text-[42px] font-bold text-accent leading-none mb-6">{slide.discount}</span>
                </div>

                <a href={slide.link || "#"} className="bg-accent hover:bg-accent-hover text-white text-[15px] font-semibold py-3 px-8 rounded-sm transition-colors w-full sm:w-auto">
                  Scopri Codice
                </a>
              </div>
            ))}
          </div>

          {/* Right: Promotional Advertisement Image (Sliding, has arrows, hidden on mobile) */}
          <div className="hidden md:block w-full md:w-[65%] relative h-full group">
            {mockSlides.map((slide, index) => (
              <div
                key={`right-${slide.id}`}
                className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
              >
                <img
                  src={slide.image}
                  alt={`Slide ${slide.id}`}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            ))}

            {/* Slider Navigation Arrows (Only on the right pane) */}
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-16 bg-black/10 hover:bg-black/30 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Previous slide"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-16 bg-black/10 hover:bg-black/30 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Next slide"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

        </div>

        {/* Store Logos Row (Offers Slider) */}
        <div 
          className="relative group mt-4"
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
            className="flex overflow-x-auto flex-nowrap gap-1.5 pb-2 snap-x hide-scrollbar scroll-smooth"
          >
            {badges.map((store, idx) => (
              <a key={idx} href="#" className="bg-white rounded-sm p-4 flex-1 flex flex-col items-center justify-between min-w-[30%] sm:min-w-[20%] md:min-w-[15%] lg:min-w-[12%] shrink-0 snap-start hover:shadow-md transition-shadow h-[90px]">
                <div className="flex-1 flex items-center justify-center w-full">
                  <img src={store.logo} alt={store.name} className="max-h-[32px] max-w-full object-contain" />
                </div>
                <span className="text-[11px] text-gray-500 font-medium mt-2 tracking-wide">{store.name}</span>
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
