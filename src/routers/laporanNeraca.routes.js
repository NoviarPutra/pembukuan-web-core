const express = require("express");
const {  getAllByYear, getAllByMonth, getAllByDate, getAllNeraca } = require("../controllers/laporanNeraca.controller");

const { authToken } = require("../middlewares");
const router = express.Router();

router.get("/",  getAllNeraca);
router.get("/:tahun",  getAllByYear);
router.get("/:tahun/:bulan",  getAllByMonth);
router.get("/:tahun/:bulan/:tanggal",  getAllByDate);

module.exports = router;