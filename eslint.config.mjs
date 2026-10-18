export default [{
  files: ["**/*.js"],
  linterOptions: {
    reportUnusedDisableDirectives: "off"
  },
  rules: {
    "no-console": "error",
    "eqeqeq": ["error", "always"]
  }
}];
