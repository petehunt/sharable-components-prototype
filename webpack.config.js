var path = require('path');

var REQUIRE_STATIC_LOADER = path.resolve(path.join(__dirname, 'lib', 'require-static-loader'));
var REQUIRE_CSS_LOADER = path.resolve(path.join(__dirname, 'lib', 'require-css-loader'));

var STATIC_ROOT = 'dist/'; // Public URL where statics live

module.exports = {
  cache: true,
  entry: './index',
  output: {
    path: __dirname + '/dist',
    filename: 'browser-bundle.js'
  },
  module: {
    loaders: [
      {test: /\.js$/, loader: REQUIRE_STATIC_LOADER + '!jsx?harmony'},
      {test: /\.css$/, loader: REQUIRE_STATIC_LOADER + '!style!' + REQUIRE_CSS_LOADER},
      {test: /\.less$/, loader: REQUIRE_STATIC_LOADER + '!style!' + REQUIRE_CSS_LOADER + '!less'},
      {test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192&prefix=' + STATIC_ROOT},
    ]
  },
  resolve: {
    extensions: ['', '.js', '.css', '.less', '.png', '.jpg', '.gif'],
    modulesDirectories: ['./node_modules']
  }
};
