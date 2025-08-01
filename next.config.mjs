/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Конфигурация для GitHub Pages
  output: 'export',
  trailingSlash: true,
  basePath: process.env.NODE_ENV === 'production' ? '/umbrella-corp' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/umbrella-corp/' : '',
}

export default nextConfig
