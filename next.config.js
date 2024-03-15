/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    // async rewrites() {
    //     return [
    //         {
    //           source: '/api/:path*',
    //           destination: 'http://127.0.0.1:8000/api/:path*'
    //         }
    //     ]
    // },
    env: {
        apiCalendarKey: process.env.API_KEY,
        envImagesLocation: process.env.IMAGE_LOCATION
    }
}

module.exports = nextConfig