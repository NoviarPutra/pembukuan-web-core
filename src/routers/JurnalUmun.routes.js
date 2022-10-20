const express = require("express");
const {
  CreateJurnal,
  getAlldata,
  getdatabykode,
  updatejurnal,
  deletejurnal,
  findDate,
} = require("../controllers/JurnalUmun.controller");

const { createLabarugi } = require("../controllers/labarugi.controller");
const {
  validatejurnalBeforeCreate,
  validateJurnalBeforeUpdate,
  aggregateDebetKredit,
} = require("../middlewares");
const router = express.Router();

router.post("/", [validatejurnalBeforeCreate], CreateJurnal, createLabarugi);
router.get("/", [aggregateDebetKredit], getAlldata);
router.get("/:kodePerkiraan", getdatabykode);
router.put("/:_id", [validateJurnalBeforeUpdate], updatejurnal);
router.delete("/delete/:_id", deletejurnal);
router.get("/search/tanggal/:date", findDate);
router.get("/search/bulan/:bulan");
router.get("/search/tahun/:tahun");

module.exports = router;
