//We define the functionality of webpack in this file, which we initialize it

const path = require('path')

const config = {
  //File that will be the entry point of our app to be bundle
  entry: './src/index.js',
  //Location where the bundle code will be located
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'main.js',
  },
  //Define loader to convert JSX code to JavaScript
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react', '@babel/preset-env'],
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
}
module.exports = config
