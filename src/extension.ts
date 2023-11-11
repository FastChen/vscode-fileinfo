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
			//fileSizeStatusBarItem.text = getFileSize(file.fileName) + ' KB';
			fileSizeStatusBarItem.text = AutoFileSizeFormat(getFileSize(file.fileName));
			fileSizeStatusBarItem.show();
		} else {
			fileSizeStatusBarItem.hide();
		}
	}
	catch {
		fileSizeStatusBarItem.hide();
	}
}

// 自动转换文件格式
function AutoFileSizeFormat(filesize: number) {

	let PB = filesize / 1024.0 / 1024 / 1024 / 1024 / 1024;
	let TB = filesize / 1024.0 / 1024 / 1024 / 1024;
	let GB = filesize / 1024.0 / 1024 / 1024;
	let MB = filesize / 1024.0 / 1024;
	let KB = filesize; //filesize / 1024.0; KB直接显示就不除了，不然位数太小。

	if (PB > 1)
	{
		return PB + " PB";
	}
	else if (TB > 1)
	{
		return TB + " TB";
	}
	else if (GB > 1)
	{
		return GB + " GB";
	}
	else if (MB > 1)
	{
		return MB + " MB";
	}
	else
	{
		return KB + " KB";
	}
}
