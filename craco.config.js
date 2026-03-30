// craco.config.js
const path = require("path");
require("dotenv").config();

// Environment config
const config = {
  enableHealthCheck: process.env.ENABLE_HEALTH_CHECK === "true",
  enableVisualEdits: false,
};

// Optional health plugins
let WebpackHealthPlugin;
let setupHealthEndpoints;
let healthPluginInstance;

if (config.enableHealthCheck) {
  WebpackHealthPlugin = require("./plugins/health-check/webpack-health-plugin");
  setupHealthEndpoints = require("./plugins/health-check/health-endpoints");
  healthPluginInstance = new WebpackHealthPlugin();
}

module.exports = {
  eslint: {
    configure: {
      extends: ["plugin:react-hooks/recommended"],
      rules: {
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
      },
    },
  },

  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },

    configure: (webpackConfig) => {
      // ✅ DO NOT touch NODE_ENV
      // ✅ DO NOT remove React Refresh
      // ✅ Keep dev server behavior intact

      // Optimize watch performance
      webpackConfig.watchOptions = {
        ...webpackConfig.watchOptions,
        ignored: [
          "**/node_modules/**",
          "**/.git/**",
          "**/build/**",
          "**/dist/**",
          "**/coverage/**",
          "**/public/**",
        ],
      };

      // Optional health plugin
      if (config.enableHealthCheck && healthPluginInstance) {
        webpackConfig.plugins.push(healthPluginInstance);
      }

      return webpackConfig;
    },
  },

  devServer: (devServerConfig) => {
    // Optional health endpoints
    if (config.enableHealthCheck && setupHealthEndpoints && healthPluginInstance) {
      const originalSetupMiddlewares = devServerConfig.setupMiddlewares;

      devServerConfig.setupMiddlewares = (middlewares, devServer) => {
        if (originalSetupMiddlewares) {
          middlewares = originalSetupMiddlewares(middlewares, devServer);
        }

        setupHealthEndpoints(devServer, healthPluginInstance);
        return middlewares;
      };
    }

    // ✅ IMPORTANT: DO NOT disable websocket
    // devServerConfig.webSocketServer = false;

    return devServerConfig;
  },
};
