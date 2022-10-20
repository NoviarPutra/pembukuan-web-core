const express = require("express");
const { createLabarugi, getAlldata } = require("../controllers/labarugi.controller")
const router = express.Router();  

router.get("/", getAlldata);

module.exports = router;