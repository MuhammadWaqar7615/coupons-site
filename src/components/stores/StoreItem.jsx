import React from "react";

/**
 * Individual store item in the directory grid.
 * Matches reference: compact horizontal layout with logo left, name right,
 * thin bottom border. Items are tightly packed in the grid.
 */
function StoreItem({ store }) {
  return (
    <a
      href={`/negozi/${store.slug}`}
      className="flex items-center gap-[10px] py-[12px] px-[8px] border-b border-[#ebebeb] hover:bg-[#f8f4f7] transition-colors duration-150 group"
      style={{ minHeight: '56px' }}
    >
      {/* Store logo container */}
      <div className="w-[80px] h-[36px] flex-shrink-0 flex items-center justify-center">
        <img
          src={store.logoPath}
          alt={`${store.name} logo`}
          className="max-w-full max-h-full object-contain"
          loading="lazy"
        />
      </div>
      {/* Store name */}
      <span className="text-[13px] text-[#555] group-hover:text-accent transition-colors duration-150 leading-[16px] truncate">
        {store.name}
      </span>
    </a>
  );
}

export default StoreItem;
