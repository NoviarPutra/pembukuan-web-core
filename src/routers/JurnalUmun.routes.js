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
  aggregateForYear,
  aggregateForMonth,
  aggregateForDate,
} = require("../middlewares");
const router = express.Router();

router.post("/", [validatejurnalBeforeCreate],  CreateJurnal );
router.get("/",[aggregateDebetKredit], getAlldata);
router.get("/:nomerBukti",  getdatabykode);
router.put("/:_id", [validateJurnalBeforeUpdate], updatejurnal);
router.delete("/delete/:_id", deletejurnal);
<<<<<<< HEAD
router.get("/search/:tahun", findYear);
router.get("/search/:tahun/:bulan", findMonth);
router.get("/search/:tahun/:bulan/:hari", findDate);
=======
router.get("/search/:tahun", [aggregateForYear], findYear);
router.get("/search/:tahun/:bulan", [aggregateForMonth], findMonth);
router.get("/search/:tahun/:bulan/:hari", [aggregateForDate], findDate);
>>>>>>> 8034b382fd22c41787f0eed48428d965e9a9b367

module.exports = router;
