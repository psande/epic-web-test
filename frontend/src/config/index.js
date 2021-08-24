/**
 * Core Configuration.
 *
 * Usage:
 *   Just instantiate and use. It won't be locked until setConfig is called.
 *
 *   To extend and lock it: Config.setConfig({key: value});
 *   To lock it without changes: Config.setConfig();
 *
 * Note:
 *   NODE_ENV can't be changed, it will be set based if running a dev, production or testing server.
 *   REACT_APP_IS_DEV can be added as isEnvProd in case we want to run a dev env that mimics production env behaviour.
 *   Read more: https://create-react-app.dev/docs/adding-custom-environment-variables/
 */

const Config = {
  // Environments
  env: process.env.NODE_ENV,
  isProd: process.env.NODE_ENV === 'production',
  isDev: process.env.NODE_ENV === 'development',

  // Paths
  BasePath: process.env.REACT_APP_BASE_PATH,

  // API
  Api: {
    root: process.env.REACT_APP_API_URL,
    pageSize: 8,
  },

  // Extends and lock the config.
  setConfig (extConfig) {
    // Add extended configuration if present.
    if (typeof extConfig === 'object' && extConfig !== null) {
      const keys = Object.keys(extConfig)
      const values = Object.values(extConfig)
      keys.forEach((key, i) => {
        this[key] = values[i]
      })
    }

    // Lock config so it can't be changed during the lifetime of the app.
    Object.freeze(Config)
  },
}

export default Config
