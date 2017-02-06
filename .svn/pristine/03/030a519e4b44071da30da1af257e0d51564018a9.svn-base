"use strict";

const Nightmare = require('nightmare'),
      path      = require('path'),
      fs        = require('fs');
class Baixador  {
    constructor(hasToShow,app,configuracaoBaixador) {
        this.nightmare = new Nightmare({
            show: hasToShow, loadTimeout: 30000, // in ms,
            switches: {
                'ignore-certificate-errors': true,
                'enable-logging': true
            }
        });

    }
    on(event, callback, erroCallback) {
        this.nightmare.on(event, function(state, downloadItem) {
            switch (state) {
                case "started":
                    callback(downloadItem);
                    break;
                case "interrupted":
                    erroCallback(state,downloadItem);
                    break;
                case "cancelled":
                    erroCallback(state,downloadItem);
                    break;
            }
        });
    }
    download(filename, downloadItem) {
        this.nightmare.emit('download', filename, downloadItem);
    }

    setWorkingDir(dir) {
        let tempdir = path.join(path.dirname(fs.realpathSync(__filename)), dir);
        this.workingDir = tempdir;
    }
    configuraEventos(){

    }
}

module.exports = Baixador;
