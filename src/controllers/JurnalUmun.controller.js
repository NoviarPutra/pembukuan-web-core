const { Jurnal, Labarugi } = require("../models/schema");
const {
  insertlabarugi,
  getByParamsLabarugi,
  updatedatalabarugi,
} = require("../models/labarugi.model");

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
const { getByName, getByKode } = require("../models/perkiraan.models");

module.exports = {
  CreateJurnal: async (req, res) => {
    try {
      // // CHECK NOMOR JURNAL
      //       const checkNomer = await getAll();
      //       if (checkNomer[0] === undefined) {
      //         req.body.nomerJurnal = incrementNumber(checkNomer[0]);
      //         req.body.namaPerkiraanJurnal =
      //           req.body.namaPerkiraanJurnal.toUpperCase();
      //         req.body.kodePerkiraan = check.kode_perkiraan;
      //         req.body.nomerBukti = `NB-${generateNumber(req.body.nomerBukti)}`;
      //         if (listLabarugi.find((val) => val == req.body.kodePerkiraan)) {
      //           const data = await getByParamsLabarugi({
      //             kodePerkiraan: req.body.kodePerkiraan,
      //           });
      //           if (data == req.body.perkiraan) {
      //             const upt = await updatedatalabarugi({
      //               tanggalLabaRugi: req.body.tanggalJurnal,
      //               lbDebet: req.body.debet + data.lbDebet,
      //               lbKredit: req.body.kredit + data.lbKredit,
      //             });
      //           } else {
      //             try {
      //               const resp = await insertlabarugi({
      //                 tanggalLabaRugi: req.body.tanggalJurnal,
      //                 kodePerkiraan: req.body.kodePerkiraan,
      //                 lbDebet: req.body.debet,
      //                 lbKredit: req.body.kredit,
      //               });
      //               return res.status(201).json(success201(resp));
      //             } catch (error) {
      //               return res.status(400).json(err400(error));
      //             }
      //           }
      //         }
      //         const resp = await insertJurnal(req.body);
      //         return res.status(201).json(success201(resp));
      //       } else {
      //         checkNomer.reverse();
      //         num = incrementNumber(checkNomer[0].nomerJurnal);
      //         req.body.nomerJurnal = num;
      //         req.body.namaPerkiraanJurnal =
      //           req.body.namaPerkiraanJurnal.toUpperCase();
      //         req.body.kodePerkiraan = check.kode_perkiraan;
      //         req.body.nomerBukti = `NB-${generateNumber(req.body.nomerBukti)}`;
      //         const resp = await insertJurnal(req.body);
      //         if (listLabarugi.find((val) => val == req.body.kodePerkiraan)) {
      //           const data = await getByParamsLabarugi({
      //             kodePerkiraan: req.body.kodePerkiraan,
      //           });
      //           console.log(data);
      //           if (data == req.body.kodePerkiraan) {
      //             const debet = req.body.debet + data.lbDebet;
      //             const kredit = req.body.kredit + data.lbKredit;
      //             const upt = await updatedatalabarugi(
      //               { kodePerkiraan: req.body.kodePerkiraan },
      //               {
      //                 tanggalLabaRugi: req.body.tanggalJurnal,
      //                 lbDebet: debet,
      //                 lbKredit: kredit,
      //               }
      //             );
      //             return res.status(201).json(success201(upt));
      //           } else {
      //             try {
      //               const resp = await insertlabarugi({
      //                 tanggalLabaRugi: req.body.tanggalJurnal,
      //                 kodePerkiraan: req.body.kodePerkiraan,
      //                 lbDebet: req.body.debet,
      //                 lbKredit: req.body.kredit,
      //               });
      //             } catch (error) {
      //               return res.status(400).json(err400(error));
      //             }
      //           }
      //         }
      //         return res.status(201).json(success201(resp));
      //       }
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
      return res.status(400).json(err400(error));
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
      return res
        .status(400)
        .json(err400("Tahun / Bulan yang dicari kaga ada bang "));
    } catch (error) {
      return res.status(400).json(err400(error));
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
      return res.status(400).json(err400("Tahun yang dicari kaga ada bang "));
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
