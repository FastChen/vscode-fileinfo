import { Config } from './Config';

export class FileSize {
    // 获取文件大小
    public static getFileSize(filepath: String) {
        const fs = require('fs');
        const file = fs.statSync(filepath);
        let size = Config.getAutoFileSizeFormat == true ? FileSize.AutoFileSizeFormat(file.size) : file.size + ' B';
        console.log(`PATH: ${filepath} | OriginSIZE: ${file.size} B | FormatSIZE: ${size} | AutoFormat: ${Config.getAutoFileSizeFormat}`);
        return size;
    }

    // 自动转换文件格式
    public static AutoFileSizeFormat(filesize: number) {
        let EB = filesize / 1024.0 / 1024 / 1024 / 1024 / 1024 / 1024;
        let PB = filesize / 1024.0 / 1024 / 1024 / 1024 / 1024;
        let TB = filesize / 1024.0 / 1024 / 1024 / 1024;
        let GB = filesize / 1024.0 / 1024 / 1024;
        let MB = filesize / 1024.0 / 1024;
        let KB = filesize / 1024.0;

        if (EB > 1) {
            return EB.toFixed(2) + " EB";
        }
        else if (PB > 1) {
            return PB.toFixed(2) + " PB";
        }
        else if (TB > 1) {
            return TB.toFixed(2) + " TB";
        }
        else if (GB > 1) {
            return GB.toFixed(2) + " GB";
        }
        else if (MB > 1) {
            return MB.toFixed(2) + " MB";
        }
        else if (KB > 1) {
            return KB.toFixed(1) + " KB";
        }
        else {
            return filesize + " B";
        }
    }
}