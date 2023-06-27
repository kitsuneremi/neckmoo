
const million = require('million/compiler');
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['firebasestorage.googleapis.com'],
    },
    experimental: {
        serverActions: true
    }
}

module.exports = million.next(nextConfig);
