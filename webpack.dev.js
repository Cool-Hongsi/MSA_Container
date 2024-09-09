const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");

module.exports = merge(common, {
  mode: "development",
  // devtool => false (In browser inspector, can NOT figure out exact line and source code because it is based on building file)
  // devtool => "some cases" (In browser inspector, can figure out exact line and source code because it is based on source file)
  devtool: "source-map",

  // Starting with webpack-dev-server command => No generate build files for dev
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].js",
    // [name] => entry point name
  },
  devServer: {
    historyApiFallback: true, // 404 Page will fallback to index.html
    port: 3000,
    hot: true,
  },
  module: {
    rules: [
      // Not in common file because of MiniCssExtractPlugin in prod
      {
        test: /\.(scss|css)$/,
        use: [
          "style-loader", // 4. Inject styles into dom
          "css-loader", // 3. Turn css into js
          "postcss-loader", // 2. Convert modern css to vanilla css & Autoprefixer (-webkit, -moz, and -ms) based on .browserslistrc
          "sass-loader", // 1. Turn sass into css
        ],
      },
    ],
  },
});
