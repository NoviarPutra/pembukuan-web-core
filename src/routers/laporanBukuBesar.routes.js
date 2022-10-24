const express = require("express");
const {
  getAllLaporan,
  getAllByPerkiraan,
} = require("../controllers/laporanBukuBesar");
const router = express.Router();

router.get("/", getAllLaporan);
router.get("/:perkiraan", getAllByPerkiraan);

module.exports = router;
