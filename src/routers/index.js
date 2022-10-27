const perkiraanRouter = require("./perkiraan.routes");
const jurnalRouter = require("./JurnalUmun.routes");
const labarugiRouter = require("./labarugi.routes");
const laporanBukuBesarRouter = require("./laporanBukuBesar.routes");
const userRouter = require("./user.routes");
const arusKasRouter = require("./aruskas.routes");
const neracaRouter = require("./neraca.routes");
const neracaSaldoRouter = require("./NeracaSaldo.routes");
const testerRouter = require("./tester.routes");

module.exports = (app) => {
  app.use("/api/v1/tester", testerRouter);
  app.use("/api/v1/user", userRouter);
  app.use("/api/v1/perkiraan", perkiraanRouter);
  app.use("/api/v1/jurnal", jurnalRouter);
  app.use("/api/v1/labarugi", labarugiRouter);
  app.use("/api/v1/laporan/jurnal", laporanBukuBesarRouter);
  app.use("/api/v1/aruskas", arusKasRouter);
  app.use("/api/v1/neraca", neracaRouter);
  app.use("/api/v1/neracasaldo", neracaSaldoRouter);
};
