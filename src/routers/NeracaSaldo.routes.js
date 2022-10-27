const express = require("express");
const {
      getAlldataNeracaSaldo, FindYear, FindMount, FindDate, 
  } = require("../controllers/NeracaSaldo.controller");
const { authorizationToken } = require("../middlewares");


const router = express.Router();

router.get("/", [authorizationToken],  getAlldataNeracaSaldo);
router.get(
  "/search/:tahun",
  [authorizationToken],
  FindYear
);
router.get(
  "/search/:tahun/:bulan",
  [authorizationToken],
  FindMount
);
router.get(
  "/search/:tahun/:bulan/:hari",
  [authorizationToken],
  FindDate
);

module.exports = router