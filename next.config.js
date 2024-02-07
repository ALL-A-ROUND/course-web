/** @type {import('next').NextConfig} */
const path = require('path');
const nextConfig = {
    images: {
        domains: [process.env.NEXT_PUBLIC_ASSET_ENDPOINT.split("//")[1].split("/")[0].split(":")[0]],
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
    }
}

module.exports = nextConfig
