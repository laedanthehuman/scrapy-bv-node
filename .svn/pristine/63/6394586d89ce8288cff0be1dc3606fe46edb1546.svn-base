"use strict";

const path = require('path'),
      Executor = require('../executor'),
      FileUtils = require('../../utils/fileutils'),
      BaixadorRagna = require('./ragana-baixador');


class Ragana extends Executor {
    constructor(app, tempdir, configuracaoBaixador) {
        super(app, configuracaoBaixador);
        const baixador = new BaixadorRagna(true, app, configuracaoBaixador);
        baixador.setWorkingDir(`temp${path.sep}${tempdir}`);
        FileUtils.mkDir(baixador.workingDir);
        this.file = configuracaoBaixador.pathDestino;
        this.baixador = baixador;
    }

    logica() {
        let Ragana = this;
        return new Promise(function(resolve, reject) {
            Ragana.downloadItem(Ragana);
            let now = new Date();
            Ragana.logger.info('Data Local: ' + now);
            now.setDate(now.getDate() - 7);
            let date = now.getDate() + '/' + now.getMonth() + 1 + '/' + now.getFullYear();
            Ragana.logger.info('Data a procurar: ' + date);

            Ragana.baixador.login().walkToOperacoes().walkToVendas().fillFormVendas(date).downloadFiles().then(() => {
                Ragana.logger.info(`Finalizado download de arquivos da Ragana em ${now}`);
                Ragana.extrairArquivo(`${Ragana.file.get()}`);
                return resolve(Ragana.service.saveSucessLog());
            }).catch(function(error) {
                Ragana.logger.error(`Finalizado download de arquivos da Ragana em ${now}`);

                Ragana.service.saveErrorLog({message: `Erro ao finalizar crawler da raganar: ${error}`});
                return reject(error);
            });

        });

    }

    downloadItem(Ragana) {
        this.baixador.on('download', function(downloadItem) {
            Ragana.logger.info('Iniciando download de ' + downloadItem.filename);
            Ragana.logger.info('Download em ' + Ragana.baixador.workingDir);

            var file = `${Ragana.baixador.workingDir}${path.sep}${downloadItem.filename}`;
            Ragana.baixador.download(file, downloadItem);
            Ragana.file = {
                path: Ragana.baixador.workingDir,
                name: downloadItem.filename,
                get: () => {
                    return file
                }
            };
        }, function(state, downloadItem) {
            switch (state) {
                case "interrupted":
                    Ragana.saveErrorLog({message: `Erro no download de ${downloadItem.filename} Download Interrompido`});
                    break;
                case "cancelled":
                    Ragana.logger.error();
                    Ragana.saveErrorLog({message: `Erro no download de ${downloadItem.filename} Download Cancelado`});
                    break;
            }
        });
    }
}

module.exports = Ragana;
