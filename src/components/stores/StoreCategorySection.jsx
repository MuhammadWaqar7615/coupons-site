import React from "react";
import StoreItem from "./StoreItem";

/**
 * Renders a single letter section with its store grid.
 * Heading: purple square badge + count.
 * Grid: 5 cols desktop, 3 cols tablet, 2 cols mobile.
 */
function StoreCategorySection({ letter, storesList }) {
  if (!storesList || storesList.length === 0) return null;

  return (
    <section id={`store-${letter}`} className="mb-[24px] scroll-mt-[90px]">
      {/* Section heading: Purple badge letter + count */}
      <div className="flex items-center gap-[10px] mb-[8px] pt-[8px]">
        <span className="inline-flex items-center justify-center w-[30px] h-[30px] bg-accent text-white text-[15px] font-bold rounded-sm leading-none flex-shrink-0 shadow-sm">
          {letter}
        </span>
        <span className="text-[13px] text-[#999] font-normal leading-[16px]">
          {storesList.length} {storesList.length === 1 ? "negozio" : "negozi"}
        </span>
      </div>

      {/* Store items grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-[12px] gap-y-0">
        {storesList.map((store) => (
          <StoreItem key={store.slug} store={store} />
        ))}
      </div>
    </section>
  );
}

export default StoreCategorySection;
