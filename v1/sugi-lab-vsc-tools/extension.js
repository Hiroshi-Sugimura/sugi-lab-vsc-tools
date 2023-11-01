// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');





//------------------------------------------------------------------------------
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('"sugi-lab-vsc-tools" is now active!');

	//================================================================
	// my functions

	//----------------------------------------------
	// 一文字大文字にする
	let upcaseForwardChar = vscode.commands.registerTextEditorCommand('sugimode.upcaseForwardChar', function (textEditor, edit) {
		let pos = textEditor.selection.active;  // 現在カーソル位置
		const teRange = new vscode.Range(pos.line, pos.character, pos.line, pos.character + 1);  // 一文字右を範囲に
		let te = textEditor.document.getText(teRange);  // 範囲の文字を取得
		edit.replace(teRange, te.toUpperCase());  // 範囲の文字を大文字に変更して置き換え
		vscode.commands.executeCommand("cursorRight");  // 一文字右へ移動
	});
	context.subscriptions.push(upcaseForwardChar);  // 関数登録


	// yyyy.MM.ddを更新する
	// yyyy.MM.dd を現在値にする
	let daytimeRrenewal = vscode.commands.registerTextEditorCommand('sugimode.daytimeRenewal', function (textEditor, edit) {
		// console.log('daytimeRrenewal()');
		let pos = textEditor.selection.active;  // 現在カーソル位置

		let today = new Date();
		let year = today.getFullYear().toString();
		let month = ('0' + (today.getMonth() + 1)).slice(-2);  // 月は0から始まるみたい
		let date = ('0' + today.getDate()).slice(-2);
		// console.log( year, month, date );

		const teRange = new vscode.Range(pos.line, 0, pos.line + 1, 0);  // 現在行だけをRangeとする
		// console.log(teRange);
		let te = textEditor.document.getText(teRange);  // 範囲の文字を取得
		// console.log(te);
		const reg = new RegExp(/[0-9][0-9][0-9][0-9](.)[0-9][0-9](.)[0-9][0-9]/, 'i');
		// console.log(reg);
		te = te.replace(reg, `${year}$1${month}$2${date}`);
		// console.log(te);
		edit.replace(teRange, te);  // 範囲の文字を置換
	});

	context.subscriptions.push(daytimeRrenewal);  // 関数登録

	// my functions end
	//================================================================

}

// This method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
