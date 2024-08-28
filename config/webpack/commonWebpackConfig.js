// The source code including full typescript support is available at:
// https://github.com/shakacode/react_on_rails_demo_ssr_hmr/blob/master/config/webpack/commonWebpackConfig.js

// Common configuration applying to client and server configuration
const { generateWebpackConfig, merge } = require("shakapacker");
const Dotenv = require("dotenv-webpack");

const commonOptions = {
  plugins: [new Dotenv()],
  resolve: {
    extensions: [".css", ".ts", ".tsx"],
  },
};

// Copy the object using merge b/c the baseClientWebpackConfig and commonOptions are mutable globals
const commonWebpackConfig = () =>
  merge({}, generateWebpackConfig(), commonOptions);

module.exports = commonWebpackConfig;
