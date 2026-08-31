const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const repositoryName = (process.env.GITHUB_REPOSITORY || '').split('/')[1] || '';
const isUserOrOrgPagesRepo = repositoryName.endsWith('.github.io');

const basePath = process.env.BASE_PATH !== undefined
  ? process.env.BASE_PATH
  : (process.env.GITHUB_ACTIONS === 'true' && repositoryName && !isUserOrOrgPagesRepo
      ? `/${repositoryName}`
      : '');

const normalizedBasePath = basePath === '/' ? '' : basePath.replace(/\/$/, '');
const publicPath = normalizedBasePath ? `${normalizedBasePath}/` : '/';

module.exports = {
  entry: path.resolve(__dirname, 'src/index.tsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'assets/js/[name].[contenthash:8].js',
    publicPath,
    clean: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.md$/i,
        type: 'asset/source',
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: { filename: 'assets/fonts/[name][ext]' },
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        type: 'asset/resource',
        generator: { filename: 'assets/images/[name].[contenthash:8][ext]' },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.SPFORGE_DOCS_BASE_PATH': JSON.stringify(normalizedBasePath),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      title: 'SonkoPatriot Forge Documentation',
    }),
  ],
  devServer: {
    port: 3100,
    historyApiFallback: true,
    hot: true,
  },
  devtool: 'source-map',
};
