const http = require('http');

module.exports = app => {
    if (process.env.NODE_ENV !== "test") {
        app.db.sequelize.authenticate().done(() => {
            http.createServer(app)
                 .listen(app.get("port"), () => console.log(`BAIXADOR API - porta ${app.get("port")}`));
        });
    }
};
