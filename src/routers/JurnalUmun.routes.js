const express = require("express");
const {
  CreateJurnal,
  getAlldata,
  getdatabykode,
  updatejurnal,
  deletejurnal,
  findDate,
  findMonth,
  findYear,
} = require("../controllers/JurnalUmun.controller");

const {
  // validatejurnalBeforeCreate,
  validateJurnalBeforeUpdate,
  aggregateDebetKredit,
  aggregateForYear,
  aggregateForMonth,
  aggregateForDate,
  validateBeforeCreateJurnal,
} = require("../middlewares");
const router = express.Router();

// router.post("/", [validatejurnalBeforeCreate],  CreateJurnal );
router.post("/", [validateBeforeCreateJurnal], CreateJurnal);
router.get("/", [aggregateDebetKredit], getAlldata);
router.get("/:nomerBukti", getdatabykode);
router.put("/:_id", [validateJurnalBeforeUpdate], updatejurnal);
router.delete("/delete/:_id", deletejurnal);
router.get("/search/:tahun", [aggregateForYear], findYear);
router.get("/search/:tahun/:bulan", [aggregateForMonth], findMonth);
router.get("/search/:tahun/:bulan/:hari", [aggregateForDate], findDate);

module.exports = router;
