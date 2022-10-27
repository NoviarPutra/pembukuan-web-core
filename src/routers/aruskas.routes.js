const express = require("express");
const {
  getAlldata,
  FindDate,
  FindYear,
  FindMounth,
} = require("../controllers/aruskas.controller");

const { authToken } = require("../middlewares");

const router = express.Router();

router.get("/", [authToken], getAlldata);
router.get("/search/:tahun", [authToken], FindYear);
router.get("/search/:tahun/:bulan", [authToken], FindMounth);
router.get("/search/:tahun/:bulan/:hari", [authToken], FindDate);

module.exports = router;
