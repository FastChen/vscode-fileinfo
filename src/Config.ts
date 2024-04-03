import { workspace } from 'vscode';

export class Config {

    public static get configuration() {
        return workspace.getConfiguration('fileinfo.settings');
    }

    private static getSettings<T>(val: string): T {
        return Config.configuration.get(val) as T;
    }

    public static get getStatusBarLocation(): string {
        return Config.getSettings<string>('statusbar.location');
    }

    public static get getAutoFileSizeFormat(): boolean {
        return Config.getSettings<boolean>('autofilesizeformat');
    }
}