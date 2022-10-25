const express = require("express");
const { getAlldata } = require("../controllers/aruskas.controller");
const {
  aggregateDebetKreditSaldoAruskas,
  authorizationToken,
} = require("../middlewares");

const router = express.Router();

router.get("/", [authorizationToken], getAlldata);

module.exports = router;
