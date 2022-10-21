const express = require("express");
const {
  CreateJurnal,
  getAlldata,
  getdatabykode,
  updatejurnal,
  deletejurnal,
  findDate,
  findMonth,
  findYear
} = require("../controllers/JurnalUmun.controller");

const {
  validatejurnalBeforeCreate,
  validateJurnalBeforeUpdate,
  aggregateDebetKredit,
} = require("../middlewares");
const router = express.Router();

router.post("/", [validatejurnalBeforeCreate],  CreateJurnal );
router.get("/",[aggregateDebetKredit], getAlldata);
router.get("/:nomerBukti",  getdatabykode);
router.put("/:_id", [validateJurnalBeforeUpdate], updatejurnal);
router.delete("/delete/:_id", deletejurnal);
router.get("/search/:tahun", findYear);
router.get("/search/:tahun/:bulan", findMonth);
router.get("/search/:tahun/:bulan/:hari", findDate);

module.exports = router;
