import React from "react";
import StoreCategorySection from "./StoreCategorySection";

/**
 * Renders the full list of store sections, grouped by letter.
 * Compact top margin matching reference spacing between
 * alphabet nav and first store section.
 */
function StoresList({ storesByLetter, letters }) {
  return (
    <div className="mt-[12px]">
      {letters.map((letter) => {
        const stores = storesByLetter[letter];
        if (!stores || stores.length === 0) return null;
        return (
          <StoreCategorySection
            key={letter}
            letter={letter}
            storesList={stores}
          />
        );
      })}
    </div>
  );
}

export default StoresList;
