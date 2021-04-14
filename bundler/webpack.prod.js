const { merge } = require("webpack-merge");
const webpack = require("webpack");
const commonConfiguration = require("./webpack.common.js");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = merge(commonConfiguration, {
  mode: "production",
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      SOCKETURL: JSON.stringify("https://jassio-api.herokuapp.com/"),
    }),
  ],
});
