import path from 'path';
import fs from 'fs';
import winston from 'winston';
import Baixador from "../baixador";
import raganaMap from './ragana.json';
import Nightmare from 'nightmare';

require('nightmare-download-manager')(Nightmare);
export default class BaixadorRagna extends Baixador {
    constructor (hasToShow,app,configuracaoBaixador) {
        super(hasToShow,app,configuracaoBaixador);
        this.configuracaoBaixador = configuracaoBaixador;
        this.configureEvents();
    };

    configureEvents(){
        this.nightmare.on('console', console.log.bind(console))
        this.nightmare.on('did-navigate-in-page',(event,url,isMainFrame) =>{
            this.saveErrorLog({message:`Erro: Navegação indevida: Evento: ${event} Url: ${url}`});

        });
        this.nightmare.on('did-get-redirect-request', (event ,oldURL,newUrl,isMainFrame,httpResponseCode,requestMethod,referrer,headers) =>{
            this.saveErrorLog({message:`Erro: Redirecionamento inesperado de ${oldURL} para ${newUrl} codigo de Response: ${httpResponseCode}`});
        });
    }

    login() {
        this.nightmare
            .downloadManager()
            .goto(raganaMap.url)
            .insert(raganaMap.types[0].field, raganaMap.types[0].value)
            .insert(raganaMap.types[1].field, raganaMap.types[1].value)
            .click(raganaMap.clicks[0])
            .wait('div.item > a[href="/portal/areaUsuarioWeb/operacao"]');
        return this;
    }
    walkToOperacoes() {
        this.nightmare
            .click('div.item > a[href="/portal/areaUsuarioWeb/operacao"]')
            .wait('div.telaMenu');
        return this;
    }
    walkToVendas() {
        this.nightmare
            .click('a[href="/portal/areaUsuarioWeb/extratoVenda"]')
            .wait('input#searchFromData');
        return this;
    }
    fillFormVendas(date) {
        this.nightmare
            .insert('input#searchFromData', date)
            .click('input.search')
            .wait(3000)
        return this;
    }
    downloadFiles() {
        return this.nightmare.check(raganaMap.checks[0])
            .wait(raganaMap.waits[6])
            .click(raganaMap.clicks[4])
            .waitDownloadsComplete()
            .end();
    }

}
