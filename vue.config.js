// path依赖
const path = require('path');
// 代码压缩
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// gzip压缩
const CompressionPlugin = require('compression-webpack-plugin');

// 是否为生产环境
const isProduction = process.env.NODE_ENV !== 'development';

// 查找文件方法
const resolve = dir => {
  return path.join(__dirname, dir)
};

module.exports = {
  publicPath: process.env.VUE_APP_ASSERT_URL,
  outputDir: "dist",
  assetsDir: "static",
  // lintOnSave: process.env.NODE_ENV === "development",
  lintOnSave: false,
  productionSourceMap: false,
  transpileDependencies: ['element-ui'],
  devServer: {
		port: 8080, // 端口号
		open: true, //配置自动启动浏览器  http://172.11.11.22:8888/rest/XX/
    // compress: false, // 开启压缩
    overlay: {//在浏览器上全屏显示编译的errors或warnings。默认是关闭的。
      warnings: false,
      errors: true
    },
    hotOnly: true, // 热更新
		proxy: {
      [process.env.VUE_APP_BASE_API]:{
        target: process.env.BACKGROUND_APPLICATION_URL,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: '',
        }
      }
    }
  },
  configureWebpack: config => {
    config.name = "GXPT";
    config.resolve.alias['@asset'] = resolve('src');

    // 生产环境相关配置
    if (isProduction) {
    //   代码压缩
      config.plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            //生产环境自动删除console
            compress: {
              // warnings: false, // 若打包错误，则注释这行
              drop_debugger: true,
              drop_console: true,
              pure_funcs: ['console.log']
            }
          },
          sourceMap: false,
          parallel: true,
        })
      )
    }

    config.performance = {
      hints:'warning',//警告 webpack 的性能提示
      //入口起点的最大体积
      maxEntrypointSize: 50000000,
      //生成文件的最大体积
      maxAssetSize: 30000000,
      //只给出 js 文件的性能提示
      assetFilter: function(assetFilename) {
        return assetFilename.endsWith('.js');
      }
    }
  },
  chainWebpack(config) {
   // 压缩代码
    config.optimization.minimize(true);

    // config.module
    //     .rule('images')
    //     .test(/\.(png|gif|jpe?g|svg)$/i)
    //     .use('file-loader')
    //     .loader('file-loader')
    //     .options({
    //         name: '[name]_[hash:8].[ext]',
    //         outputPath: 'images/',
    //         limit: 10240//10kB
    //     })
    //     .end()
    // set preserveWhitespace
    config.module
    .rule('vue')
    .use('vue-loader')
    .loader('vue-loader')
    .tap(options => {
      options.compilerOptions.preserveWhitespace = true;
      return options
    })
    .end();
    config
    .when(!isProduction, config =>
      config.devtool('cheap-source-map')
    );

    // 开启js、css的gzip压缩
    if (process.env.NODE_ENV === 'production') {
      config.plugin('compressionPlugin')
      .use(new CompressionPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.js$|\.html$|\.json$|\.css/,// 匹配文件名
        threshold: 10240, // 对超过10k的数据压缩
        minRatio:0.8, // 只有压缩率小于这个值的资源才会被处理
        deleteOriginalAssets: false // 删除原文件
      }))
    }

    // config.when(isProduction, config => {
    //   config
    //   .plugin('ScriptExtHtmlWebpackPlugin')
    //   .after('html')
    //   .use('script-ext-html-webpack-plugin', [
    //     {
    //       // `runtime` must same as runtimeChunk name. default is `runtime`
    //       // inline: /runtime\..*\.js$/
    //     }
    //   ])
    //   .end();

      // 分割代码,公共代码抽离
    //   config.optimization.splitChunks({
    //     chunks: 'all',
    //     cacheGroups: {
    //       vendors: {
    //         name: 'chunk-vendors',
    //         minChunks: 2,
    //         test: /node_modules/,
    //         priority: 10,
    //         chunks: 'initial'
    //       },
    //       commons: {
    //         name: 'chunk-commons',
    //         test: resolve('src/components'), // can customize your rules
    //         minChunks: 3, //  minimum common number
    //         priority: 5,
    //         reuseExistingChunk: true
    //       }
    //     }
    //   });
    //   config.optimization.runtimeChunk('single')
    // })

    //优化
    // config
    // .plugin('webpack-bundle-analyzer')
    // .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)

     // 删除预加载
     config.plugins.delete('prefetch-largescreen');
     config.plugins.delete('preload-index');
     config.plugins.delete('preload-largescreen');
     config.plugins.delete('prefetch-index');
  },
  // CSS分离
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: process.env.NODE_ENV === 'production' ? {
      ignoreOrder: true,
   } : false,
    // 开启 CSS source maps?
    sourceMap: false,
    // 启用 CSS modules for all css / pre-processor files.
    requireModuleExtension: true
  }
};
