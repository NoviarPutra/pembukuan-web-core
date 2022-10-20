const express = require("express");
const {
  CreateJurnal,
  getAlldata,
  getdatabykode,
  updatejurnal,
  deletejurnal,
  findDate,
  findYear,
  findMonth,
} = require("../controllers/JurnalUmun.controller");

const { createLabarugi } = require("../controllers/labarugi.controller");
const {
  validatejurnalBeforeCreate,
  validateJurnalBeforeUpdate,
  aggregateDebetKredit,
  aggregateForYear,
  aggregateForMonth,
  aggregateForDate,
} = require("../middlewares");
const router = express.Router();

router.post("/", [validatejurnalBeforeCreate], CreateJurnal, createLabarugi);
router.get("/", [aggregateDebetKredit], getAlldata);
router.get("/:kodePerkiraan", getdatabykode);
router.put("/:_id", [validateJurnalBeforeUpdate], updatejurnal);
router.delete("/delete/:_id", deletejurnal);
router.get("/search/:tahun", [aggregateForYear], findYear);
router.get("/search/:tahun/:bulan", [aggregateForMonth], findMonth);
router.get("/search/:tahun/:bulan/:hari", [aggregateForDate], findDate);

module.exports = router;
