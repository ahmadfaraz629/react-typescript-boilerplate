const rewireReactHotLoader = require('react-app-rewire-hot-loader');
const webpack = require('webpack');

module.exports = (config, env) => {
  if (env === 'development') {
    config.resolve.alias['react-dom'] = '@hot-loader/react-dom';
  }
  config.plugins.push(new webpack.EnvironmentPlugin(process.env));
  config = rewireReactHotLoader(config, env);
  return config;
};
