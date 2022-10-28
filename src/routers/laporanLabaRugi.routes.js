const express = require("express");
const {
  getAllLabaRugi,
  getAllByYear,
  getAllByMonth,
  getAllByDate,
} = require("../controllers/laporanLabaRugi.controllers");
const { authToken } = require("../middlewares");
const router = express.Router();

router.get("/",  getAllLabaRugi);
router.get("/:tahun", [authToken], getAllByYear);
router.get("/:tahun/:bulan", [authToken], getAllByMonth);
router.get("/:tahun/:bulan/:tanggal", [authToken], getAllByDate);

module.exports = router;
