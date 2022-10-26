const { Aruskas, Jurnal} = require("../models/schema");
const {
  success201,
  err400,
  success200,
  err404,
} = require("../helpers/messages");



module.exports = {

  getAlldataNeracaSaldo : async (req, res) => {
    try {
      const resp = await Jurnal.aggregate([
        {
          $match: {
            kodePerkiraan: {
              $gte: "100",
              $lte: "799",
            },
          },
        },
        {
          $group: {
            _id: "$namaPerkiraanJurnal",
            Debet: {
              $sum : "$debet",
            },
            Kredit: {
              $sum : "$kredit",
            },
            Saldo : {
              $subtract : ["$debet", "$kredit"]
            },
          },
        },
      ]);
      const totalResp = await Jurnal.aggregate([
        {
          $match: {
            kodePerkiraan: {
              $gte: "100",
              $lte: "799",
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
        data: resp,
      });
    } catch (error) {
      res.status(400).json(err400(error));
    }
  },

};