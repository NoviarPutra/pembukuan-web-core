const { Jurnal } = require("../models/schema");
const {
  insertlabarugi,
  getByParamsLabarugi,
  updatedatalabarugi,
} = require("../models/labarugi.model");

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
const { insertlaruskas } = require("../models/aruskas.model");

module.exports = {
  CreateJurnal: async (req, res) => {
    try {

      const { tanggalJurnal, kodePerkiraan, debet, kredit } = req.body;

      // KITE CHECK KODE PERKIRAANNYA TERMASUK GOLONGAN2 YANG TERPILIH ATAU BIKAN wkwkwk
      if (parseInt(kodePerkiraan) > 600) {
        // KALO MASUK, YUK DI CEK UDEH TERDAFTAR ATAU BELOMAN KODE PERKIRAANYA DI DAFTAR LABA RUGINYA
        const ngecek = await getByParamsLabarugi({
          kodePerkiraan: kodePerkiraan,
        });
        if (ngecek) {
          // KALO TERNAYATA KODENYA UDAH TERDAFTAR KITA UPDATE AJA NILAI DEBET/KREDITNYA
          await updatedatalabarugi(
            {
              // INI YG MAU DICARI
              kodePerkiraan: kodePerkiraan,
            },
            {
              // INI NILAI YG MAU DI UPDATE DARI KODE DIATAS
              tanggalLabaRugi: tanggalJurnal,
              lbDebet: ngecek.lbDebet + debet,
              lbKredit: ngecek.lbKredit + kredit,
            }
          );
        } else {
          // KALO BELOMAN TERDAFTAR YG DIATAS LANGSUNG LONCAT KEMARI NIH
          await insertlabarugi({
            tanggalLabaRugi: tanggalJurnal,
            kodePerkiraan: kodePerkiraan,
            lbDebet: debet,
            lbKredit: kredit,
          });
        }
      }

      if(parseInt(kodePerkiraan) == 101) {
        await insertlaruskas(req.body, {
          saldo : debet - kredit
        })
      }
      // NAH YG INI MAH AUTO INSERT MAU YG DIATAS KEDETEK IF MAU KAGA JUGA YG DIMARI MAH JALAN TERUSSSS WKWKWKWKWK
      const resp = await insertJurnal(req.body);
      return res.status(201).json(success201(resp));
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
        totalDebet: totalDebet,
        totalKredit: totalKredit,
        data: data,
      });
    } catch (error) {
      res.status(400).json(err400(error));
    }
  },
  getdatabykode: async (req, res) => {
    try {
      const id = req.params.nomerBukti;
      console.log(id);
      const data = await getByParams({ nomerBukti: id });
      if (data) return res.status(200).json(success200(data));
      return res.status(404).json(err404());
    } catch (error) {
      return res.status(400).json(err400(error));
    }
  },
  findDate: async (req, res) => {
    try {
      const { totalDebet, totalKredit } = req.body;
      const { tahun, bulan, hari } = req.params;
      const resp = await Jurnal.aggregate([
        {
          $match: {
            tanggalJurnal: new Date(`${tahun}-${bulan}-${hari}`),
          },
        },
      ]);
      if (resp[0])
        return res.status(200).json({
          code: 200,
          status: "OK",
          totalDebet: totalDebet,
          totalKredit: totalKredit,
          data: resp,
        });
      return res
        .status(400)
        .json(err400("Tahun / Bulan / Tanggal yang dicari kaga ada bang "));
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  findMonth: async (req, res) => {
    try {
      const { totalDebet, totalKredit } = req.body;
      const { tahun, bulan } = req.params;
      const resp = await Jurnal.aggregate([
        {
          $match: {
            tanggalJurnal: {
              $gte: new Date(`${tahun}-${bulan}-01`),
              $lte: new Date(`${tahun}-${bulan}-31`),
            },
          },
        },
      ]);
      if (resp[0])
        return res.status(200).json({
          code: 200,
          status: "OK",
          totalDebet: totalDebet,
          totalKredit: totalKredit,
          data: resp,
        });
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  findYear: async (req, res) => {
    try {
      const { tahun } = req.params;
      const { totalDebet, totalKredit } = req.body;
      const resp = await Jurnal.aggregate([
        {
          $match: {
            tanggalJurnal: {
              $gte: new Date(`${tahun}-01-01`),
              $lte: new Date(`${tahun}-12-31`),
            },
          },
        },
      ]);
      if (resp[0])
        return res.status(200).json({
          code: 200,
          status: "OK",
          totalDebet: totalDebet,
          totalKredit: totalKredit,
          data: resp,
        });
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  updatejurnal: async (req, res) => {
    try {
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
