const perkiraanRouter = require("./perkiraan.routes");
const jurnalRouter = require("./JurnalUmun.routes");
const { entryPoint } = require("../helpers");

module.exports = (app) => {
  app.use("/api/v1/perkiraan", perkiraanRouter);
  app.use("/api/v1/jurnal", jurnalRouter);
  app.get("/", (req, res) => {
    return res.json(entryPoint());
  });
};
