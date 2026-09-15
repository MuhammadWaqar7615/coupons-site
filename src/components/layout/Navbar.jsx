"use client";

import React, { startTransition, useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { AUTH_TOKEN_STORAGE_KEY } from '@/config/auth';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState({ stores: [], coupons: [] });
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    startTransition(() => {
      setIsAuthenticated(Boolean(window.localStorage.getItem(AUTH_TOKEN_STORAGE_KEY)));
    });
  }, []);

  /**
   * Returns the appropriate text color class for a nav link
   * based on whether it matches the current route.
   */
  const getNavLinkClass = (href) => {
    const isActive = pathname === href || pathname.startsWith(href + '/');
    return isActive
      ? "text-[#005FB7] hover:text-[#00285C] text-[10px] font-bold uppercase tracking-wide transition-colors"
      : "text-[#00285C] hover:text-[#005FB7] text-[10px] font-bold uppercase tracking-wide transition-colors";
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    let active = true;
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.length >= 2) {
        fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`)
          .then(res => (res.ok ? res.json() : { stores: [], coupons: [] }))
          .then(data => {
            if (!active) return;
            setSearchResults(data);
            setIsSearchOpen(true);
            setSelectedIndex(-1);
          })
          .catch(console.error);
      } else {
        setSearchResults({ stores: [], coupons: [] });
        setIsSearchOpen(false);
        setSelectedIndex(-1);
      }
    }, 300);
    return () => {
      active = false;
      clearTimeout(delayDebounceFn);
    };
  }, [searchQuery]);

  const allSuggestions = [
    ...searchResults.stores.map(s => ({
      ...s,
      url: `/store/${s.slug ? encodeURIComponent(s.slug) : ''}`,
      type: 'store',
    })),
    ...searchResults.coupons.map(c => {
      const slug = c.storeId?.slug || c.store?.slug;
      return {
        ...c,
        url: slug ? `/store/${encodeURIComponent(slug)}` : '#',
        type: 'coupon',
      };
    }),
  ];

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      if (!isSearchOpen || allSuggestions.length === 0) return;
      e.preventDefault();
      setSelectedIndex(prev => (prev < allSuggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      if (!isSearchOpen || allSuggestions.length === 0) return;
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : allSuggestions.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const targetItem =
        selectedIndex >= 0
          ? allSuggestions[selectedIndex]
          : allSuggestions.length > 0 && isSearchOpen
          ? allSuggestions[0]
          : null;
      if (targetItem && targetItem.url && targetItem.url !== '#' && targetItem.url !== '/store/') {
        setIsSearchOpen(false);
        setSearchQuery("");
        router.push(targetItem.url);
      } else if (searchQuery.trim().length > 0) {
        setIsSearchOpen(false);
        router.push(`/cerca?q=${encodeURIComponent(searchQuery.trim())}`);
      }
    }
  };

  return (
    <nav className="bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)] border-b border-[#eaeaea] relative z-40">
      <div className="mx-auto flex min-h-[58px] max-w-[1240px] flex-wrap items-center gap-x-3 px-3 py-2 sm:px-5 lg:h-[58px] lg:flex-nowrap lg:px-6 lg:py-0">
        {/* Logo */}
        <div className="order-2 flex flex-1 items-center justify-center lg:order-none lg:flex-initial lg:justify-start">
          <Link href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
            <img
              src="/images/logo-blue.png"
              alt="CodiceSconto Logo"
              className="h-[28px] w-auto object-contain sm:h-[31px] lg:h-[34px]"
            />
          </Link>
        </div>

        {/* Search */}
        <div className={`${isMobileSearchOpen ? 'block' : 'hidden'} order-4 mx-0 w-full max-w-none lg:order-none lg:mx-5 lg:block lg:flex-1 lg:max-w-[420px]`} ref={searchRef}>
          <form
            className="relative flex w-full items-center rounded-full border border-[#E0E5EC] bg-[#F7F9FC] py-0.5 pl-3 pr-1 transition-all focus-within:border-[#005FB7] focus-within:ring-2 focus-within:ring-[#005FB7]/15"
            onSubmit={(e) => {
              e.preventDefault();
              if (selectedIndex >= 0 && allSuggestions[selectedIndex]?.url && allSuggestions[selectedIndex].url !== '#') {
                const targetItem = allSuggestions[selectedIndex];
                setIsSearchOpen(false);
                setSearchQuery("");
                router.push(targetItem.url);
              } else if (searchQuery.trim().length > 0) {
                setIsSearchOpen(false);
                router.push(`/cerca?q=${encodeURIComponent(searchQuery.trim())}`);
              }
            }}
          >
            {/* Left search icon */}
            <svg className="h-[14px] w-[14px] text-[#718096] mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>

            <input
              type="text"
              name="q"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => {
                if (searchQuery.length >= 2) setIsSearchOpen(true);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Cerca negozi, marche o offerte..."
              className="w-full bg-transparent border-none outline-none focus:outline-none text-[11px] text-gray-700 placeholder:text-gray-400 font-normal pr-2"
              autoComplete="off"
            />

            {/* Right circular yellow search button */}
            <button
              type="submit"
              className="w-[28px] h-[28px] rounded-full bg-[#FBD654] hover:bg-[#f2cb42] flex items-center justify-center flex-shrink-0 cursor-pointer transition-all shadow-sm active:scale-95"
              aria-label="Cerca"
            >
              <svg className="h-[13px] w-[13px] text-[#00285C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Live Search Dropdown */}
            {isSearchOpen && allSuggestions.length > 0 && (
              <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white shadow-xl border border-gray-100 rounded-2xl overflow-hidden z-50 flex flex-col max-h-[400px] overflow-y-auto">
                {searchResults.stores.length > 0 && (
                  <div className="p-3 border-b border-gray-100">
                    <div className="text-[11px] font-bold text-[#00285C]/60 uppercase tracking-wider mb-2">Negozi</div>
                    <div className="space-y-1">
                      {searchResults.stores.map((store, idx) => {
                        const isSelected = selectedIndex === idx;
                        return (
                          <Link
                            key={store._id}
                            href={`/store/${store.slug}`}
                            onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }}
                            className={`flex items-center p-2 rounded-lg transition-colors group ${isSelected ? 'bg-blue-50/60' : 'hover:bg-gray-50'}`}
                          >
                            <div className="w-8 h-8 mr-3 flex items-center justify-center bg-white border border-gray-100 rounded-md">
                              {store.logoPath ? (
                                <img src={store.logoPath} alt={store.name} className="max-h-full max-w-full object-contain p-1" />
                              ) : (
                                <span className="text-[10px] text-gray-400">Logo</span>
                              )}
                            </div>
                            <span className={`text-[13px] font-medium transition-colors ${isSelected ? 'text-[#005FB7]' : 'text-gray-700 group-hover:text-[#005FB7]'}`}>{store.name}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
                {searchResults.coupons.length > 0 && (
                  <div className="p-3">
                    <div className="text-[11px] font-bold text-[#00285C]/60 uppercase tracking-wider mb-2">Coupon</div>
                    <div className="space-y-1">
                      {searchResults.coupons.map((coupon, idx) => {
                        const globalIdx = searchResults.stores.length + idx;
                        const isSelected = selectedIndex === globalIdx;
                        return (
                          <Link
                            key={coupon._id}
                            href={`/store/${coupon.storeId?.slug || ''}`}
                            onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }}
                            className={`flex items-start p-2 rounded-lg transition-colors group ${isSelected ? 'bg-blue-50/60' : 'hover:bg-gray-50'}`}
                          >
                            <div className="flex-1 min-w-0">
                              <div className={`text-[13px] font-medium truncate transition-colors ${isSelected ? 'text-[#005FB7]' : 'text-gray-700 group-hover:text-[#005FB7]'}`}>
                                {coupon.title}
                              </div>
                              <div className="text-[11px] text-gray-500 truncate mt-0.5">
                                {coupon.storeId?.name || "Store"} &bull; {coupon.discount}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </form>
        </div>

        {/* Desktop Menu */}
        <div className="order-3 hidden space-x-[19px] lg:order-none lg:flex lg:items-center">
          <Link href="/negozi" className={getNavLinkClass("/negozi")}>Negozi</Link>
          <Link href="/offerte" className={getNavLinkClass("/offerte")}>Offerte</Link>
          <Link href="/blog" className={getNavLinkClass("/blog")}>Blog</Link>

          <div className="flex items-center space-x-2 pl-1">
            <Link
              href="/aggiungi-negozio"
              className="inline-flex items-center space-x-1 bg-[#FBD654] hover:bg-[#f3cc43] text-[#00285C] px-3 py-[6px] rounded-[4px] text-[9px] font-bold uppercase tracking-wide transition-all shadow-sm active:scale-[0.98]"
            >
              <svg className="w-3.5 h-3.5 stroke-[3] text-[#00285C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              <span>Aggiungi negozio</span>
            </Link>

            <Link
              href={isAuthenticated ? "/dashboard" : "/account/login"}
              className="inline-flex items-center space-x-1 bg-[#00285C] hover:bg-[#001f4a] text-white px-3 py-[6px] rounded-[4px] text-[9px] font-bold uppercase tracking-wide transition-all shadow-sm active:scale-[0.98]"
            >
              <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>{isAuthenticated ? "Dashboard" : "Accedi"}</span>
            </Link>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="order-1 flex items-center lg:order-none lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-[#00285C] hover:text-[#005FB7] focus:outline-none"
            aria-label="Apri/Chiudi menù"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        <div className="order-3 ml-auto flex items-center gap-1 lg:hidden">
          <button
            type="button"
            onClick={() => setIsMobileSearchOpen((open) => !open)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#00285C] hover:bg-[#EDF3FA] hover:text-[#005FB7]"
            aria-label="Cerca"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="m21 21-4.35-4.35m2.1-5.4a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z" />
            </svg>
          </button>
          <Link
            href={isAuthenticated ? "/dashboard" : "/account/login"}
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#00285C] hover:bg-[#EDF3FA] hover:text-[#005FB7]"
            aria-label={isAuthenticated ? "Dashboard" : "Accedi"}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 absolute w-full shadow-xl z-50 left-0">
          <div className="px-5 pt-3 pb-6 space-y-2">
            <Link href="/negozi" onClick={() => setIsOpen(false)} className="block px-3 py-2.5 rounded-md text-[13px] font-bold uppercase text-[#00285C] hover:text-[#005FB7] hover:bg-gray-50 border-b border-gray-100">Negozi</Link>
            <Link href="/offerte" onClick={() => setIsOpen(false)} className="block px-3 py-2.5 rounded-md text-[13px] font-bold uppercase text-[#00285C] hover:text-[#005FB7] hover:bg-gray-50 border-b border-gray-100">Offerte</Link>
            <Link href="/blog" onClick={() => setIsOpen(false)} className="block px-3 py-2.5 rounded-md text-[13px] font-bold uppercase text-[#00285C] hover:text-[#005FB7] hover:bg-gray-50 border-b border-gray-100">Blog</Link>
            
            <div className="pt-2 flex flex-col space-y-2">
              <Link
                href="/aggiungi-negozio"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center justify-center space-x-2 bg-[#FBD654] hover:bg-[#f3cc43] text-[#00285C] px-4 py-2.5 rounded-[6px] text-[12px] font-bold uppercase tracking-wide"
              >
                <svg className="w-3.5 h-3.5 stroke-[3] text-[#00285C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                <span>Aggiungi negozio</span>
              </Link>

              <Link
                href={isAuthenticated ? "/dashboard" : "/account/login"}
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center justify-center space-x-2 bg-[#00285C] hover:bg-[#001f4a] text-white px-4 py-2.5 rounded-[6px] text-[12px] font-bold uppercase tracking-wide"
              >
                <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>{isAuthenticated ? "Dashboard" : "Accedi"}</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;