const express = require("express");
const { CreateJurnal } = require("../controllers/JurnalUmun.controller");
const router = express.Router();

router.post("/", CreateJurnal);

module.exports = router;
