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
  // Конфигурация для статического экспорта
  output: 'export',
  trailingSlash: true,
  // Убираем basePath для GitHub Pages - он будет автоматически настроен
  // basePath: process.env.NODE_ENV === 'production' ? '/umbrella-corp' : '',
  // assetPrefix: process.env.NODE_ENV === 'production' ? '/umbrella-corp/' : '',
}

export default nextConfig
