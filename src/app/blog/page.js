import React from 'react';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlogGrid from "@/components/blog/BlogGrid";


export const metadata = {
  title: "Blog - CodiceSconto",
  description: "Articoli e consigli per risparmiare con i codici sconto",
};

export const revalidate = 60;

export default async function BlogPage() {
  const backendUrl = process.env.BACKEND_URL || 'http://localhost:4000';
  const res = await fetch(`${backendUrl}/api/blog?status=enabled`, { next: { revalidate: 60 } });
  
  if (!res.ok) {
    throw new Error('Failed to fetch blog posts');
  }
  
  const data = await res.json();
  const posts = data.posts || [];
  
  // The first post is the featured post, the rest are shown in the grid
  const featuredPost = posts.length > 0 ? posts[0] : null;
  const gridPosts = posts.length > 1 ? posts.slice(1) : [];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      
      {/* Page Header (Full Width) */}
      <div className="w-full bg-primary-dark">
        <div className="max-w-[1000px] mx-auto px-4 py-[16px]">
          <h1 className="text-white text-[24px] font-medium tracking-wide">
            Tutti gli articoli
          </h1>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-grow w-full bg-main">
        <div className="max-w-[1000px] mx-auto px-4 pt-[32px] pb-[40px]">
          
          {/* Featured Post */}
          {featuredPost && (
            <div className="bg-white flex flex-col md:flex-row w-full mb-[32px] shadow-sm">
              {/* Image Side */}
              <div className="w-full md:w-[55%] relative">
                <img 
                  src={featuredPost.image || "/images/placeholder.png"} 
                  alt={featuredPost.title} 
                  className="w-full h-full object-cover min-h-[300px]"
                />
              </div>
              {/* Content Side */}
              <div className="w-full md:w-[45%] flex flex-col justify-center items-center text-center p-[40px]">
                <h2 className="text-[#333333] text-[22px] font-bold mb-[16px] leading-tight">
                  {featuredPost.title}
                </h2>
                <p className="text-[#666666] text-[14px] leading-relaxed max-w-[90%]">
                  {featuredPost.description}
                </p>
                <a 
                  href="#"
                  className="mt-[24px] bg-accent text-white px-[24px] py-[10px] rounded-[3px] text-[12px] font-bold uppercase tracking-wide hover:bg-accent-hover transition-colors inline-block"
                >
                  Leggi l&apos;articolo
                </a>
              </div>
            </div>
          )}

          {/* Interactive Posts Grid */}
          <BlogGrid posts={gridPosts} />

          {/* Breadcrumb */}
          <div className="text-[12px] text-[#999999] pt-[20px] border-t border-[#eaeaea]">
            CodiceSconto {'>'} Articoli
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
