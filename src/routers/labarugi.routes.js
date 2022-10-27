const express = require("express");
const {
  FindMonth,
  FindDate,
  FindYear,
  getAlldata,
} = require("../controllers/labarugi.controller");

const { authToken } = require("../middlewares");
const router = express.Router();

router.get("/", [authToken], getAlldata);
router.get("/search/:tahun", [authToken], FindYear);
router.get("/search/:tahun/:bulan", [authToken], FindMonth);
router.get("/search/:tahun/:bulan/:hari", [authToken], FindDate);

module.exports = router;
