import express from "express";
import {
  createPerkiraan,
  getAllPerkiraan,
  getPerkiraanByKode,
} from "../controllers/perkiraan.controllers.js";
const router = express.Router();

router.post("/", createPerkiraan);
router.get("/", getAllPerkiraan);
router.get("/:kode_perkiraan", getPerkiraanByKode);

export default router;
