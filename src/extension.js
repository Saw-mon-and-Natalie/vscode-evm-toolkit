'use strict';
/** 
 * @author github.com/Saw-mon-and-Natalie
 * @license MIT
 * 
 * */

/** imports */
const vscode = require("vscode");
const settings = require("./settings");

/** global vars */
var activeEditor;

function onActivate(context) {
    const active = vscode.window.activeTextEditor;
    activeEditor = active;

    registerDocType(settings.LANGUAGE_ID);

    function registerDocType(type) {
        context.subscriptions.push(
            vscode.languages.reg
        );
        vscode.window.onDidChangeActiveTextEditor(editor => {
            activeEditor = editor;
            if (editor) {}
        }, null, context.subscriptions);
    }
}

/* exports */
exports.activate = onActivate;