const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ROOT_PATH = path.resolve(__dirname, '../');
const SRC_PATH = path.resolve(ROOT_PATH, 'src');
const cdnPath = '/';

module.exports = {
  context: SRC_PATH,
  // 定义能够打包的文件，文件后缀名
  resolve: {
    modules: ['node_modules', 'common'],
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      src: SRC_PATH,
      common: path.resolve(SRC_PATH, 'common'),
      sys: path.resolve(SRC_PATH, 'sys'),
    }
  },
  // 入口
  entry: {
    index: 'src/index.js',
  },
  // 输出
  output: {
    publicPath: cdnPath,
    filename: '[name].js',
    chunkFilename: 'chunk.[name].js',
  },

  module: {
    rules: [{
      test: /\.(js|tsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader?cacheDirectory',
      },
    }, { // css loader
      test: /\.css$/,
      exclude: path.resolve(SRC_PATH, 'sys'),
      use: ['style-loader', 'css-loader', 'postcss-loader'],
    }, { // less loader
      test: /\.less$/,
      exclude: path.resolve(SRC_PATH, 'sys'),
      use: ['style-loader', 'css-loader', 'postcss-loader', {
        loader: 'less-loader',
        options: {
          importLoaders: 1,
          javascriptEnabled: true
        }
      }]
    }, { // 业务样式, css module
      test: /\.less$/,
      include: path.resolve(SRC_PATH, 'sys'),
      use: ['style-loader', {
        loader: 'css-loader',
        options: {
          modules: true,
          localIdentName: '[local]_[hash:base64:8]',
        },
      }, 'postcss-loader', 'less-loader?javascriptEnabled'],
    }, { // 加载图片
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'url-loader',
      options: {
        limit: 8192,
        name: 'img/[name].[hash:base64:8].[ext]',
      },
    }, { // ts loader
      test: /\.tsx?$/,
      use: ['babel-loader', 'ts-loader']
    }, { // 加载字体文件, 路径为[path][name].ext
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      loader: 'file-loader',
      include: path.resolve(SRC_PATH, 'common/iconfont'),
      options: {
        name: 'common/iconfont/[name].[ext]',
      },
    }],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(SRC_PATH, 'index.html'),
      favicon: path.resolve(SRC_PATH, 'favicon.ico'),
    }),
    new webpack.HotModuleReplacementPlugin({
      multiStep: false
    }),
  ],
  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\/]node_modules[\/]/,
          priority: 0
        },
        default: {
          minChunks: 2,
          priority: -1,
          reuseExistingChunk: true
        },
      }
    }
  },
  // 性能设置
  performance: {
    hints: "warning",
    maxAssetSize: 30000000,
    maxEntrypointSize: 50000000,
    assetFilter: function (assetFilename) {
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    }
  }
}
