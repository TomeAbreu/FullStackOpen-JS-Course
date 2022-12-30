//We define the functionality of webpack in this file, which we initialize it

const path = require('path')
const webpack = require('webpack')

//Config receives two arguments: env and argv to check if it's dev or prod mode
const config = (env, argv) => {
  console.log('argv', argv.mode)
  console.log('env', env)

  //Define backend url for dev and prod modes
  const backend_url =
    argv.mode === 'production'
      ? 'https://obscure-harbor-49797.herokuapp.com/api/notes'
      : 'http://localhost:3001/notes'

  return {
    //File that will be the entry point of our app to be bundle
    entry: './src/index.js',
    //Location where the bundle code will be located
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'main.js',
    },
    //Define dev server properties
    devServer: {
      static: path.resolve(__dirname, 'build'),
      compress: true,
      port: 3000,
    },
    //Add source map to fix bugs
    devtool: 'source-map',
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
    plugins: [
      //Defining global default constants(backend_url) that can be used in the bundled code
      new webpack.DefinePlugin({
        BACKEND_URL: JSON.stringify(backend_url),
      }),
    ],
  }
}
module.exports = config
