"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Command to convert a manga directory
 */
class ConvertMangaCommand {
  /**
   * Constructor
   *
   * @param   {Kindlegen}     kindlegen   Kindlegen service
   */
  constructor(kindlegen) {
    this.kindlegen = kindlegen;
  }

  /**
   * Get command name
   *
   * @return  {string}    Command name
   */
  getName() {
    return "kindlegen:convert-manga";
  }

  /**
   * Get command description
   *
   * @return  {string}    Command description
   */
  getDescription() {
    return "Convert manga directory";
  }

  /**
   * Execute the command
   *
   * @param   {Array}     parameters  Command parameters
   */
  *execute(parameters) {
    var targetPath = parameters[0];
    var newFilePath = parameters[1];
    var title = parameters[2];

    yield this.kindlegen.convertManga(targetPath, newFilePath, title);
  }
}
exports.default = ConvertMangaCommand;
module.exports = exports['default'];