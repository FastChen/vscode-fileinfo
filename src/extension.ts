import * as vscode from 'vscode';
import { Config } from './Config';
import { FileSize } from './FileSize';

let fileSizeStatusBarItem: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {
	console.log('[FASTCHEN.COM] FileInfo is read to go.');

	// 创建文件大小状态栏
	fileSizeStatusBarItem = vscode.window.createStatusBarItem(Config.getStatusBarLocation == "left" ? vscode.StatusBarAlignment.Left : vscode.StatusBarAlignment.Right, 0);
	fileSizeStatusBarItem.tooltip = '当前文件大小';

	// 设置事件
	let onSaveGetFileSize = vscode.workspace.onDidSaveTextDocument(updateStatusBarItem);
	let onDidChangeActiveTextEditorGetFileSize = vscode.window.onDidChangeActiveTextEditor(updateStatusBarItem);

	context.subscriptions.push(onSaveGetFileSize);
	context.subscriptions.push(onDidChangeActiveTextEditorGetFileSize);

	updateStatusBarItem();
}

export function deactivate() { }

// 更新状态栏
function updateStatusBarItem(): void {
	try {
		let file = vscode.window.activeTextEditor?.document;
		if (file && file.uri.scheme === 'file') {
			let sizeStr = FileSize.getFileSize(file.fileName);
			fileSizeStatusBarItem.text = sizeStr;
			fileSizeStatusBarItem.tooltip = '当前文件大小：' + sizeStr;
			fileSizeStatusBarItem.show();
		} else {
			fileSizeStatusBarItem.hide();
		}
	}
	catch {
		fileSizeStatusBarItem.hide();
	}
}