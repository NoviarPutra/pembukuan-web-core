const {  getAllLabarugi, deletedataLabarugi, getByParamsLabarugi } = require("../models/labarugi.model");
const { Labarugi } = require("../models/schema");
const {
    success201,
    err400,
    success200,
    err404,
  } = require("../helpers/messages");



module.exports = {
    getAlldata: async (req, res) => {
        try {
          const { totalDebet, totalKredit, saldo } = req.body;
          const data = await getAllLabarugi();
          return res.status(200).json({
            code: 200,
            status: "OK",
            data: data,
            totalDebet: totalDebet,
            totalKredit: totalKredit,
            saldo : saldo,
          });
        } catch (error) {
          res.status(400).json(err400(error));
        }
      },

      findDate: async (req, res) => {
        try {
          const { totalDebet, totalKredit, saldo } = req.body;
          const { tahun, bulan, hari } = req.params;
          const resp = await Labarugi.aggregate([
            {
              $match: {
                tanggalLabaRugi: new Date(`${tahun}-${bulan}-${hari}`),
              },
            },
          ]);
          if (resp[0])
            return res.status(200).json({
              code: 200,
              status: "OK",
              totalDebet: totalDebet,
              totalKredit: totalKredit,
              saldo : saldo,
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
          const { totalDebet, totalKredit , saldo} = req.body;
          const { tahun, bulan } = req.params;
          const resp = await Labarugi.aggregate([
            {
              $match: {
                tanggalLabaRugi: {
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
              saldo : saldo,
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
          // const { totalDebet, totalKredit } = req.body;
          const { tahun } = req.params;
          const { totalDebet, totalKredit , saldo} = req.body;
          const resp = await Labarugi.aggregate([
            {
              $match: {
                tanggalLabaRugi: {
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
              saldo : saldo,
              data: resp,
            });
          return res.status(400).json(err400("Tahun yang dicari kaga ada bang "));
          // totalDebet: totalDebet,
          // totalKredit: totalKredit,
        } catch (error) {
          return res.status(400).json(err400(error));
        }
      },

      deleteLabarugi: async (req, res) => {
        try {
          let hapus = await getByParamsLabarugi({ _id: req.params._id });
          console.log(hapus)
          if (!hapus) {
            return res.status(404).json(err404("nomer jurnal tidak ditemukan."));
          }
          await deletedataLabarugi({ _id: req.params._id });
          return res.sendStatus(204);
        } catch (error) {
          return res.status(400).json(err400(error));
        }
      },

    
}