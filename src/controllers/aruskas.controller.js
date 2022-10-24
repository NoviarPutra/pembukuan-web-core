const { getAllaruskas } = require("../models/aruskas.model");
const { Aruskas } = require("../models/schema");
const {
  success201,
  err400,
  success200,
  err404,
} = require("../helpers/messages");
const { getAll } = require("../models/JurnalUmun.model");


module.exports = {

    getAlldata: async (req, res) => {
    //     try {
    //       const id = 101;
    //       const resp = await getByKode({ kodePerkiraan: id });
    //       if (resp) return res.status(200).json(success200(resp));
    //       return res.status(404).json(err404());
    //     } catch (error) {
    //       return res.status(400).json(err400(error));
    //     }
    //   },
    try {
      const { totalDebet, totalKredit, saldo } = req.body;
      const data = await getAllaruskas();
      return res.status(200).json({
        code: 200,
        status: "OK",
        totalDebet: totalDebet,
        totalKredit: totalKredit,
        saldo: saldo,
        data: data,
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
          saldo: saldo,
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
      const { totalDebet, totalKredit, saldo } = req.body;
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
          saldo: saldo,
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
      const { totalDebet, totalKredit, saldo } = req.body;
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
          saldo: saldo,
          data: resp,
        });
      return res.status(400).json(err400("Tahun yang dicari kaga ada bang "));
      // totalDebet: totalDebet,
      // totalKredit: totalKredit,
    } catch (error) {
      return res.status(400).json(err400(error));
    }
  },
};
