const express = require("express");
const {
  ngetest,
  testFindYear,
  testLabaRugi,
} = require("../controllers/tester");

const router = express.Router();

router.get("/", ngetest);
router.get("/search/:tahun", testLabaRugi);

module.exports = router;
