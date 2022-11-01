const express = require("express");
const { getAllarusKas, getAllByYear, getAllByMonth, getAllByDate } = require("../controllers/laporanAruskas.controller");
const { authToken } = require("../middlewares");
const router = express.Router();

router.get("/", [authToken], getAllarusKas);
router.get("/:tahun", [authToken], getAllByYear);
router.get("/:tahun/:bulan", [authToken], getAllByMonth);
router.get("/:tahun/:bulan/:tanggal", [authToken], getAllByDate);

module.exports = router;