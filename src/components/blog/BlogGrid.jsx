"use client";

import React, { useState } from 'react';



export default function BlogGrid({ posts = [] }) {
  const [visibleCount, setVisibleCount] = useState(12);

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 6, posts.length));
  };

  const hasMore = visibleCount < posts.length;

  return (
    <>
      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
        {posts.slice(0, visibleCount).map((post) => (
          <a href="#" key={post._id?.toString() || post.id} className="bg-white flex flex-col shadow-sm group hover:shadow-md transition-shadow">
            <div className="w-full aspect-[16/9] relative overflow-hidden">
              {/* TODO: Replace placeholder with original image */}
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-[20px] flex-grow flex flex-col">
              <h3 className="text-accent text-[16px] font-bold mb-[8px] leading-snug group-hover:text-accent-hover transition-colors">
                {post.title}
              </h3>
              <p className="text-[#666666] text-[13px] leading-relaxed">
                {post.description}
              </p>
            </div>
          </a>
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center mt-[40px] mb-[40px]">
          <button 
            onClick={handleLoadMore}
            className="bg-white border border-[#e5e5e5] text-[#666666] px-[20px] py-[8px] rounded-full text-[11px] font-bold uppercase tracking-wide flex items-center gap-[6px] hover:bg-gray-50 transition-colors shadow-sm cursor-pointer"
          >
            MOSTRA ALTRI
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
