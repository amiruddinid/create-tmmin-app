const componentGenerator = require('./generators/component/index');
const componentGeneratorCLI = require('./generators/component/indexCLI');

/**
 *
 * @param {import('plop').NodePlopAPI} plop
 */
module.exports = function (plop) {
  plop.setGenerator('component', componentGenerator);
  plop.setGenerator('component-cli', componentGeneratorCLI);
};
