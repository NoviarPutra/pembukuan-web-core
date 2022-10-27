const express = require("express");
const {
     getAlldataNeraca, getAlldataNeracaSaldo,
  } = require("../controllers/NeracaSaldo.controller");


const router = express.Router();

router.get("/",  getAlldataNeracaSaldo);

module.exports = router