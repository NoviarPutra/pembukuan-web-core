const express = require("express");
const { getAlldata } = require("../controllers/aruskas.controller");
const { findDate } = require("../controllers/aruskas.controller");
const { aggregateDebetKreditSaldoAruskas } = require("../middlewares");


const router = express.Router();

router.get("/" , getAlldata);
router.get("/tahun/bulan/:hari", findDate )

module.exports = router;