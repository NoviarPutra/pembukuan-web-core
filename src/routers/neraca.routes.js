const express = require("express");
const {
  getAlldataNeraca,
  FindYear,
  FindMonth,
  FindDate,
} = require("../controllers/Neraca.controller");
const { authToken } = require("../middlewares");

const router = express.Router();

router.get("/", [authToken], getAlldataNeraca);
router.get("/search/:tahun", [authToken], FindYear);
router.get("/search/:tahun/:bulan", [authToken], FindMonth);
router.get("/search/:tahun/:bulan/:hari", [authToken], FindDate);

module.exports = router;
