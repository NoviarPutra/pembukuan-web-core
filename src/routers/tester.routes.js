const express = require("express");
const { ngetest, testFindYear } = require("../controllers/tester");

const router = express.Router();

router.get("/", ngetest);
router.get("/search/:year", testFindYear);

module.exports = router;
