const express = require("express");
const {
  CreateJurnal,
  getAlldata,
  getdatabykode,
  updatejurnal,
  deletejurnal,
  findDate,
  findMonth,
  findYear,
} = require("../controllers/JurnalUmun.controller");

const {
  validateUpdateJurnal,
  aggregateDebetKredit,
  validateCreateJurnal,
  authToken,
  isAdmin,
} = require("../middlewares");
const router = express.Router();

router.post("/", [authToken, isAdmin, validateCreateJurnal], CreateJurnal);
router.get("/", [authToken, aggregateDebetKredit], getAlldata);
router.get("/:nomerBukti", [authToken], getdatabykode);
router.put("/:_id", [authToken, isAdmin, validateUpdateJurnal], updatejurnal);
router.delete("/delete/:_id", [authToken, isAdmin], deletejurnal);
router.get("/search/:tahun", [authToken], findYear);
router.get("/search/:tahun/:bulan", [authToken], findMonth);
router.get("/search/:tahun/:bulan/:hari", [authToken], findDate);

module.exports = router;
