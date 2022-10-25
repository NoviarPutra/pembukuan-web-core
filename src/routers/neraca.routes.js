const express = require("express");
const {
     getAlldataNeraca,
  } = require("../controllers/Neraca.controller");


const router = express.Router();

router.get("/",  getAlldataNeraca);

module.exports = router;