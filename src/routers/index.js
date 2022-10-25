const perkiraanRouter = require("./perkiraan.routes");
const jurnalRouter = require("./JurnalUmun.routes");
const labarugiRouter = require("./labarugi.routes");
const laporanBukuBesarRouter = require("./laporanBukuBesar.routes");
const arusKasRouter = require("./aruskas.routes");
const neracaRouter = require("./neraca.routes");

module.exports = (app) => {
  app.use("/api/v1/perkiraan", perkiraanRouter);
  app.use("/api/v1/jurnal", jurnalRouter);
  app.use("/api/v1/labarugi", labarugiRouter);
  app.use("/api/v1/laporan/buku-besar", laporanBukuBesarRouter);
  app.use("/api/v1/aruskas", arusKasRouter);
  app.use("/api/v1/neraca", neracaRouter);
};
