// babel-loader configuration for transpilation

module.exports = {
  presets: [
    "@babel/preset-env", // for compiling ES2015+ syntax
    "@babel/preset-react", // for React
    "@babel/preset-typescript", // for TypeScript
  ],
  plugins: [
    ["@babel/transform-runtime"], // for async await
  ],
};
