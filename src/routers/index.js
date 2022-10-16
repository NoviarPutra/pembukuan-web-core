const perkiraanRouter = require("./perkiraan.routes");
const jurnalRouter = require("./JurnalUmun.routes");

module.exports = (app) => {
  app.use("/api/v1/perkiraan", perkiraanRouter);
  app.use("/api/v1/jurnal", jurnalRouter);
};
