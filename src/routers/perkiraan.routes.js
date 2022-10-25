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
  validateBeforeCreatePerkiraan,
  authorizationToken,
  isAdmin,
} = require("../middlewares");
const router = express.Router();

router.post(
  "/",
  [authorizationToken],
  [isAdmin],
  [validateBeforeCreatePerkiraan],
  createPerkiraan
);
router.get("/", [authorizationToken], getAllPerkiraan);
router.get("/search", [authorizationToken], seacrhPerkiraan);
router.get("/:kode_perkiraan", [authorizationToken], getPerkiraanByKode);
router.put(
  "/:kode_perkiraan",
  [authorizationToken],
  [isAdmin],
  [validateBeforeCreatePerkiraan],
  updatePerkiraan
);
router.delete(
  "/delete/:kode_perkiraan",
  [authorizationToken],
  [isAdmin],
  removePerkiraan
);

module.exports = router;
