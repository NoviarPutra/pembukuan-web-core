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
  aggregateDebetKreditLabarugi,
} = require("../middlewares");
const router = express.Router();

router.get("/", [aggregateDebetKreditLabarugi], getAlldata);
router.get("/search/:tahun", [aggregateForYearLabarugi], findYear);
router.get("/search/:tahun/:bulan", [aggregateForMonthLabarugi], findMonth);


module.exports = router;
