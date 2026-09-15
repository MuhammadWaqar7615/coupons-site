import React from 'react';

function Newsletter() {
  return (
    <section className="w-full bg-main py-3 sm:py-4">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="flex w-full flex-col items-stretch justify-between gap-4 rounded-[8px] bg-[#005FB7] px-5 py-4 sm:flex-row sm:items-center sm:px-6 sm:py-5">
          <div className="flex items-center gap-3 sm:max-w-[48%]">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1F5FD6] text-white" aria-hidden="true">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path strokeLinecap="round" strokeLinejoin="round" d="m4 7 8 6 8-6" />
              </svg>
            </span>
            <div>
              <h3 className="text-[14px] font-bold leading-tight tracking-wide text-white md:text-[16px]">
                Ricevi gli aggiornamenti sui nostri migliori codici sconto
              </h3>
              <p className="mt-1 text-[10px] leading-tight text-[#C9D3F2] sm:text-[11px]">
                Iscriviti alla nostra newsletter e non perdere nessuna offerta!
              </p>
            </div>
          </div>

          <div className="w-full sm:max-w-[53%]">
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Inserisci la tua email"
                className="min-w-0 flex-1 rounded-[4px] border border-white/30 bg-white px-3 py-2 text-[11px] text-gray-700 shadow-sm placeholder:text-gray-400 focus:border-[#FBD654] focus:outline-none"
              />
              <button className="rounded-[4px] bg-[#FBD654] px-5 py-2 text-[10px] font-bold text-[#00285C] shadow-sm transition-colors hover:bg-white sm:px-6">
                Iscriviti
              </button>
            </div>
            <div className="mt-1.5 flex items-center justify-between gap-2 text-[8px] text-[#C9D3F2] sm:text-[9px]">
              <label className="flex items-center gap-1">
                <input type="checkbox" className="h-3 w-3 accent-[#FBD654]" />
                <span>Acconsento al trattamento dei dati</span>
              </label>
              <span className="hidden sm:block">Nessuno spam, solo offerte utili!</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;
