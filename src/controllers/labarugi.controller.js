const { getAllLabarugi } = require("../models/labarugi.model");
const { Labarugi, Jurnal } = require("../models/schema");
const {
  success201,
  err400,
  success200,
  err404,
} = require("../helpers/messages");
const { getAll } = require("../models/JurnalUmun.model");

module.exports = {
  // getAlldata: async (req, res) => {
  //   try {
  //     const resp = await Jurnal.aggregate([
  //       {
  //         $match: {
  //           kodePerkiraan: {
  //             $gte: "600",
  //             $lte: "799",
  //           },
  //         },
  //       },
  //       {
  //         $group: {
  //           _id: "$namaPerkiraanJurnal",
  //           kodePerkiraan : {
  //             $push : "$kodePerkiraan",
  //           },
  //           tanggalLabaRugi : {
  //             $push : {tanggalJurnal:"$tanggalJurnal"},
  //           },
  //           Debet: {
  //             $sum: "$debet",
  //           },
  //           Kredit: {
  //             $sum: "$kredit",
  //           },
  //         },
  //       },
  //     ]);
  //     const totalResp = await Jurnal.aggregate([
  //       {
  //         $match: {
  //           kodePerkiraan: {
  //             $gte: "600",
  //             $lte: "799",
  //           },
  //         },
  //       },
  //       {
  //         $group: {
  //           _id: null,
  //           totalDebet: {
  //             $sum: "$debet",
  //           },
  //           totalKredit: {
  //             $sum: "$kredit",
  //           },
  //         },
  //       },
  //     ]);
  //     return res.status(200).json({
  //       code: 200,
  //       status: "OK",
  //       totalDebet: totalResp[0].totalDebet,
  //       totalKredit: totalResp[0].totalKredit,
  //       saldo: totalResp[0].totalDebet - totalResp[0].totalKredit,
  //       data: resp,
  //     });
  //   } catch (error) {
  //     res.status(400).json(err400(error));
  //   }
  // },
  // findDate: async (req, res) => {
  //   try {
  //     const { totalDebet, totalKredit, saldo } = req.body;
  //     const { tahun, bulan, hari } = req.params;
  //     const resp = await Labarugi.aggregate([
  //       {
  //         $match: {
  //           tanggalLabaRugi: new Date(`${tahun}-${bulan}-${hari}`),
  //         },
  //       },
  //     ]);
  //     if (resp[0])
  //       return res.status(200).json({
  //         code: 200,
  //         status: "OK",
  //         totalDebet: totalDebet,
  //         totalKredit: totalKredit,
  //         saldo: saldo,
  //         data: resp,
  //       });
  //     return res
  //       .status(400)
  //       .json(err400("Tahun / Bulan / Tanggal yang dicari kaga ada bang "));
  //   } catch (error) {
  //     return res.status(400).json(err400(error));
  //   }
  // },

  getAlldata : async(req, res) => {
    try {
      const { totalDebet, totalKredit, saldo } = req.body;
      const data = await getAll()
      // console.log(data);
      const filterData = data.filter((dataJurnal) => dataJurnal.kodePerkiraan < 799 && dataJurnal.kodePerkiraan > 600).map((data) => ({
        "tanggalLabaRugi" : data.tanggalJurnal,
        "kodePerkiraan" : data.kodePerkiraan,
        "NamaPerkiraan" : data.namaPerkiraanJurnal,
        "Debet" : data.debet,
        "Kredit" : data.kredit,
      }))
      // console.log(filterData)

      return res.status(200).json({
        code: 200,
        status: "OK",
        totalDebet: totalDebet,
        totalKredit: totalKredit,
        saldo : saldo,
        data: filterData,
      });
    } catch {
      res.status(400).json(err400(error));
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
