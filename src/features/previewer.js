const { compile } = require('./compile')

async function evmToolkitPreviewContent() {
    const bytecode = await compile()
    if(!bytecode) return 
    const byteCount = (bytecode.trim()).length / 2
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>EVM Toolkit - Preview</title>
        <style>
        .bytecode {
            line-break: anywhere;
            padding: 1em;
            background-color: var(--vscode-button-background);
            color: var(--vscode-button-foreground);
            border-radius: 6px;
            font-family: monospace;
            max-width: calc(2em + 76ch);
        }
        </style>
    </head>
    <body>
        <h1>bytecode</h1>
        <p>${byteCount} bytes</p>
        <p class="bytecode">0x${bytecode}</p>
    </body>
    </html>`
}

module.exports = {
    evmToolkitPreviewContent: evmToolkitPreviewContent
}