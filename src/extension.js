"use strict";
/**
 * @author github.com/Saw-mon-and-Natalie
 * @license MIT
 *
 * */

/** imports */
const vscode = require("vscode");
const settings = require("./settings");
const { provideHoverHandler } = require("./features/hover");
const { compileActiveFile } = require("./features/compile")
const { evmToolkitPreviewContent } = require("./features/previewer")

/** global vars */
var activeEditor;
var previewPanel;

function onActivate(context) {
  const active = vscode.window.activeTextEditor;
  activeEditor = active;

  registerDocType(settings.LANGUAGE_ID);

  function registerDocType(type) {
    context.subscriptions.push(vscode.languages.reg);
    context.subscriptions.push(
      vscode.languages.registerHoverProvider(type, {
        provideHover(document, position, token) {
          return provideHoverHandler(document, position, token, type);
        },
      })
    );

    context.subscriptions.push(vscode.commands.registerCommand('evm-toolkit.compile', async () => {
      await compileActiveFile();
    }));

    context.subscriptions.push(vscode.commands.registerCommand('evm-toolkit.show-preview', async () => {
      if(!previewPanel) {
        previewPanel = vscode.window.createWebviewPanel("evm-toolkit", "EVM Toolkit - Preview", vscode.ViewColumn.Beside, {})
        previewPanel.onDidDispose((e) => {
          previewPanel = undefined
        }, null, context.subscriptions)
      }
      previewPanel.reveal(vscode.ViewColumn.Beside)

      const content = await evmToolkitPreviewContent()
      if(!content) return
      previewPanel.webview.html = content
    }));


    vscode.workspace.onDidChangeTextDocument(async (e) => {
      if(!previewPanel || !previewPanel.visible) {
        return
      }

      const content = await evmToolkitPreviewContent()
      if(!content) return
      previewPanel.webview.html = content
    })

    vscode.window.onDidChangeActiveTextEditor(
      (editor) => {
        activeEditor = editor;
        if (editor) {
        }
      },
      null,
      context.subscriptions
    );
  }
}

/* exports */
exports.activate = onActivate;
