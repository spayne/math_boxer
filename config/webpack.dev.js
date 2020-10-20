const path = require("path")
const HtmlWebPackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  entry: {
    main: "./src/main.js",
    test_env_map_main: "./src/test_env_map_main.js",
    test_gltf_main: "./src/test_gltf_main.js"
  },
  mode: "development",
  devtool: "source-map",
  output: {
    filename: "[name]-bundle.js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/build"
  },
  devServer: {
    contentBase: "dist",
    overlay: true
  },
  module: {
    rules: [
      
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }]
      },
      {
        test: /\.jpg$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "assets/[name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.glb$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "assets/[name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, '../src', 'index.html'),
      inject: 'head', // make sure aframe is there before html
      chunks:["main"]
    }),
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, '../src', 'test_env_map_main.html'),
      filename: 'test_env_map_main.html',
      chunks:["test_env_map_main"]
    }),
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, '../src', 'test_gltf_main.html'),
      filename: 'test_gltf_main.html',
      chunks:["test_gltf_main"]
    }),
    new webpack.ProvidePlugin({
      process: 'process'
      // ... necessary in webpack 5 to use the assert module which has an implicit dependency on process.
    })

  ],

  

}