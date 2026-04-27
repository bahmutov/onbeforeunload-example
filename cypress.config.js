const { defineConfig } = require('cypress')

module.exports = defineConfig({
  allowCypressEnv: false,
  viewportHeight: 100,
  viewportWidth: 300,
  defaultBrowser: 'electron',

  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
})
