const express = require("express");
const {
 
  FindMonth, FindDate, FindYear, getAlldata,
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
  FindYear
);
router.get(
  "/search/:tahun/:bulan",
  [authorizationToken],
  FindMonth
);
router.get(
  "/search/:tahun/:bulan/:hari",
  [authorizationToken],
  FindDate
);



module.exports = router;
