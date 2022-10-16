const express = require("express");
const {
  createPerkiraan,
  getAllPerkiraan,
  getPerkiraanByKode,
} = require("../controllers/perkiraan.controllers");
const router = express.Router();

router.post("/", createPerkiraan);
router.get("/", getAllPerkiraan);
router.get("/:kode_perkiraan", getPerkiraanByKode);

module.exports = router;
