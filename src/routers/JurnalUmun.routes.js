const express = require("express");
const { CreateJurnal, getAlldata , getdatabykode } = require("../controllers/JurnalUmun.controller");
const router = express.Router();
const { validatejurnalBeforeCreate } = require("../middlewares/validateJurnal");

router.post("/", [validatejurnalBeforeCreate], CreateJurnal);
router.get("/", getAlldata);
router.get("/:kodePerkiraan", getdatabykode);

module.exports = router;
