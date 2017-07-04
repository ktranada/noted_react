const path = require("path")

module.exports = {
  context: __dirname,
  entry: "./frontend/noted.jsx",
  output: {
    path: path.resolve(__dirname, "app", "assets", "javascripts"),
    filename: "bundle.js"
  },

  module: {
    rules: [
      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["es2015", "react"],
          plugins: ["transform-object-rest-spread"]
        }
      }
    ]
  },
  devtool: "source-maps",
  resolve: {
    extensions: [".js", ".jsx", "*"]
  }
}
