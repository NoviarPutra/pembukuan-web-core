const { Jurnal, REFERENSI_TABEL,  } = require("../models/schema");
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

      // const { nomerJurnal, }
      // create jurnal sampe selesai
      // setelah selesai, panggil model laba rugi
      // buat laba rugi sesuai jurnal... save, kelar.
      
      const resp = await insertJurnal(req.body);
      return res
        .status(201)
        .json({ code: 201, message: "CREATED", data: resp });

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
      const data = await getAll();
      return res.status(200).json(success200(data));
    } catch (error) {
      res.status(400).json(err400(error));
    }
  },
  getdatabykode: async (req, res) => {
    try {
      const id = req.params.kodePerkiraan;
      const data = await getByParams({ kodePerkiraan: id });
      if (data) return res.status(200).json(success200(data));
      return res.status(404).json(err404());
    } catch (error) {

      return res.status(400).json({ code: 400, message: error });
    } },

    updatejurnal : async (req, res) => {
      try {
        let update = await updatedata(
          { nomerJurnal: req.params.nomerJurnal },
          req.body
        );

        if(update) return res.status(200).json(update);
        return res.status(400).json(error);
      } catch (error) {
        return res.status(400).json(error);
      }
    },

    deletejurnal : async (req, res) => {
      try {
        let hapus = await Jurnal.findOne({ nomerJurnal: req.params.nomerJurnal });
        if (!hapus) {
          return res.status(404).json({ message: "nomer jurnal tidak ditemukan." });
        }
    
        await Jurnal.findOneAndRemove({ nomerJurnal: hapus.nomerJurnal });
        return res.status(204).json({});
      } catch (error) {
        return res.status(400).json(error);
      }

      return res.status(400).json(err400(error));

    }, 

  findDate: async (req, res) => {
    try {
      const { date } = req.params;
      const rgxSearch = (pattern) => new RegExp(pattern);
      const searchRgx = rgxSearch(date);
      console.log(searchRgx);
      const resp = await getByParams({ tanggalJurnal: searchRgx });
      console.log(resp);
    } catch (error) {
      return res.status(400).json(err400(error));
    }
  },
 
  findMonth: async (req, res) => {},
  findYear: async (req, res) => {},
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
      req.body.nomerBukti = `NB-${generateNumber(req.body.nomerBukti)}`;
      let update = await updatedata({ _id: req.params._id }, req.body);
      if (update) return res.status(200).json(success200(req.body));
      return res.status(404).json(err404("ID tidak ditemukan"));
    } catch (error) {
      return res.status(400).json(err400(error));
    }
  },
  deletejurnal : async (req, res) => {
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
