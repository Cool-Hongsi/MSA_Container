const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // Separate js and css loading for performance

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map", // Recommended choice for production builds with high quality SourceMaps for error handling.
  performance: {
    hints: false, // Hide any warning (such as size limit exceeds)
  },
  output: {
    path: path.resolve(__dirname, "build"),
    clean: true,
    filename: "[name].[contenthash].js",
    // [name] => entry point name in common
    // [contenthash] => Prevent caching in browser
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
  ],
  module: {
    rules: [
      // Not in common file because of MiniCssExtractPlugin in prod
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader, // 4. Extract css into files
          "css-loader", // 3. Turn css into js
          "postcss-loader", // 2. Convert modern css to vanilla css & Autoprefixer (-webkit, -moz, and -ms) based on .browserslistrc
          "sass-loader", // 1. Turn sass into css
        ],
      },
    ],
  },
});
