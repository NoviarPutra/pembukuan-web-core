const express = require("express");
const {
    getAlldata,
  } = require("../controllers/aruskas.controller");
const { aggregateDebetKreditSaldoAruskas } = require("../middlewares");


const router = express.Router();

router.get("/" ,getAlldata);

module.exports = router;