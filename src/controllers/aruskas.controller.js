const { getAllaruskas } = require("../models/aruskas.model");
const { Aruskas, Jurnal} = require("../models/schema");
const {
  success201,
  err400,
  success200,
  err404,
} = require("../helpers/messages");
const { getAll } = require("../models/JurnalUmun.model");


module.exports = {

  getAlldata: async (req, res) => {
    try {
      const resp = await Jurnal.aggregate([
        {
          $match: {
            kodePerkiraan: {
              $gte: "101",
              $lte: "101",
            },
          },
        },
      ]);
      const totalResp = await Jurnal.aggregate([
        {
          $match: {
            kodePerkiraan: {
              $gte: "101",
              $lte: "101",
            },
          },
        },
        {
          $group: {
            _id: null,
            totalDebet: {
              $sum: "$debet",
            },
            totalKredit: {
              $sum: "$kredit",
            },
          },
        },
      ]);
      
      return res.status(200).json({
        code: 200,
        status: "OK",
        totalDebet: totalResp[0].totalDebet,
        totalKredit: totalResp[0].totalKredit,
        saldo: totalResp[0].totalDebet - totalResp[0].totalKredit,
        data: resp
      });
    } catch (error) {
      res.status(400).json(err400(error));
    }
  },
 


  findDate: async (req, res) => {
   
    try {
      const { tahun, bulan, hari } = req.params;
      const resp = await Jurnal.aggregate([
        {
          $match: {
            kodePerkiraan: {
              $gte: "101",
              $lte: "101",
            },
          },
        },
      ]);

      // const date = await resp.aggregate([
      //   {
      //     $match: {
      //       tanggalJurnal: new Date(`${tahun}-${bulan}-${hari}`),
      //     },
      //   },
        
      // ])

      const totalResp = await Jurnal.aggregate([
        {
          $match: {
            kodePerkiraan: {
              $gte: "101",
              $lte: "101",
            },
          },
        },
        {
          $group: {
            _id: null,
            totalDebet: {
              $sum: "$debet",
            },
            totalKredit: {
              $sum: "$kredit",
            },
          },
        },
      ]);
      console.log(tahun)
      return res.status(200).json({
        code: 200,
        status: "OK",
        totalDebet: totalResp[0].totalDebet,
        totalKredit: totalResp[0].totalKredit,
        saldo: totalResp[0].totalDebet - totalResp[0].totalKredit,
        data: resp
      });
    } catch (error) {
      res.status(400).json(err400(error));
    }},

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
