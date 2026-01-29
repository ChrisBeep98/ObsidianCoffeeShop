/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Required for static export to GitHub Pages
  basePath: '/ObsidianCoffeeShop', // Set based on your repository name
  // Optional: If you encounter issues with asset paths, uncomment the line below
  // assetPrefix: '/ObsidianCoffeeShop/',
};

module.exports = nextConfig;
