const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'TODOs List'
      }),

      new InjectManifest({
        swSrc: './src-sw.js', // Path to your service worker file
        swDest: 'src-sw.js', // Name of the generated service worker file
      }),

      new WebpackPwaManifest({
        fingerprints: false,
        name: 'Jate\'s PWA',
        short_name: 'jate',
        description: 'Just another text editor',
        background_color: '#01579b',
        theme_color: '#ffffff',
        'theme-color': '#ffffff',
        start_url: '../index.html',
        display: 'standalone',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
          {
            src: path.resolve('src/images/logo.png'),
            size: '1024x1024',
            ios: true,
          },
        ],
      }),
     
    ],


    module: {
      rules: [
        // TODO: Add CSS loaders and babel to webpack.
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};
