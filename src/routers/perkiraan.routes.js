const express = require("express");
const {
  createPerkiraan,
  getAllPerkiraan,
  getPerkiraanByKode,
  updatePerkiraan,
  removePerkiraan,
  seacrhPerkiraan,
} = require("../controllers/perkiraan.controllers");
const { validateBeforeCreatePerkiraan } = require("../middlewares");
const router = express.Router();

router.post("/", [validateBeforeCreatePerkiraan], createPerkiraan);
router.get("/", getAllPerkiraan);
router.get("/search", seacrhPerkiraan);
router.get("/:kode_perkiraan", getPerkiraanByKode);
router.put("/:kode_perkiraan", updatePerkiraan);
router.delete("/delete/:kode_perkiraan", removePerkiraan);

module.exports = router;
