const express = require("express");
const {
  getAlldata,
  findDate,
  findMonth,
  findYear,
  finddate,
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
  findYear
);
router.get(
  "/search/:tahun/:bulan",
  findMonth
);
router.get(
  "/search/:tahun/:bulan/:hari",
  finddate
);



module.exports = router;
