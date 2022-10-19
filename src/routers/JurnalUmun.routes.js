const express = require("express");
const {
  CreateJurnal,
  getAlldata,
  getdatabykode,
  updatejurnal,
  deletejurnal,
  findDate,
} = require("../controllers/JurnalUmun.controller");
const {
  validatejurnalBeforeCreate,
  validateJurnalBeforeUpdate,
} = require("../middlewares");
const router = express.Router();
// const { validatejurnalBeforeCreate , validatejurnalBeforeUpdate} = require("../middlewares/validateJurnal");



router.post("/", [validatejurnalBeforeCreate], CreateJurnal);
router.get("/", getAlldata);
router.get("/:kodePerkiraan", getdatabykode);
// router.put("/:nomerJurnal", [validatejurnalBeforeUpdate], updatejurnal);
router.delete("/:nomerJurnal", deletejurnal);
router.put("/:_id", [validateJurnalBeforeUpdate], updatejurnal);
router.delete("/delete/:_id", deletejurnal);
router.get("/search/tanggal/:date", findDate);
router.get("/search/bulan/:bulan");
router.get("/search/tahun/:tahun");


module.exports = router;
