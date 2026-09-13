"use client";

import React, { useState } from "react";

/**
 * Page header for the stores directory.
 * Title + count on left, cashback toggle on right.
 */
function StoresHeader({ storeCount }) {
  const [cashbackOnly, setCashbackOnly] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-[8px] pt-[24px] pb-[8px]">
      {/* Left: Title + count */}
      <div>
        <h1 className="text-[24px] font-bold text-[#333] leading-[28px] m-0 tracking-tight">
          Tutti i Negozi
        </h1>
        <p className="text-[13px] text-[#888] mt-[4px] m-0 leading-[18px]">
          Ci sono <strong className="font-semibold text-[#666]">{storeCount}</strong> negozi
        </p>
      </div>

      {/* Right: Cashback toggle */}
      <div className="flex items-center gap-[8px] flex-shrink-0 sm:mt-[6px]">
        <span className="text-[12px] text-[#666] leading-[16px]">
          Solo negozi con cashback
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={cashbackOnly}
          onClick={() => setCashbackOnly(!cashbackOnly)}
          className={`
            relative w-[40px] h-[22px] rounded-full transition-colors duration-200 flex-shrink-0 cursor-pointer
            ${cashbackOnly ? "bg-accent" : "bg-[#ccc]"}
          `}
        >
          <span
            className={`
              absolute top-[2px] w-[18px] h-[18px] rounded-full bg-white shadow-sm
              transition-transform duration-200
              ${cashbackOnly ? "translate-x-[20px]" : "translate-x-[2px]"}
            `}
          />
        </button>
      </div>
    </div>
  );
}

export default StoresHeader;
