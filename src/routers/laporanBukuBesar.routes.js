const express = require("express");
const {
  getAllLaporan,
  getAllByPerkiraan,
} = require("../controllers/laporanBukuBesar");
const { authorizationToken } = require("../middlewares");
const router = express.Router();

router.get("/", [authorizationToken], getAllLaporan);
router.get("/:perkiraan", [authorizationToken], getAllByPerkiraan);

module.exports = router;
