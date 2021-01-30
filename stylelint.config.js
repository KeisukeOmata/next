// Install Visual Studio Code extensions Stylelint, Tailwind CSS Intellisense
// settings.json of Visual Studio Code
// "css.validate": false,
// "less.validate": false,
// "scss.validate": false
module.exports = {
  extends: ['stylelint-config-standard'],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'variants',
          'responsive',
          'screen',
        ],
      },
    ],
    'declaration-block-trailing-semicolon': null,
    'no-descending-specificity': null,
  },
}
