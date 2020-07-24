const withCss = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const withImage = require('next-images');

module.exports = withImage(withCss(withSass()));
