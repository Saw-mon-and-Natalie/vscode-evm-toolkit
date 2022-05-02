const vscode = require('vscode')
const path = require('path')
const { promisify } = require('util')
const { exec:ex } = require('child_process')

const exec = promisify(ex)

async function compileActiveFile() {

    const bytecode = await compile()
    vscode.workspace.openTextDocument({
        "language": "evmbytecode",
        "content": `0x${bytecode}`
    }).then(doc => vscode.window.showTextDocument(doc, vscode.ViewColumn.Beside))
}

async function compile() {
    const editor = vscode.window.activeTextEditor;

    if (!editor || !editor.document) {
        return; 
    }

    if (path.extname(editor.document.fileName) !== '.etk' && path.extname(editor.document.fileName) !== '.evm-toolkit') {
        vscode.window.showWarningMessage('This not an EVM Toolkit file (*.etk)');
        return;
    }

    try {
        const { versionStdOut, versionStdErr } = await exec('eas --version')
        if(versionStdErr) {
            vscode.window.showWarningMessage('Make sure you have EVM Toolkit installed.');
            vscode.window.showErrorMessage(versionStdErr)
            return
        }
    } catch (error) {
        vscode.window.showErrorMessage(error)
        return
    }

    const filePath = editor.document.fileName;

    try {
        const { stdout, stderr } = await exec(`eas ${filePath}`)
        if(stderr) {
            vscode.window.showErrorMessage(stderr)
            return
        }

        return stdout
    } catch (error) {
        vscode.window.showErrorMessage(error)
        return
    }
}

module.exports = {
    compileActiveFile: compileActiveFile,
    compile: compile
}