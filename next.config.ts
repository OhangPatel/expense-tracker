// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//     // FIXME: ONLY FOR BUILD
//     /* config options here */
//   eslint: {
//     // Warning: This allows production builds to successfully complete even with ESLint errors
//     ignoreDuringBuilds: true,
//   },
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true, // Ignore ESLint errors during build
    },
};

export default nextConfig;
