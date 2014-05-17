// Much of this is cribbed from `css-loader`

var csso = require('csso');
var SourceNode = require('source-map').SourceNode;
var loaderUtils = require('loader-utils');

function requireCSSLoader(content) {
  this.cacheable && this.cacheable();
  var result = [];

  content = content.replace(
    /requireStatic\(['"]?(.*?)['"]?\)/g,
    'url(%CSSURL[%$1%]CSSURL%)'
  );

  var tree = csso.parse(content, 'stylesheet');
  if (tree && this && this.minimize) {
    tree = csso.compress(tree);
    tree = csso.cleanInfo(tree);
  }

  var css = JSON.stringify(tree ? csso.translate(tree) : '');

  var uriRegExp = /%CSSURL\[%(.*?)%\]CSSURL%/g;
  css = css.replace(uriRegExp, function(str) {
    var match = /^%CSSURL\[%(.*?)%\]CSSURL%$/.exec(str);
    var idx = match[1].indexOf('?');
    if (idx < 0) {
      idx = match[1].indexOf('#');
    }

    if (idx > 0) {
      // in cases like url('webfont.eot?#iefix')
      var url = JSON.parse('"' + match[1].substr(0, idx) + '"');
      return (
        '"+require(' + JSON.stringify(url) + ')+"' + match[1].substr(idx)
      );
    } else if (idx === 0) {
      // only hash
      return match[1];
    }
    var url = JSON.parse('"' + match[1] + '"');
    return '"+require(' + JSON.stringify(url) + ')+"';
  });

  result.push(css);

  var cssRequest = loaderUtils.getRemainingRequest(this);
  var node = new SourceNode(
    1, 0,
    cssRequest,
    'module.exports =\n\t' + result.join(' +\n\t') + ';'
  );
  var stringWithMap = node.toStringWithSourceMap({
    file: loaderUtils.getCurrentRequest(this)
  });
  stringWithMap.map.setSourceContent(cssRequest, content);

  this.callback(null, stringWithMap.code, stringWithMap.map.toJSON());
}

module.exports = requireCSSLoader;
