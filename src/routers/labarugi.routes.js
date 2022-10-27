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
  authorizationToken,
  aggregateDebetKreditLabarugi,
} = require("../middlewares");
const router = express.Router();

router.get("/", [authorizationToken], getAlldata);
router.get(
  "/search/:tahun",
  [authorizationToken],
  [aggregateForYearLabarugi],
  findYear
);
router.get(
  "/search/:tahun/:bulan",
  [authorizationToken],
  [aggregateForMonthLabarugi],
  findMonth
);



module.exports = router;
