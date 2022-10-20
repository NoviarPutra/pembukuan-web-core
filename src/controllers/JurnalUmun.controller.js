const { Jurnal } = require("../models/schema");

const { generateNumber, incrementNumber } = require("../helpers/generate");
const {
  success201,
  err400,
  success200,
  err404,
} = require("../helpers/messages");
const {
  insertJurnal,
  getAll,
  updatedata,
  deletedata,
  getByParams,
} = require("../models/JurnalUmun.model");
const { getByName } = require("../models/perkiraan.models");

module.exports = {
  CreateJurnal: async (req, res) => {
    try {
      let num;
      // CHECK NAMA PERKIRAAN
      const check = await getByName({
        nama_perkiraan: req.body.namaPerkiraanJurnal.toUpperCase(),
      });
      if (!check)
        return res.status(404).json(err404("Nama Perkiraan tidak valid"));

      // CHECK NOMOR JURNAL
      const checkNomer = await getAll();
      if (checkNomer[0] === undefined) {
        req.body.nomerJurnal = incrementNumber(checkNomer[0]);
        req.body.namaPerkiraanJurnal =
          req.body.namaPerkiraanJurnal.toUpperCase();
        req.body.kodePerkiraan = check.kode_perkiraan;
        req.body.nomerBukti = `NB-${generateNumber(req.body.nomerBukti)}`;
        const resp = await insertJurnal(req.body);
        return res.status(201).json(success201(resp));
      } else {
        checkNomer.reverse();
        num = incrementNumber(checkNomer[0].nomerJurnal);
        req.body.nomerJurnal = num;
        req.body.namaPerkiraanJurnal =
          req.body.namaPerkiraanJurnal.toUpperCase();
        req.body.kodePerkiraan = check.kode_perkiraan;
        req.body.nomerBukti = `NB-${generateNumber(req.body.nomerBukti)}`;
        const resp = await insertJurnal(req.body);
        return res.status(201).json(success201(resp));
      }
    } catch (error) {
      return res.status(400).json(err400(error));
    }
  },
  getAlldata: async (req, res) => {
    try {
      const { totalDebet, totalKredit } = req.body;
      const data = await getAll();
      return res.status(200).json({
        code: 200,
        status: "OK",
        data: data,
        totalDebet: totalDebet,
        totalKredit: totalKredit,
      });
    } catch (error) {
      res.status(400).json(err400(error));
    }
  },
  getdatabykode: async (req, res) => {
    try {
      const id = req.params.kodePerkiraan;
      console.log(id);
      const data = await getByParams({ kodePerkiraan: id });
      if (data) return res.status(200).json(success200(data));
      return res.status(404).json(err404());
    } catch (error) {
      return res.status(400).json(err400(error));
    }
  },
  findDate: async (req, res) => {
    try {
      // const { totalDebet, totalKredit } = req.body;
      const { tahun, bulan, hari } = req.params;
      const resp = await Jurnal.find({
        tanggalJurnal: {
          $gte: `${tahun}-${bulan}-${hari}`,
          $lte: `${tahun}-${bulan}-${hari}`,
        },
      });
      // const resp = await Jurnal.aggregate();
      if (resp[0])
        return res.status(200).json({
          code: 200,
          status: "OK",
          data: resp,
        });
      return res
        .status(400)
        .json(err400("Tahun / Bulan / Tanggal yang dicari kaga ada bang "));
      // totalDebet: totalDebet,
      // totalKredit: totalKredit,
    } catch (error) {
      return res.status(400).json(err400(error));
    }
  },
  findMonth: async (req, res) => {
    try {
      // const { totalDebet, totalKredit } = req.body;
      const { tahun, bulan } = req.params;
      const resp = await Jurnal.find({
        tanggalJurnal: {
          $gte: `${tahun}-${bulan}-01`,
          $lte: `${tahun}-${bulan}-31`,
        },
      });
      // const resp = await Jurnal.aggregate();
      if (resp[0])
        return res.status(200).json({
          code: 200,
          status: "OK",
          data: resp,
        });
      return res
        .status(400)
        .json(err400("Tahun / Bulan yang dicari kaga ada bang "));
      // totalDebet: totalDebet,
      // totalKredit: totalKredit,
    } catch (error) {
      return res.status(400).json(err400(error));
    }
  },
  findYear: async (req, res) => {
    try {
      // const { totalDebet, totalKredit } = req.body;
      const { tahun } = req.params;
      const resp = await Jurnal.find({
        tanggalJurnal: { $gte: `${tahun}-01-01`, $lte: `${tahun}-12-31` },
      });
      // const resp = await Jurnal.aggregate();
      if (resp[0])
        return res.status(200).json({
          code: 200,
          status: "OK",
          data: resp,
        });
      return res.status(400).json(err400("Tahun yang dicari kaga ada bang "));
      // totalDebet: totalDebet,
      // totalKredit: totalKredit,
    } catch (error) {
      return res.status(400).json(err400(error));
    }
  },
  updatejurnal: async (req, res) => {
    try {
      const check = await getByName({
        nama_perkiraan: req.body.namaPerkiraanJurnal.toUpperCase(),
      });
      if (!check)
        return res.status(404).json(err404("Nama Perkiraan tidak valid"));
      req.body.uraian = req.body.uraian.toUpperCase();
      req.body.namaPerkiraanJurnal = req.body.namaPerkiraanJurnal.toUpperCase();
      req.body.kodePerkiraan = check.kode_perkiraan;
      req.body.nomerBukti = generateNumber(req.body.nomerBukti);
      let update = await updatedata({ _id: req.params._id }, req.body);
      if (update) return res.status(200).json(success200(req.body));
      return res.status(404).json(err404("ID tidak ditemukan"));
    } catch (error) {
      return res.status(400).json(err400(error));
    }
  },
  deletejurnal: async (req, res) => {
    try {
      let hapus = await getByParams({ _id: req.params._id });
      if (!hapus) {
        return res.status(404).json(err404("nomer jurnal tidak ditemukan."));
      }
      await deletedata({ _id: req.params._id });
      return res.sendStatus(204);
    } catch (error) {
      return res.status(400).json(err400(error));
    }
  },
};
