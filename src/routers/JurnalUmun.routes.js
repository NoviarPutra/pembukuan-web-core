const express = require("express");
const {
  CreateJurnal,
  getAlldata,
  getdatabykode,
  updatejurnal,
  deletejurnal,
  findDate,
  findMonth,
  findYear,
} = require("../controllers/JurnalUmun.controller");
const { ngetest } = require("../controllers/tester");

const {
  // validatejurnalBeforeCreate,
  validateJurnalBeforeUpdate,
  aggregateDebetKredit,
  aggregateForYear,
  aggregateForMonth,
  aggregateForDate,
  validateBeforeCreateJurnal,
  authorizationToken,
  isAdmin,
} = require("../middlewares");
const router = express.Router();

router.get("/ngetest", ngetest);

router.post(
  "/",
  [authorizationToken],
  [isAdmin],
  [validateBeforeCreateJurnal],
  CreateJurnal
);
router.get("/", [authorizationToken], [aggregateDebetKredit], getAlldata);
router.get("/:nomerBukti", [authorizationToken], getdatabykode);
router.put(
  "/:_id",
  [authorizationToken],
  [isAdmin],
  [validateJurnalBeforeUpdate],
  updatejurnal
);
router.delete("/delete/:_id", [authorizationToken], [isAdmin], deletejurnal);
router.get(
  "/search/:tahun",
  [authorizationToken],
  [aggregateForYear],
  findYear
);
router.get(
  "/search/:tahun/:bulan",
  [authorizationToken],
  [aggregateForMonth],
  findMonth
);
router.get(
  "/search/:tahun/:bulan/:hari",
  [authorizationToken],
  [aggregateForDate],
  findDate
);

module.exports = router;
