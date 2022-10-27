const express = require("express");
const {
  getAllLaporan,
  getAllByPerkiraan,
} = require("../controllers/laporanBukuBesar");
const { authToken } = require("../middlewares");
const router = express.Router();

router.get("/", [authToken], getAllLaporan);
router.get("/:perkiraan", [authToken], getAllByPerkiraan);

module.exports = router;
