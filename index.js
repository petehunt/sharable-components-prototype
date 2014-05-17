/** @jsx React.DOM */
var React = require('react');

requireStatic('./style.css');

React.renderComponent(
  <div className="MyComponent" />,
  document.body
);
