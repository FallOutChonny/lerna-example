const path = require('path')
const fs = require('fs')
const {
  addBabelPlugins,
  addBundleVisualizer,
  addWebpackAlias,
  babelInclude,
  override,
  removeModuleScopePlugin,
} = require('customize-cra')

const resolveApp = relativePath => path.resolve(__dirname, relativePath)

module.exports.configOverrides = function() {
  return {
    webpack: override(
      addBabelPlugins(
        [
          'babel-plugin-import',
          {
            libraryName: 'antd',
            style: 'css',
          },
          'antd',
        ],
        [
          'babel-plugin-import',
          {
            libraryName: 'antd-mobile',
            style: 'css',
          },
          'antd-mobile',
        ],
        [
          'babel-plugin-styled-components',
          {
            pure: true,
          },
        ],
        '@babel/plugin-proposal-optional-chaining',
      ),
      process.env.BUNDLE_VISUALIZE === '1' && addBundleVisualizer(),
      removeModuleScopePlugin(),
      babelInclude([fs.realpathSync('../shared'), fs.realpathSync('src')]),
      addWebpackAlias({
        moment: 'dayjs',
      }),
    ),
  }
}
