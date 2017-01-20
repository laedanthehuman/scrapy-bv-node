import mv from "mv";
import mkdirp from "mkdirp";
import fs from "fs";
import path from "path";
import rmdir from "rmdir";
export default class FileUtils {

    static removeFile(file) {
        console.log(file);
        rmdir(file, function(err, dirs, files) {
            console.log('Arquivos removidos');
        });
    }

    static moveFile(actualFilePath, destFilePath) {
        mv(actualFilePath, destFilePath, {
            mkdirp: true
        }, function(err) {
            if (err) {
                return err;
            }
            console.log(`Movido com sucesso`);
        });
    }
    static mkDir(dir) {
        mkdirp(dir, function(err) {
            if (err)
                return err;
            }
        );
    }

    static normalizePath(filePath) {
        let sep = '\\';
        let path = filePath.replace(/\\|\\\\/g, sep);
        return path;
    }

};
