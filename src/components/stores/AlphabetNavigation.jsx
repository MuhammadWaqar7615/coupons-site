"use client";

import React from "react";

/**
 * Alphabet navigation bar: # + A-Z.
 * Pure text links, compact, horizontally inline.
 */
function AlphabetNavigation({ letters }) {
  return (
    <nav
      aria-label="Navigazione alfabetica"
      className="flex items-center gap-0 py-[12px] border-b border-[#ddd] overflow-x-auto hide-scrollbar"
    >
      {letters.map((letter) => (
        <a
          key={letter}
          href={`#store-${letter}`}
          className="flex-shrink-0 px-[7px] py-[3px] text-[12px] font-bold text-accent hover:text-[#5e3f53] hover:underline transition-colors duration-100"
          onClick={(e) => {
            e.preventDefault();
            const target = document.getElementById(`store-${letter}`);
            if (target) {
              target.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          {letter}
        </a>
      ))}
    </nav>
  );
}

export default AlphabetNavigation;
