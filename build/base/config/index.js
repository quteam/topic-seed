let path = require('path')

let projectDir = process.cwd().replace(__dirname.replace(/(.*)build\/base\/config$/, '$1'), '');
let projectPackage = require(process.cwd() + '/package.json');
let layerArr = [];
layerArr.length = projectDir.split('/').length + 1;

module.exports = {
	build: {
		env: require('./prod.env'),
		index: path.resolve(process.cwd(), 'dist/index.html'),
		assetsRoot: path.resolve(process.cwd(), 'dist'),
		assetsSubDirectory: './',
		assetsPublicPath: '',
		productionSourceMap: false,
		// Gzip off by default as many popular static hosts such as
		// Surge or Netlify already gzip all static assets for you.
		// Before setting to `true`, make sure to:
		// npm install --save-dev compression-webpack-plugin
		productionGzip: false,
		productionGzipExtensions: ['js', 'css']
	},
	dev: {
		env: require('./dev.env'),
		port: projectPackage.devPort || 8080,
		assetsSubDirectory: './',
		assetsPublicPath: '',
		proxyTable: {},
		// CSS Sourcemaps off by default because relative paths are "buggy"
		// with this option, according to the CSS-Loader README
		// (https://github.com/webpack/css-loader#sourcemaps)
		// In our experience, they generally work as expected,
		// just be aware of this issue when enabling this option.
		cssSourceMap: false
	},
	projectDir: projectDir,
	projectLayer: layerArr.join('../')
}