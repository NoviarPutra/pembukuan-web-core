const express = require("express");
const router = express.Router();
const JurnalUmun = require("../models/JurnalUmun.model");


router.post("/", async (req, res) =>{
    try {
        await new JurnalUmun(req.body).save();
        return res.status(201).json(req.body);
      } catch (error) {
        return res.status(400).json(error);
      }
});

router.get("/", async (req, res) => {
    try {
        let Jurnal = await JurnalUmun.find(req.query, { _id: 0 });
        return res.json(Jurnal);
      } catch (error) {
        res.status(400).json(error);
      }

})