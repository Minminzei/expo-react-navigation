const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const TerserPlugin = require('terser-webpack-plugin');

const baseDir = `${__dirname}/src/`;

const include = [
  baseDir,
  `${__dirname}/node_modules/react-native-vector-icons`,
];

const config = {
  mode: 'production',
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(tsx|ts)$/,
        exclude: [/node_modules/],
        loader: 'tslint-loader',
      },
      {
        test: /\.(tsx|ts)$/,
        exclude: [/node_modules/],
        loader: 'ts-loader',
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include,
        exclude: [/node_modules/],
        options: {
          presets:['@babel/preset-react'],
          cacheDirectory: true,
          plugins: [
            '@babel/plugin-proposal-class-properties',
          ]
        },
      },
      {
        test: /\.ttf$/,
        loader: 'url-loader',
        include:`${__dirname}/node_modules/react-native-vector-icons`,
      },
      {
        test: /\.(jpg|png)$/,
        loaders: 'url-loader'
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
            drop_console: false,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
        parallel: 2,
        cache: true,
        sourceMap: false,
        extractComments: false,
      }),
    ],
  },
};

module.exports = async function(env, argv) {
  const configWithExpo = await createExpoWebpackConfigAsync(config, argv);
  Object.assign(configWithExpo.resolve.alias, {
    '@containers': `${baseDir}containers`,
    '@components': `${baseDir}components`,
    '@modules': `${baseDir}modules`,
    '@reducers': `${baseDir}reducers`,
    '@libs': `${baseDir}libs`,
    'react-native': 'react-native-web',
    '@libs/sql': `${baseDir}libs/sqlweb`,
    'expo-file-system': `${baseDir}libs/file-system-web`,
  });
  configWithExpo.devServer = {
    historyApiFallback: true,
  };
  return configWithExpo;
};
