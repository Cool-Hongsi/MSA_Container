const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // Create html file in output directory with importing tags (building files)
const { ModuleFederationPlugin } = webpack.container; // For MicroFrontend
const deps = require("./package.json").dependencies;

module.exports = {
  entry: {
    main: path.resolve(__dirname, "./src/index.ts"),
    // Can add more entry point here for multiple bundling
  },
  resolve: {
    extensions: ["*", ".js", ".jsx", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader", "ts-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|woff(2)?|ttf|otf|eot|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "./resource",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "./public/index.html"),
      favicon: false,
      // favicon: './src/resource/image/favicon.png',
    }),
    // Preset environment variable while compiling
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    // For MicroFrontend
    new ModuleFederationPlugin({
      name: "container",
      /*
        [ Cart ModuleFederationPlugin ]
        name: "remoteCart",
        filename: "remoteEntry.js",
        exposes: {
          "./Cart": "./src/component/Cart",
        },
      */
      // expose 된 앱을 가져오는 역할
      remotes: {
        cart: "remoteCart@http://localhost:3002/remoteEntry.js",
        // key (cart)
        // - 호스트앱 (Container)에서 사용할 때 쓰는 별칭
        // value (remoteCart@http://localhost:3002/remoteEntry.js)
        // - 맨 앞에 remoteCart는 위 리모트앱 (Cart)에서 정의한 name 값
        // - 가운데 주소는 호스팅된 사이트 주소
        // - 마지막 remoteEntry.js는 위 리모트앱 (Cart)에서 정의한 filename 값
        product: "remoteProduct@http://localhost:3001/remoteEntry.js",
      },
      // 런타임에 Federated된 앱 간에 공유하거나 공유받을 의존성 패키지를 정의
      shared: {
        ...deps, // 현재 앱 package.json에 있는 의존성 패키지를 모두 공유하거나 공유받겠다는 의미
        /*
          Network Tab을 확인하면, 각 remoteEntry.js와 함께
          각 리모트앱에서 공유한 의존성 패키지 (...deps)를 vendors 이름으로 다운로드 받는다.

          의존성 패키지가 서로 공유하면서, 중복되는 경우, Vendors에서 다운로드 받은 것을 우선으로 사용하고,
          만약 존재하지 않으면, 본 앱 Vendors에서 사용한다.

          실제 사용은, 공유 패키지를 모아놓은 별도 앱을 만들고, 해당 앱에서 ...deps를 이용해서 패키지들을 공유하고,
          다른 앱에서는 해당 앱에서 공유된 패키지들을 Vendors 이름으로 다운로드 받는다. 그리고 없는 경우 본 앱 Vendors에서 찾아 사용한다.

          shared 기능을 사용하면, 같은 패키지를 여러번 다운로드 받을 필요가 없어진다.
          요청 횟수 감소, 사용 리소스 감소, 성능 향상
        */

        // react와 react-dom 패키지는 override한다.
        react: { singleton: true, requiredVersion: deps.react },
        // singleton: true => 항상 이미 생성된 단일 인스턴스를 공유한다. 각 리모트앱을 공유하는 과정에서 각각 react 패키지가 있고, 각각 인스턴스를 가지게 된다면 문제가 된다. 따라서 공유시에는 단일 인스턴스를 사용하도록 만들어준다.
        // requiredVersion => 해당 패키지가 필요로 하는 버전을 명시한다.
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
  ],
};
