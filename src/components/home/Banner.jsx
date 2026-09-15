"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

function Banner({ initialCategories }) {
  const [fetchedCategories, setFetchedCategories] = useState([]);
  const categories = initialCategories !== undefined ? initialCategories : fetchedCategories;

  useEffect(() => {
    if (initialCategories !== undefined) return undefined;
    let isMounted = true;
    fetch("/api/categories?status=enabled")
      .then((response) => (response.ok ? response.json() : { categories: [] }))
      .then((data) => {
        if (!isMounted) return;
        setFetchedCategories((data.categories || []).map((category) => ({
          id: category._id,
          name: category.title || category.name || "",
          image: category.image || "/images/placeholder.png",
          link: category.slug ? `/offerte/${category.slug}` : "#",
        })));
      })
      .catch(() => setFetchedCategories([]));
    return () => {
      isMounted = false;
    };
  }, [initialCategories]);

  return (
    <div className="w-full bg-main">
      <div className="mx-auto max-w-[1180px] px-3 py-4 sm:px-5 sm:py-5">
        {categories.length > 0 && (
          <section className="mb-5">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-[15px] font-extrabold text-[#0B1F4D] sm:text-[18px]">Scegli la tua categoria</h2>
              <Link href="/offerte" className="text-[10px] font-bold text-[#1F5FD6] sm:text-xs">Tutte le categorie <span className="ml-1">&#8594;</span></Link>
            </div>
            <div className="hide-scrollbar grid auto-cols-[76px] grid-flow-col gap-3 overflow-x-auto sm:grid-flow-col sm:auto-cols-fr sm:gap-2">
              {categories.map((category) => (
                <Link key={category.id} href={category.link} className="group flex min-w-[76px] flex-col items-center gap-2 text-center">
                  <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-[#DCE8F6] bg-[#EAF2FC] transition-transform group-hover:-translate-y-1">
                    <img src={category.image} alt={category.name} className="h-7 w-7 object-contain" />
                  </span>
                  <span className="text-[9px] font-semibold leading-tight text-[#12203F] sm:text-[10px]">{category.name}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <a href="#" className="block w-full overflow-hidden rounded-[8px] transition-opacity hover:opacity-95">
          <img
            src="/images/back-to-school-2026.jpg"
            alt="Back to School Banner"
            className="block h-auto w-full"
          />
        </a>
      </div>
    </div>
  );
}

export default Banner;
