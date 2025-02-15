const path = require('path');
const {withSentryConfig} = require('@sentry/nextjs');

const isDev = process.env.IS_DEV;

const imagesRemotePatterns = [
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
    {
        protocol: 'https',
        hostname: 'tridva.store',
        port: '',
        pathname: '/api/**',
    },
];

if (isDev) {
    imagesRemotePatterns.push({
        protocol: 'http',
        hostname: 'localhost',
        port: '',
        pathname: '/api/**',
    });
}

/** @type {import('next').NextConfig} */
const nextConfig = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'src/styles')],
    },
    experimental: {
        instrumentationHook: !isDev,
    },
    devIndicators: {
        buildActivity: true,
    },
    webpack(config) {
        config.module.rules.push(
            {
                test: /\.svg$/,
                type: 'asset',
                resourceQuery: /url/, // *.svg?url
            },
            {
                test: /\.svg$/,
                // issuer: /\.[jt]sx?$/,
                resourceQuery: {not: [/url/]},
                use: [
                    {
                        loader: '@svgr/webpack',
                        options: {
                            svgoConfig: {
                                plugins: [
                                    {
                                        name: 'preset-default',
                                        params: {
                                            overrides: {
                                                removeViewBox: false,
                                            },
                                        },
                                    },
                                ],
                            },
                        },
                    },
                ],
            },
        );

        return config;
    },
    images: {
        minimumCacheTTL: 10,
        remotePatterns: imagesRemotePatterns,
    },
};

const sentryConfig = {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    org: 'myself-010',
    project: 'tridva-front',

    // Only print logs for uploading source maps in CI
    silent: !process.env.CI,

    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
    // This can increase your server load as well as your hosting bill.
    // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
    // side errors will fail.
    tunnelRoute: '/monitoring',

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: false,
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

module.exports = withSentryConfig(withBundleAnalyzer(nextConfig), sentryConfig);
