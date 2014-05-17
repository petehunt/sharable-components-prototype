function requireStaticLoader(source) {
  this.cacheable && this.cacheable();
  return source.replace(/requireStatic/g, 'require');
}

module.exports = requireStaticLoader;
