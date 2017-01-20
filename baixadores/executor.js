import Checksum from "../utils/checksum";
import FileUtils from "../utils/fileutils"
import ExtractUtils from "../utils/extract";
import copy from "copy";
import path from "path";

export default class Executor {
    constructor(app, configuracaoBaixador) {
        this.libs = app.libs;
        this.models = app.db.models;
        this.logger = this.libs.logger;
        this.configuracaoBaixador = configuracaoBaixador;
    }

    salvaSucesso(log) {
        let logSucesso = this.models.logBaixadorSucesso.build(log);
        return logSucesso.save();
    }

    salvaErro(log) {
        let logErro = this.models.logBaixadorErro.build(log);
        return logErro.save();
    }

    saveSucessLog() {
        var checksumArquivo = Checksum.generateCheckSum(`${this.file.get()}`);
        var now = new Date().toString();
        var log = {
            data: now,
            nome_arquivo: this.file.name,
            checksum: checksumArquivo,
            configuracao_baixador_id: this.configuracaoBaixador.id
        };

        this.salvaSucesso(log).then((log) => {
            this.logger.info(`Download de ${log.nome_arquivo} em ${log.data} com checksum ${log.checksum} Salvo com sucesso`);
            return log;
        }).catch(err => {
            this.logger.error(`Erro ao salvar o log ${err}`);
            saveErrorLog(err);
        });
    }

    saveErrorLog(erro) {
        this.logger.error(`${erro.message}`);
        var now = new Date().toString();
        var log = {
            data: now,
            erro: erro.message,
            configuracao_baixador_id: this.configuracaoBaixador.id
        };
        this.models.logBaixadorErro.destroy({
            where: {
                configuracao_baixador_id: this.configuracaoBaixador.id
            },
            truncate: true
        }).then(rows => {
            this.salvaErro(log).then((log) => {
                this.logger.info(`Erro ${erro} salvo com sucesso!`);
            }).catch(err => {
                this.logger.error(`Erro ao salvar o log ${err}`);
            });
        });

    }
    extrairArquivo(file) {
        ExtractUtils.extractFile(file, this.baixador.workingDir).then((files) => {
            this.logger.info(`${this.file.get()} extraido com sucesso`);
            let Executor = this;
            Executor.moveFile(Executor, files).then((filesMoved) => {
                Executor.logger.log('info', `Arquivos Movidos para ${Executor.configuracaoBaixador.path_destino}`);
                FileUtils.removeFile(this.baixador.workingDir);
            }).catch((err) => {
                Executor.logger.log('error', 'Erro ao mover arquivos para backup: ' + err);
                Executor.saveErrorLog(err);
            })
        }).catch(err => {
            this.logger.error(`Falha ao extrair arquivo: ${err}`);
            this.saveErrorLog(err);
        });
    }
    moveFile(Executor, files) {
        return new Promise(function(resolve, reject) {
            copy.each(files, Executor.configuracaoBaixador.path_destino, function(err, files) {
                if (err) {
                    return reject(err);
                }
                return resolve(files);
            });
        });
    }

}
