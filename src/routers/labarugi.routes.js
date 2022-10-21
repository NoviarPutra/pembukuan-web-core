const express = require("express");
const { createLabarugi, getAlldata, findDate, findMonth, findYear, deleteLabarugi } = require("../controllers/labarugi.controller")

const {
    aggregateDebetKreditSaldo,
    aggregateForDateLabarugi,
    aggregateForYearLabarugi,
    aggregateForMonthLabarugi
  } = require("../middlewares");
const router = express.Router();  

router.get("/",[aggregateDebetKreditSaldo], getAlldata);
router.get("/search/:tahun",[aggregateForYearLabarugi], findYear);
router.get("/search/:tahun/:bulan",[aggregateForMonthLabarugi], findMonth);
router.get("/search/:tahun/:bulan/:hari",[aggregateForDateLabarugi], findDate);
router.delete("/delete/:_id", deleteLabarugi);

module.exports = router;