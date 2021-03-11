// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const { exec } = require("child_process");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	// console.log('Congratulations, your extension "bcompare" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.bcompare', function () {
		// The code you place here will be executed every time your command is executed

		let bcompare = vscode.workspace.getConfiguration('bcompare');
		let bin = "\"" + bcompare.path + "\"";
		bin = bin.replace(/'/g, "\"").replace(/""/g, "\"").replace("$1", "").replace("$2", "").replace(/\s/g, "");
		let visibleTextEditors = vscode.window.visibleTextEditors;
		let editors = [];
		visibleTextEditors.forEach((editor) => {
			editors.push(editor.document.uri.path);
		});
		if (bcompare.path.indexOf("$2") > -1) {
			exec(`${bin} ${editors[0]} ${editors[1]}`);
		} else {
			exec(`${bin} ${vscode.window.activeTextEditor.document.uri.path}`);
		}
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
