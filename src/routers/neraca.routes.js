const express = require("express");
const { getAlldataNeraca } = require("../controllers/Neraca.controller");
const { authorizationToken } = require("../middlewares");

const router = express.Router();

router.get("/", [authorizationToken], getAlldataNeraca);

module.exports = router;
