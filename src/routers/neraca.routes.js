const express = require("express");
const { getAlldataNeraca, FindYear, FindMonth, FindDate } = require("../controllers/Neraca.controller");
const { authorizationToken } = require("../middlewares");

const router = express.Router();

router.get("/", [authorizationToken],  getAlldataNeraca);
router.get(
    "/search/:tahun",
    [authorizationToken],
    FindYear
  );
  router.get(
    "/search/:tahun/:bulan",
    [authorizationToken],
    FindMonth
  );
  router.get(
    "/search/:tahun/:bulan/:hari",
    [authorizationToken],
    FindDate
  );
  

module.exports = router;
