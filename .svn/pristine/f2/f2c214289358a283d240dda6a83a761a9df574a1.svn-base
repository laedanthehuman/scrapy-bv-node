
module.exports = (sequelize, DataType) => {

    const ConfigBaixador = sequelize.define('configuracaoBaixador', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        empresa:{
            type: DataType.INTEGER,
        },
        usuario:{
            type:DataType.STRING
        },
        senha:{
            type:DataType.STRING
        },
        //TODO: Trocar por DataType.ENUM e definir os nomes das enums
        tipo:{
            type:DataType.INTEGER
        },
        rede:{
            type:DataType.INTEGER
        },
        path_destino:{
            type:DataType.STRING
        },
        ativo:{
            type:DataType.BOOLEAN
        }
    },{
        classMethods: {
                    associate : function(models) {
                        ConfigBaixador.hasOne(models.logBaixadorErro);
                        ConfigBaixador.hasOne(models.logBaixadorSucesso);
                    }
          }
    });
    return ConfigBaixador;
}
