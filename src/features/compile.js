const vscode = require('vscode')
const path = require('path')
const { exec } = require('child_process')

function compileActiveFile() {
    const editor = vscode.window.activeTextEditor;

    if (!editor || !editor.document) {
        return; 
    }

    if (path.extname(editor.document.fileName) !== '.etk' && path.extname(editor.document.fileName) !== '.evm-toolkit') {
        vscode.window.showWarningMessage('This not an EVM Toolkit file (*.etk)');
        return;
    }

    exec('eas --version', (err, stdout, stderr) => {
        if(err) {
            vscode.window.showWarningMessage('Make sure you have EVM Toolkit installed.');
            vscode.window.showErrorMessage(err)
            vscode.window.showErrorMessage(stderr)
            return
        }
    })

    const filePath = editor.document.fileName;

    exec(`eas ${filePath}`, (err, stdout, stderr) => {
        if(err) {
            vscode.window.showErrorMessage(err)
            vscode.window.showErrorMessage(stderr)
            return
        }

        vscode.workspace.openTextDocument({
            "language": "evmbytecode",
            "content": `0x${stdout}`
        }).then(doc => vscode.window.showTextDocument(doc, vscode.ViewColumn.Beside))
        
    })

    return
}

module.exports = {
    compileActiveFile: compileActiveFile,
}