var path = require('path')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer')
var postcssImport = require('postcss-import')
var config = require('./config')
var utils = require('./utils')
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var projectRoot = path.resolve(process.cwd(), './')
var projectPackage = require(process.cwd() + '/package.json');

var env = process.env.NODE_ENV
// check env & config/index.js to decide weither to enable CSS Sourcemaps for the
// various preprocessor loaders added to vue-loader at the end of this file
var cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap)
var cssSourceMapProd = (env === 'production' && config.build.productionSourceMap)
var useCssSourceMap = cssSourceMapDev || cssSourceMapProd

let AUTOPREFIXER_BROWSERS = [
	'Android >= 4',
	'Chrome >= 35',
	'Firefox >= 31',
	'iOS >= 8',
	'Opera >= 12',
	'Safari >= 7.1',
];

module.exports = {
	entry: {
		app: './src/main.js'
	},
	output: {
		path: config.build.assetsRoot,
		publicPath: process.env.NODE_ENV === 'production' ?
			config.build.assetsPublicPath : config.dev.assetsPublicPath,
		filename: '[name].js'
	},
	resolve: {
		extensions: [
			'', '.js', '.css', '.less'
		],
		fallback: [path.join(process.cwd(), config.projectLayer + 'node_modules')],
		alias: {
			'src': path.resolve(process.cwd(), './src'),
			'public': path.resolve(process.cwd(), './public'),
			'fetch': 'whatwg-fetch',
			// 'components': path.resolve(process.cwd(), './src/components')
		}
	},
	resolveLoader: {
		fallback: [path.join(process.cwd(), config.projectLayer + 'node_modules')]
	},
	module: {
		preLoaders: [{
			test: /\.js$/,
			loader: 'eslint',
			include: projectRoot,
			exclude: /node_modules/
		}],
		loaders: [{
			test: /\.js$/,
			loader: 'babel',
			include: projectRoot,
			exclude: /node_modules/
		}, {
			test: /\.css$/,
			loader: ExtractTextPlugin.extract('style', 'css!postcss', {
				publicPath: '../'
			})
		}, {
			test: /\.less$/,
			loader: ExtractTextPlugin.extract('style', 'css!postcss!less', {
				publicPath: '../'
			})
		}, {
			test: /\.json$/,
			loader: 'json'
		}, {
			test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
			loader: 'url',
			query: {
				limit: 10000,
				name: utils.assetsPath('img/[name].[hash:8].[ext]')
			}
		}, {
			test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
			loader: 'url',
			query: {
				limit: 10000,
				name: utils.assetsPath('fonts/[name].[hash:8].[ext]')
			}
		}, {
			test: /\.html$/,
			loader: 'html',
			query: {
				minimize: true
			}
		}]
	},
	eslint: {
		formatter: require('eslint-friendly-formatter')
	},
	postcss: function (bundler) {
		return [
			postcssImport({
				addDependencyTo: bundler
			}),
			autoprefixer({
				browsers: AUTOPREFIXER_BROWSERS
			})
		]
	},
	plugins: [
		new webpack.DefinePlugin(projectPackage.webpackDefine || {})
	]
}