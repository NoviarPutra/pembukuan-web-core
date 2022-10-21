const express = require("express");
const { createLabarugi, getAlldata, findDate, findMonth, findYear } = require("../controllers/labarugi.controller")

const {
    aggregateDebetKreditSaldo
  } = require("../middlewares");
const router = express.Router();  

router.get("/",[aggregateDebetKreditSaldo], getAlldata);
router.get("/search/:tahun", findYear);
router.get("/search/:tahun/:bulan", findMonth);
router.get("/search/:tahun/:bulan/:hari", findDate);

module.exports = router;