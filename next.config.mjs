const backendUrl = (() => {
  const url = process.env.BACKEND_URL;
  if (url) return url;
  if (process.env.NODE_ENV === "production" && process.env.STATIC_EXPORT !== "true") {
    throw new Error(
      "BACKEND_URL must be set in production. Refusing to start with localhost fallback."
    );
  }
  return "https://coupons-site-backend.vercel.app";
})();

const isExport = process.env.STATIC_EXPORT === "true";

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(isExport
    ? {
        output: "export",
        images: {
          unoptimized: true,
        },
      }
    : {}),
  reactCompiler: true,
  ...(!isExport
    ? {
        async redirects() {
          return [
            {
              source: "/negozi/:slug+",
              destination: "/store/:slug+",
              permanent: true,
            },
          ];
        },
        async rewrites() {
          return [
            {
              source: "/robots.txt",
              destination: `${backendUrl}/robots.txt`,
            },
            {
              source: "/sitemap.xml",
              destination: `${backendUrl}/sitemap.xml`,
            },
            {
              source: "/api/:path*",
              destination: `${backendUrl}/api/:path*`,
            },
          ];
        },
      }
    : {}),
};

export default nextConfig;
