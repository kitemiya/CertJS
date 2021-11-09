const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");

const path = require("path");


module.exports = {
  entry: {
    main: './src/main.js'
  }
  ,
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'mdm_ui')
  },
  plugins: [

    new UglifyJsPlugin({

      uglifyOptions: {
        output: {
          comments: false,
        },
        keep_fnames: false,
        mangle: true,
        compress: true,
      }
    }
    ),
    new CompressionPlugin({
      filename: "[path]",
      algorithm: "gzip",
      test: /\.(js|css)$/
    })

  ]

};