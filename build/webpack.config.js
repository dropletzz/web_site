const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const WebappWebpackPlugin = require('webapp-webpack-plugin');

const retrieveParams = (pageData, lang) => {
  const dataJson = require('./data.json');
  const pageDataJson = pageData ? require(`./${pageData}.json`) : {};
  const templateParams = Object.assign({}, dataJson, pageDataJson, {lang, baseUrl: {en: '/', it: '/it/'}});
  return templateParams;
}

const isDevelopment = process.env.NODE_ENV !== 'production';

const templateOptions = !isDevelopment && {
  html5: true,
  collapseWhitespace: true,
  caseSensitive: true,
  removeComments: true,
  removeEmptyElements: true
}

module.exports = {
  entry: {
    easteregg: './src/js/easteregg.js',
    home: './src/js/home.js',
    blog: './src/js/blog.js',
    slides: './src/js/slides.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist')
  },
  devtool: isDevelopment && "source-map",
  devServer: {
    port: 3000,
    open: true,
    contentBase: path.join(__dirname, "../src")
  },
  module: {
    rules: [
      {
        test: /\.handlebars$/,
        loader: "handlebars-loader",
        options: {
          helperDirs: path.join(__dirname, 'handlebarHelpers'),
          precompileOptions: {
            knownHelpersOnly: false,
          },
        }
      },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: isDevelopment,
              minimize: !isDevelopment
            }
          },
          {
            loader: "postcss-loader",
            options: {
              autoprefixer: {
                browsers: ["last 2 versions"]
              },
              sourceMap: isDevelopment,
              plugins: () => [
                autoprefixer
              ]
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: isDevelopment
            }
          }
        ]
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: '[name].[ext]',
              outputPath: 'static/',
              useRelativePath: true,
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                enabled: true,
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75
              }
            }
          }
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/'
          }
        }]
      }
    ]
  },
  plugins: [
    /** Since Webpack 4 */
    new webpack.LoaderOptionsPlugin({
      options: {
        handlebarsLoader: {}
      }
    }),
    new MiniCssExtractPlugin({
      filename: "[name]-styles.css",
      chunkFilename: "[id].css"
    }),
    new HtmlWebpackPlugin({
      title: 'CodicePlastico',
      template: './src/templates/home.handlebars',
      templateParameters: retrieveParams('home', 'en'),
      minify: templateOptions,
      chunks: ['easteregg', 'home']
    }),
    new HtmlWebpackPlugin({
      title: 'CodicePlastico',
      template: './src/templates/home.handlebars',
      filename: 'it/index.html',
      templateParameters: retrieveParams('home', 'it'),
      minify: templateOptions,
      chunks: ['easteregg', 'home']
    }),
    new HtmlWebpackPlugin({
      title: 'CodicePlastico',
      template: './src/templates/case-history.handlebars',
      filename: 'case-history/index.html',
      templateParameters: retrieveParams('case-history', 'en'),
      minify: templateOptions,
      chunks: ['easteregg']
    }),
    new HtmlWebpackPlugin({
      title: 'CodicePlastico',
      template: './src/templates/case-history.handlebars',
      filename: 'it/case-history/index.html',
      templateParameters: retrieveParams('case-history', 'it'),
      minify: templateOptions,
      chunks: ['easteregg']
    }),
    new HtmlWebpackPlugin({
      title: 'CodicePlastico',
      template: './src/templates/services.handlebars',
      filename: 'services/index.html',
      templateParameters: retrieveParams('services', 'en'),
      minify: templateOptions,
      chunks: ['easteregg']
    }),
    new HtmlWebpackPlugin({
      title: 'CodicePlastico',
      template: './src/templates/services.handlebars',
      filename: 'it/services/index.html',
      templateParameters: retrieveParams('services', 'it'),
      minify: templateOptions,
      chunks: ['easteregg']
    }),
    new HtmlWebpackPlugin({
      title: 'CodicePlastico',
      template: './src/templates/blog.handlebars',
      filename: 'blog/index.html',
      templateParameters: retrieveParams(null, 'en'),
      minify: templateOptions,
      chunks: ['blog']
    }),
    new HtmlWebpackPlugin({
      title: 'CodicePlastico',
      template: './src/templates/blog.handlebars',
      filename: 'it/blog/index.html',
      templateParameters: retrieveParams(null, 'it'),
      minify: templateOptions,
      chunks: ['blog']
    }),
    new HtmlWebpackPlugin({
      title: 'CodicePlastico',
      template: './src/templates/slides.handlebars',
      filename: 'slides/index.html',
      templateParameters: retrieveParams(null, 'en'),
      minify: templateOptions,
      chunks: ['slides']
    }),
    new HtmlWebpackPlugin({
      title: 'CodicePlastico',
      template: './src/templates/slides.handlebars',
      filename: 'it/slides/index.html',
      templateParameters: retrieveParams(null, 'it'),
      minify: templateOptions,
      chunks: ['slides']
    }),
    // new WebappWebpackPlugin('./src/static/favicon.png')
  ]
};
