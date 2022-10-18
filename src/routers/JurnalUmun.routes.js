const express = require("express");
const {
  CreateJurnal,
  getAlldata,
  getdatabykode,
  updatejurnal,
  deletejurnal,
} = require("../controllers/JurnalUmun.controller");
const {
  validatejurnalBeforeCreate,
  validateJurnalBeforeUpdate,
} = require("../middlewares");
const router = express.Router();

router.post("/", [validatejurnalBeforeCreate], CreateJurnal);
router.get("/", getAlldata);
router.get("/:kodePerkiraan", getdatabykode);
router.put("/:_id", [validateJurnalBeforeUpdate], updatejurnal);
router.delete("/delete/:_id", deletejurnal);

module.exports = router;
