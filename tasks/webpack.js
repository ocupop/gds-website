import path from 'path'
import webpack from 'webpack'

let config = {
  mode: 'production',
  entry: { main: './_scripts/index.js' },
  output: {
    filename: './js/main.js',
    path: path.resolve(__dirname, '../src')

  },
  context: path.resolve(__dirname, '../src'),
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env'
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    })
  ]
}


function scripts() {
  return new Promise(resolve => webpack(config, (err, stats) => {
    if (err) {
      console.log('Webpack', err)
    }
    console.log(stats.toString())
    resolve()
  }))
}

module.exports = { config, scripts }