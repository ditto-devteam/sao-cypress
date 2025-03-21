const { defineConfig } = require("cypress");

module.exports = defineConfig({
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },

  // e2e: {
  //   setupNodeEvents(on, config) {
  //     // implement node event listeners here
  //   },
  // },

  e2e: {
    // baseUrl: 'https://reforest-office.idevcool.com',
    baseUrl: 'https://sao.devditto.com/login/',
    // keystrokeDelay: 50,
  },
});
