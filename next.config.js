const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'src/styles')],
    },
    images: {
        minimumCacheTTL: 60,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'goods-photos.static1-sima-land.com',
                port: '',
                pathname: '/items/**',
            },
            {
                protocol: 'https',
                hostname: 'cdn-icons-png.flaticon.com',
                port: '',
            },
        ],
    },
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);
