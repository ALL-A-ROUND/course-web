/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
    images: {
        domains: [process.env.NEXT_PUBLIC_ASSET_ENDPOINT.split("//")[1].split("/")[0].split(":")[0]],
    }
}

module.exports = nextConfig
