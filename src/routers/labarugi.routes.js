const express = require("express");
const {
  getAlldata,
  findDate,
  findMonth,
  findYear,
} = require("../controllers/labarugi.controller");

const {
  aggregateDebetKreditSaldo,
  aggregateForDateLabarugi,
  aggregateForYearLabarugi,
  aggregateForMonthLabarugi,
} = require("../middlewares");
const router = express.Router();

router.get("/",  getAlldata);
router.get("/search/:tahun", [aggregateForYearLabarugi], findYear);
router.get("/search/:tahun/:bulan", [aggregateForMonthLabarugi], findMonth);
router.get("/search/:tahun/:bulan/:hari", [aggregateForDateLabarugi], findDate);

module.exports = router;
