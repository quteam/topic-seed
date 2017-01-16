var path = require('path')
var autoprefixer = require('autoprefixer')
var postcssImport = require('postcss-import')
var config = require('./config')
var utils = require('./utils')
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var projectRoot = path.resolve(process.cwd(), './')

var env = process.env.NODE_ENV
// check env & config/main.js to decide weither to enable CSS Sourcemaps for the
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
			'', '.js', '.vue', '.css', '.less'
		],
		fallback: [path.join(process.cwd(), config.projectLayer + 'node_modules')],
		alias: {
			'vue$': 'vue/dist/vue',
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
			test: /\.vue$/,
			loader: 'eslint',
			include: projectRoot,
			exclude: /node_modules/
		}, {
			test: /\.js$/,
			loader: 'eslint',
			include: projectRoot,
			exclude: /node_modules/
		}],
		loaders: [{
			test: /\.vue$/,
			loader: 'vue'
		}, {
			test: /\.js$/,
			loader: 'babel',
			include: projectRoot,
			exclude: /node_modules/
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
	vue: {
		loaders: utils.cssLoaders({
			sourceMap: useCssSourceMap
		}),
		postcss: [autoprefixer({
			browsers: AUTOPREFIXER_BROWSERS
		})]
	}
}