var jurnalUmunController = require("./JurnalUmun.controller");

module.exports = (app) => {
    app.use("/jurnalUmun", jurnalUmunController);
}