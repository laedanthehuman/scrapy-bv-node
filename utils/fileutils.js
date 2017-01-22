const mv = require('mv'),
      mkdirp = require('mkdirp'),
      fs     = require('fs'),
      path   = require('path'),
      rmdir  = require('rmdir');

class FileUtils {

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

module.exports = FileUtils;