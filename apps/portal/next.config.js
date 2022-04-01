// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextConfig = {};

const isNext12 = (config) => !!config.module.rules.find((rule) => rule.oneOf);

const updateNextGreaterThan12Config = (config) => {
  const oneOfRule = config.module.rules.find((rule) => rule.oneOf);

  // Next 12 has multiple TS loaders, and we need to update all of them.
  const tsRules = oneOfRule.oneOf.filter(
    (rule) => rule.test && rule.test.toString().includes('tsx|ts'),
  );

  tsRules.forEach((rule) => {
    // eslint-disable-next-line no-param-reassign
    rule.include = undefined;
  });

  return config;
};

const updateNextLessThan12Config = (config) => {
  // Next < 12 uses a single Babel loader.
  const tsRule = config.module.rules.find(
    (rule) => rule.test && rule.test.toString().includes('tsx|ts'),
  );

  tsRule.include = undefined;
  tsRule.exclude = /node_modules/;

  return config;
};

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
    if (isNext12(config)) {
      return updateNextGreaterThan12Config(config);
    }

    return updateNextLessThan12Config(config);
  },
};
