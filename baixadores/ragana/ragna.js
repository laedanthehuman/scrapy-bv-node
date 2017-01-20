import BaixadorRagna from "./ragana-baixador";
import FileUtils from "../../utils/fileutils"
import Executor from "../executor";
import path from "path";

export default class Ragana extends Executor {
    constructor(app, tempdir, configuracaoBaixador) {
        super(app, configuracaoBaixador);
        const baixador = new BaixadorRagna(true, app, configuracaoBaixador);
        baixador.setWorkingDir(`temp${path.sep}${tempdir}`);
        FileUtils.mkDir(baixador.workingDir);
        this.file = '';
        this.baixador = baixador;
    }

    logica(Ragana) {
        return new Promise(function(resolve, reject) {
            this = Ragana;
            Ragana.downloadItem(Ragana);
            let now = new Date();
            this.logger.info('Data Local: ' + now);
            now.setDate(now.getDate() - 7);
            let date = now.getDate() + '/' + now.getMonth() + 1 + '/' + now.getFullYear();
            this.logger.info('Data a procurar: ' + date);

            this.baixador.login().walkToOperacoes().walkToVendas().fillFormVendas(date).downloadFiles().then(() => {
                this.logger.info(`Finalizado download de arquivos da Ragana em ${now}`);
                this.extrairArquivo(`${this.file.get()}`);
                return resolve(this.saveSucessLog());
            }).catch(function(error) {
                saveErrorLog({message: `Erro ao finalizar crawler da raganar: ${error}`});
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
