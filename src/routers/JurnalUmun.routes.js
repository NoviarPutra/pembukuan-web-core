const express = require("express");
const {
  CreateJurnal,
  getAlldata,
  getdatabykode,
  updatejurnal,
  deletejurnal,
  findDate,
  findYear,
  findMonth,
} = require("../controllers/JurnalUmun.controller");

<<<<<<< HEAD
=======
const { createLabarugi } = require("../controllers/labarugi.controller");
>>>>>>> 12fb2bc9474fe117d731d1396c5ec4162edbb9c5
const {
  validatejurnalBeforeCreate,
  validateJurnalBeforeUpdate,
  aggregateDebetKredit,
} = require("../middlewares");
const router = express.Router();

<<<<<<< HEAD
router.post("/", [validatejurnalBeforeCreate],  CreateJurnal );
router.get("/", getAlldata);
router.get("/:nomerBukti", getdatabykode);
=======
router.post("/", [validatejurnalBeforeCreate], CreateJurnal, createLabarugi);
router.get("/", [aggregateDebetKredit], getAlldata);
router.get("/:kodePerkiraan", getdatabykode);
>>>>>>> 12fb2bc9474fe117d731d1396c5ec4162edbb9c5
router.put("/:_id", [validateJurnalBeforeUpdate], updatejurnal);
router.delete("/delete/:_id", deletejurnal);
// router.get("/search/tanggal/:date", findDate);
router.get("/search/:tahun", findYear);
router.get("/search/:tahun/:bulan", findMonth);
router.get("/search/:tahun/:bulan/:hari", findDate);

module.exports = router;
