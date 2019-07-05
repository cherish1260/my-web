var config = require('./webpack.base.config');

config.devtool = 'cheap-module-eval-source-map';

config.mode = 'development';

const path = require('path');
const ROOT_PATH = path.resolve(__dirname, '../');
const SRC_PATH = path.resolve(ROOT_PATH, 'src');

config.devServer = {
  port: 5000,
  historyApiFallback: true,
  // open: true,
  // host: "0.0.0.0",
  proxy: {
    '/api/*': {
      target: 'http://127.0.0.1:5001',
      secure: false,
      changeOrigin: true,
    },
  },
};
// config.module.rules.push({
//   test: /\.(js)$/,
//   enforce: 'pre',
//   use: [
//     {
//       options: {
//         formatter: require.resolve('react-dev-utils/eslintFormatter'),
//         eslintPath: require.resolve('eslint'),
//       },
//       loader: require.resolve('eslint-loader'),
//     },
//   ],
//   include: SRC_PATH,
//   exclude: path.resolve(ROOT_PATH, "/node_modules"),
// });

module.exports = config