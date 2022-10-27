const express = require("express");
const {
  createPerkiraan,
  getAllPerkiraan,
  getPerkiraanByKode,
  updatePerkiraan,
  removePerkiraan,
  seacrhPerkiraan,
} = require("../controllers/perkiraan.controllers");
const {
  validateCreatePerkiraan,
  authToken,
  isAdmin,
} = require("../middlewares");
const router = express.Router();

router.post(
  "/",
  [authToken, isAdmin, validateCreatePerkiraan],
  createPerkiraan
);
router.get("/", [authToken], getAllPerkiraan);
router.get("/search", [authToken], seacrhPerkiraan);
router.get("/:kode_perkiraan", [authToken], getPerkiraanByKode);
router.put(
  "/:kode_perkiraan",
  [authToken, isAdmin, validateCreatePerkiraan],
  updatePerkiraan
);
router.delete("/delete/:kode_perkiraan", [authToken, isAdmin], removePerkiraan);

module.exports = router;
