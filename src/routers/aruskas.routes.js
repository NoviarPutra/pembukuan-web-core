const express = require("express");
const { getAlldata, findDate } = require("../controllers/aruskas.controller");

const {
  aggregateDebetKreditSaldoAruskas,
  authorizationToken,
} = require("../middlewares");

const router = express.Router();

router.get("/", [authorizationToken], getAlldata);
router.get(
    "/search/:tahun/:bulan/:bulan",
    findDate
  );


module.exports = router;
