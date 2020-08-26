const path = require("path");
const webpack = require("webpack");

module.exports = {
  stories: ["../src/**/*.stories.*"],

  webpackFinal: (config) => {
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(
        /api\/index.ts$/,
        path.resolve(__dirname, "stub/api/index.ts")
      )
    );
    return config;
  },
};
