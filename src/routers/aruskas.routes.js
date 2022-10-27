const express = require("express");
const { getAlldata, FindDate, FindYear, FindMounth } = require("../controllers/aruskas.controller");

const {
  aggregateDebetKreditSaldoAruskas,
  authorizationToken,
} = require("../middlewares");

const router = express.Router();

router.get("/", [authorizationToken], getAlldata);
router.get(
  "/search/:tahun",
  [authorizationToken],
  FindYear
);
router.get(
  "/search/:tahun/:bulan",
  [authorizationToken],
  FindMounth
);
router.get(
  "/search/:tahun/:bulan/:hari",
  [authorizationToken],
  FindDate
);


module.exports = router;
