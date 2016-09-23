"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _solfegejsEpubManga = require("solfegejs-epub-manga");

var _solfegejsEpubManga2 = _interopRequireDefault(_solfegejsEpubManga);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Kindlegen wrapper
 */
class Bundle {
  /**
   * Constructor
   */
  constructor() {}

  /**
   * Get bundle path
   *
   * @return  {String}        The bundle path
   */
  getPath() {
    return __dirname;
  }

  /**
   * Install dependencies
   *
   * @param   {Application}   application     Solfege application
   */
  installDependencies(application) {
    application.addBundle(new _solfegejsEpubManga2.default());
  }
}
exports.default = Bundle;
module.exports = exports['default'];