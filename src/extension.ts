import * as vscode from 'vscode';

let fileSizeStatusBarItem: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {
	console.log('fileinfo active.');

	// 创建文件大小状态栏
	fileSizeStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 0);
	fileSizeStatusBarItem.tooltip = '当前文件大小';

	// 设置事件
	let onSaveGetFileSize = vscode.workspace.onDidSaveTextDocument(updateStatusBarItem);
	let onDidChangeActiveTextEditorGetFileSize = vscode.window.onDidChangeActiveTextEditor(updateStatusBarItem);

	context.subscriptions.push(onSaveGetFileSize);
	context.subscriptions.push(onDidChangeActiveTextEditorGetFileSize);

	updateStatusBarItem();
}

export function deactivate() { }

// 获取文件大小
function getFileSize(filepath: String) {
	const fs = require('fs');
	const file = fs.statSync(filepath);
	console.log(filepath + ': ' + file.size);
	return file.size;
}

// 更新状态栏
function updateStatusBarItem(): void {
	try {
		let file = vscode.window.activeTextEditor?.document;

		if (file && file.uri.scheme === 'file') {
			fileSizeStatusBarItem.text = getFileSize(file.fileName) + ' KB';
			fileSizeStatusBarItem.show();
		} else {
			fileSizeStatusBarItem.hide();
		}
	}
	catch {
		fileSizeStatusBarItem.hide();
	}
}
