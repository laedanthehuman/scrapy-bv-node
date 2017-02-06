const logger = require('./logger');
module.exports = {
    isTest: false,
    sequelize: {
        database: 'EEXTRATO_TEST',
        username: 'postgres',
        password: '1234',
        params: {
            dialect: 'postgres',
            define: {
                underscored: true,
                timestamps: false,
                freezeTableName:true
            },
            logging: logger.debug,
        }
    },
    consign: {
        verbose: true
    }
};
