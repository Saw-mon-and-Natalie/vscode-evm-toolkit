"use strict";
/**
 * @author github.com/Saw-mon-and-Natalie
 * @license MIT
 *
 *
 * */
/** imports */
const vscode = require("vscode");

const LANGUAGE_ID = "evm-toolkit";

function extensionConfig() {
  return vscode.workspace.getConfiguration(LANGUAGE_ID);
}

module.exports = {
  LANGUAGE_ID: LANGUAGE_ID,
  extensionConfig: extensionConfig,
};
