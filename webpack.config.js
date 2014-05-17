var path = require('path');

var REQUIRE_STATIC_LOADER = path.resolve(path.join(__dirname, 'require-static-loader'));

module.exports = {
  cache: true,
  entry: './index',
  output: {
    filename: 'browser-bundle.js'
  },
  module: {
    loaders: [
      {test: /\.js$/, loader: REQUIRE_STATIC_LOADER + '!jsx-loader?harmony'},
      {test: /\.css$/, loader: './require-static-loader!style-loader!./require-css-loader'},
      {test: /\.less$/, loader: './require-static-loader!style-loader!./require-css-loader!less-loader'},
      {test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192'},
    ]
  },
  resolve: {
    extensions: ['', '.js', '.css', '.less', '.png', '.jpg', '.gif'],
    modulesDirectories: ['./node_modules']
  }
};
