var path = require("path");
var webpack = require('webpack');

module.exports = {
  entry: {
    '@ngui/sticky': path.join(__dirname, 'src', 'index.ts')
  },
  resolve: {
    extensions: ['.ts', '.js', '.json', '.css', '.html']
  },
  resolveLoader: {
    modules: [path.join(__dirname, 'node_modules')]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "sticky.umd.js",
    library: ["stikcy"],
    libraryTarget: "umd"
  },
  externals: [
    /^rxjs\//,    //.... any other way? rx.umd.min.js does work?
    /^@angular\//
  ],
  devtool: 'source-map',
  module: {
    rules: [
      { // Support for .ts files.
        test: /\.ts$/,
        use: ['ts-loader', 'angular2-template-loader']
      }
    ]
  }
};
