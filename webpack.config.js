const ENV = process.env.NODE_ENV || 'development'

module.exports = require(ENV === 'production' ? './config/webpack.prod.js' : './config/webpack.dev.js')