import express from "express";
import {
  CreateJurnal
} from "../controllers/JurnalUmun.controller.js";

const router = express.Router();

router.post("/", CreateJurnal);


export default router;