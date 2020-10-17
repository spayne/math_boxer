const path = require("path")
const HtmlWebPackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    main: "./src/main.js"
  },
  mode: "production",
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
              name: "images/[name].[ext]"
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
      inject: 'head'
    })
  ],

  

}