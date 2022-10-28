const express = require("express");
const {  getAllByYear, getAllByMonth, getAllByDate, getAllNeracaSaldo } = require("../controllers/laporanNeracaSaldo.controller");

const { authToken } = require("../middlewares");
const router = express.Router();

router.get("/",  getAllNeracaSaldo);
router.get("/:tahun",  getAllByYear);
router.get("/:tahun/:bulan",  getAllByMonth);
router.get("/:tahun/:bulan/:tanggal",  getAllByDate);

module.exports = router;