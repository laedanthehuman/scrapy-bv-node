const TipoBaixador = require('../enums/tipo-baixador');
require('../utils/function-name');
module.exports = app => {

    app.post('/baixador', (req, res) => {
        let cfg = req.body;
        logica(cfg).then((log) => {
            app.libs.logger.info(`Configuracao ${cfg.id} Executada com sucesso!`);
            res.status(200).send(`Configuracao ${cfg.id} Executada com sucesso!`);
        }, (err) => {
            app.libs.logger.error(`Configuracao ${cfg.id} Executada com erro: ${err.message}`);
            res.status(500).send(`Configuracao ${cfg.id} Executada com erro: ${err.message}`);
        });
    });
    function logica(configuracao) {
        app.libs.logger.info(`Executando Configuracao ${configuracao.id}`);
        let tipo = configuracao.tipo;
        if (configuracao.ativo) {
            // configuracao.path_destino = FileUtils.normalizePath(configuracao.path_destino);
            const tipoBaixador = TipoBaixador[tipo];
            const baixador = new tipoBaixador(app, '', configuracao);
            return baixador.logica();
        }
    }
}
