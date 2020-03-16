// console.log(process.env.VUE_APP_BASE_URL)
console.log(process.env.NODE_ENV)
// console.log(process.env.VUE_APP_BASE_URL)

const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css']
module.exports = {
	// 选项...
	//例如，如果你的应用被部署在 https://www.my-app.com/my-app/，则设置 publicPath 为 /my-app/。
	publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
	//当运行 vue-cli-service build 时生成的生产环境构建文件的目录。
	outputDir: 'dist',
	//放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
	assetsDir: './',
	//指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径
	indexPath: 'index.html',
	//关闭文件名哈希
	filenameHashing: false,
	pages: {
		index: {
			// page 的入口
			entry: 'src/main.js',
			// 模板来源
			template: 'public/index.html',
			// 在 dist/index.html 的输出
			filename: 'index.html',
			// 当使用 title 选项时，
			// template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
			title: 'Index Page',
			// 在这个页面中包含的块，默认情况下会包含
			// 提取出来的通用 chunk 和 vendor chunk。
			chunks: ['chunk-vendors', 'chunk-common', 'index']
		},
	},

	//让 lint 错误在开发时直接显示在浏览器中 true警告仅仅会被输出到命令行，且不会使得编译失败。
	// lintOnSave: process.env.NODE_ENV !== 'production' ? 'error' : false,
	lintOnSave: false,

	runtimeCompiler: false,
	//你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。没被编译的依赖
	transpileDependencies: [],
	//是否看未加密的错误位置
	productionSourceMap: true,

	integrity: false,
	configureWebpack: config => {
		// config.externals = {
		// 	'vue': 'Vue',
        //     'vue-router': 'VueRouter',
        //     'vuex': 'Vuex',
        //     'axios': 'axios'

		// }

		if (process.env.NODE_ENV === 'production') {
			config.optimization.minimizer[0].options.terserOptions.compress.warnings = false
			config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
			config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = true
			config.optimization.minimizer[0].options.terserOptions.compress.pure_funcs = ['console.log']

			config.plugins.push(new CompressionWebpackPlugin({
				algorithm: 'gzip',
				test:/\.js$|\.html$|\.css/,
				threshold: 10240,
				deleteOriginalAssets: false,
				minRatio: 0.8
			  }))

				

			// console.log(config)
			// 为生产环境修改配置...
		} else {
			// process.env.BASE_API = '/api/'
			// 为开发环境修改配置...
		}
	},
	chainWebpack: config => {
		config.module
			.rule('vue')
			.use('vue-loader')
			.loader('vue-loader')
			.tap(options => {
				// 修改它的选项...
				return options
			})
		// const svgRule = config.module.rule('svg')
		// 清除已有的所有 loader。
		// 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
		// svgRule.uses.clear()
		// svgRule
		// 	.test(/\.svg$/)
		// 	.include.add(path.resolve(__dirname, './src/icons'))
		// 	.end()
		// 	.use('svg-sprite-loader')
		// 	.loader('svg-sprite-loader')
		// 	.options({
		// 		symbolId: 'icon-[name]'
		// 	})
		// const fileRule = config.module.rule('file')
		// fileRule.uses.clear()
		// fileRule
		// 	.test(/\.svg$/)
		// 	.exclude.add(path.resolve(__dirname, './src/icons'))
		// 	.end()
		// 	.use('file-loader')
		// 	.loader('file-loader')


	},
	//设置为 true 后你就可以去掉文件名中的 .module 并将所有的 *.(css|scss|sass|less|styl(us)?) 文件视为 CSS 
	// css: {
	//     modules: true
	//   },
	devServer: {
		proxy: {
			'/api': {
				target: 'http://wearewwx.com:8080',
				// target: 'http://2821r97k36.wicp.vip',
				// ws: true,
				changeOrigin: true,
				pathRewrite: {
					'^/api': '/'
				}
			},
			// '/foo': {
			// 	target: '<other_url>'
			// }
		}
	},
	pluginOptions:{
		pwa: {
			iconPaths: {
			  favicon32: './favicon.ico',
			  favicon16: './favicon.ico',
			  appleTouchIcon: './favicon.ico',
			  maskIcon: './favicon.ico',
			  msTileImage: './favicon.ico'
			}
		  }
	}
	
}
