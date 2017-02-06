module.exports = (sequelize, DataType) => {
    const ConfigBaixador =  sequelize.define('configuracao_baixador',{
        id:{
            type:DataType.INTEGER,
             notNull: true,
             primaryKey:true
        },
        ativo:{
            type:DataType.BOOLEAN,
            notNull: true,
        },
        empresa_id:{
            type:DataType.INTEGER,
             notNull: true
        },
        path_destino:{
            type:DataType.STRING,
             notNull: true
        },
        rede_id:{
            type:DataType.INTEGER,
             notNull: true
        },
        senha:{
            type:DataType.STRING,
             notNull: true
        },
        tipo:{
            type:DataType.INTEGER,
             notNull: true
        },
        url:{
            type:DataType.STRING,
             notNull: true
        },
        usuario:{
            type:DataType.STRING,
             notNull: true
        }
    });

    return ConfigBaixador;
};
