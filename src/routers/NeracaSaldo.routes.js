const express = require("express");
const {
  getAlldataNeracaSaldo,
  FindYear,
  FindMount,
  FindDate,
} = require("../controllers/NeracaSaldo.controller");
const { authToken } = require("../middlewares");

const router = express.Router();

router.get("/", [authToken], getAlldataNeracaSaldo);
router.get("/search/:tahun", [authToken], FindYear);
router.get("/search/:tahun/:bulan", [authToken], FindMount);
router.get("/search/:tahun/:bulan/:hari", [authToken], FindDate);

module.exports = router;
