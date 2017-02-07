"use strict";

const FileUtils     = require('../utils/fileutils'),
      ExtractUtils  = require('../utils/extract'),
      Service       = require('./service'),
      copy          = require('copy'),
      path          = require('path');


class Executor {
    constructor(app, configuracaoBaixador) {
        this.libs = app.libs;
        this.service = new Service(app,configuracaoBaixador);
        this.logger = this.libs.logger;
        this.configuracaoBaixador = configuracaoBaixador;
    }


    extrairArquivo(file) {
        let Executor = this;
        return ExtractUtils.extractFile(file, this.baixador.workingDir);
    }
    moveFile(files) {
        let Executor = this;
        return new Promise(function(resolve, reject) {
            copy.each(files, Executor.configuracaoBaixador.pathDestino, function(err, files) {
                if (err) {
                    return reject(err);
                }
                return resolve(files);
            });
        });
    }

}

module.exports = Executor;
