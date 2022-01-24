/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  distDir: 'build',
  webpack: function (config, options) {
    config.experiments = { layers: true, topLevelAwait: true };
    return config;
  },
};
