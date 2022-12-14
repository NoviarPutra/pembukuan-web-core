const {
  err400,
  err404,
  success200,
  success201,
} = require("../helpers/messages");
const {
  insertPerkiraan,
  getAll,
  getByKode,
  update,
  remove,
  search,
} = require("../models/perkiraan.models");

module.exports = {
  createPerkiraan: async (req, res) => {
    try {
      const resp = await insertPerkiraan(req.body);
      if (resp) return res.status(201).json(success201());
      return res.status(400).json(err400("Something went wrong"));
    } catch (error) {
      return res.status(400).json(err400(error));
    }
  },
  getAllPerkiraan: async (req, res) => {
    try {
      const resp = await getAll();
      if (resp) return res.status(200).json(success200(resp));
    } catch (error) {
      return res.status(400).json(err400(error));
    }
  },
  getPerkiraanByKode: async (req, res) => {
    try {
      const { kode_perkiraan } = req.params;
      const resp = await getByKode({ kode_perkiraan: kode_perkiraan });
      if (resp) return res.status(200).json(success200(resp));
      return res.status(404).json(err404());
    } catch (error) {
      return res.status(400).json(err400(error));
    }
  },
  seacrhPerkiraan: async (req, res) => {
    try {
      const { nama_perkiraan, limit } = req.query;
      const rgxSearch = (pattern) => new RegExp(pattern);
      const searchRgx = rgxSearch(nama_perkiraan.toUpperCase());
      const resp = await search({ nama_perkiraan: searchRgx }, limit);
      if (resp) return res.status(200).json(success200(resp));
    } catch (error) {
      return res.status(400).json(err400(error));
    }
  },
  updatePerkiraan: async (req, res) => {
    try {
      const { kode_perkiraan, nama_perkiraan, kelompok_akun } = req.body;
      const kode = req.params.kode_perkiraan;
      const resp = await update(
        { kode_perkiraan: kode },
        {
          kode_perkiraan: kode_perkiraan,
          nama_perkiraan: nama_perkiraan.toUpperCase(),
          kelompok_akun: kelompok_akun.toUpperCase(),
        }
      );
      const newData = await getByKode({ kode_perkiraan: kode_perkiraan });
      if (resp)
        return res
          .status(200)
          .json({ code: 200, status: "OK", oldData: resp, newData: newData });
      return res.status(404).json(err404());
    } catch (error) {
      return res.status(400).json(err400(error));
    }
  },
  removePerkiraan: async (req, res) => {
    try {
      const kode = req.params.kode_perkiraan;
      const resp = await remove({ kode_perkiraan: kode });
      if (resp) return res.status(200).json(success200());
      return res.status(404).json(err404());
    } catch (error) {
      return res.status(400).json(err400(error));
    }
  },
};
