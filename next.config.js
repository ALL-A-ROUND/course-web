/** @type {import('next').NextConfig} */
const path = require('path');

const projectID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
const nextConfig = {
    images: {
        domains: [
            process.env.NEXT_PUBLIC_ASSET_ENDPOINT.split("//")[1].split("/")[0].split(":")[0],
            "rgauqyeosa62pbqv.public.blob.vercel-storage.com"
        ],
    },
    webpack: (config) => {
        config.module.rules.push({
            test: /canvas\.node/,
            use: "raw-loader",
        });
        config.resolve.alias = {
            ...config.resolve.alias,
            '@': path.resolve(__dirname, './'),
        };
        return config;
    },
    async rewrites() {
        return [
            {
                source: "/__/auth/:path*",
                destination: `https://${projectID}.firebaseapp.com/__/auth/:path*`
            },
        ];
    },
}

module.exports = nextConfig
