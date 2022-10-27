const express = require("express");
const {
     getAlldataNeraca, getAlldataNeracaSaldo,
  } = require("../controllers/NeracaSaldo.controller");
const { authorizationToken } = require("../middlewares");


const router = express.Router();

router.get("/",  [authorizationToken] ,getAlldataNeracaSaldo);

module.exports = router