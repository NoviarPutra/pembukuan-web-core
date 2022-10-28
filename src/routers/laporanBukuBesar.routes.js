const express = require("express");
const {
  getAllLaporan,
  getAllByPerkiraan,
  getAllByYear,
  getAllByMonth,
  getAllByDate,
} = require("../controllers/laporanBukuBesar");
const { authToken, aggregateDebetKredit } = require("../middlewares");
const router = express.Router();

router.get("/", [aggregateDebetKredit], getAllLaporan);
router.get("/perkiraan/:kode", [authToken], getAllByPerkiraan);
router.get("/:tahun", [authToken], getAllByYear);
router.get("/:tahun/:bulan", [authToken], getAllByMonth);
router.get("/:tahun/:bulan/:tanggal", [authToken], getAllByDate);

module.exports = router;
