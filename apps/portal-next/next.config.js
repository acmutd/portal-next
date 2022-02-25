/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  distDir: 'build',
  webpack: function (config, { isServer, webpack }) {
    if (!isServer) {
      // Ensures no server modules are included on the client.
      config.plugins.push(
        new webpack.IgnorePlugin({
          resourceRegExp: /lib\/server/,
        }),
      );
    }
    config.experiments = { layers: true, topLevelAwait: true };
    return config;
  },
};
