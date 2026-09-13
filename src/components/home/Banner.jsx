import React from 'react';

function Banner() {
  return (
    <div className="w-full bg-section-light">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8">
        <a href="#" className="block w-full hover:opacity-95 transition-opacity">
          <img
            src="/images/back-to-school-2026.jpg"
            alt="Back to School Banner"
            className="w-full h-auto block"
          />
        </a>
      </div>
    </div>
  );
}

export default Banner;
