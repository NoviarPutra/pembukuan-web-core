const express = require("express");
const {
  CreateJurnal,
  getAlldata,
  getdatabykode,
  updatejurnal,
  deletejurnal,
} = require("../controllers/JurnalUmun.controller");
const { validatejurnalBeforeCreate } = require("../middlewares");
const router = express.Router();

router.post("/", [validatejurnalBeforeCreate], CreateJurnal);
router.get("/", getAlldata);
router.get("/:kodePerkiraan", getdatabykode);
router.put("/:nomerJurnal", updatejurnal);
router.delete("/:nomerJurnal", deletejurnal);

module.exports = router;
