const { generateNumber } = require("../helpers/generate");
const {
  success201,
  err400,
  success200,
  err404,
} = require("../helpers/messages");
const {
  insertJurnal,
  getByKode,
  getAll,
  updatedata,
} = require("../models/JurnalUmun.model");
const { getByName } = require("../models/perkiraan.models");
const { Jurnal } = require("../models/schema");

module.exports = {
  CreateJurnal: async (req, res) => {
    try {
      const check = await getByName({
        nama_perkiraan: req.body.namaPerkiraanJurnal.toUpperCase(),
      });
      if (!check)
        return res.status(404).json(err404("Nama Perkiraan tidak valid"));
      req.body.namaPerkiraanJurnal = req.body.namaPerkiraanJurnal.toUpperCase();
      req.body.kodePerkiraan = check.kode_perkiraan;
      req.body.nomerBukti = `NB-${generateNumber(req.body.nomerBukti)}`;
      const resp = await insertJurnal(req.body);
      return res.status(201).json(success201(resp));
    } catch (error) {
      return res.status(400).json(err400(error));
    }
  },
  getAlldata: async (req, res) => {
    try {
      const data = await getAll();
      return res.status(200).json(success200(data));
    } catch (error) {
      res.status(400).json(err400(error));
    }
  },

  getdatabykode: async (req, res) => {
    try {
      const id = req.params.kodePerkiraan;
      const data = await getByKode({ kodePerkiraan: id });
      if (data) return res.status(200).json(success200(data));
      return res.status(404).json(err404());
    } catch (error) {
      return res.status(400).json(err400(error));
    }
  },

  updatejurnal: async (req, res) => {
    try {
      let update = await updatedata(
        { nomerJurnal: req.params.nomerJurnal },
        req.body
      );
      if (update) return res.status(200).json(success200(update));
      return res.status(404).json(err404());
    } catch (error) {
      return res.status(400).json(err400(error));
    }
  },

  deletejurnal: async (req, res) => {
    try {
      let hapus = await Jurnal.findOne({ nomerJurnal: req.params.nomerJurnal });
      if (!hapus) {
        return res.status(404).json(err404("nomer jurnal tidak ditemukan."));
      }

      await Jurnal.findOneAndRemove({ nomerJurnal: hapus.nomerJurnal });
      return res.status(204);
    } catch (error) {
      return res.status(400).json(err400(error));
    }
  },
};
