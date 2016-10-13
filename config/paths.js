const path = require('path');
const ROOT_DIR = path.resolve(__dirname, '../')

function resolveApp(relativePath) {
  return path.resolve(ROOT_DIR, relativePath)
}

module.exports = {
  publicPath: '/',
  appBuild: resolveApp('./dist'),
  appPublic: resolveApp('/'),
  appHtml: 'index.html',
  appIndexJs: resolveApp('src/main.js'),
  appSrc: resolveApp('src'),
  appPackageJson: resolveApp('package.json')
};
