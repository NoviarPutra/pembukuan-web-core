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


  FindDate: async (req, res) => {
    try {
      const { tahun, bulan, hari} = req.params;
      const resp = await Jurnal.aggregate([
        {
          $match: {
            $and: [
              {
                tanggalJurnal: {
                  $gte: new Date(`${tahun}-${bulan}-${hari}`),
                  $lte: new Date(`${tahun}-${bulan}-${hari}`),
                },
              },
              { kodePerkiraan: { $gte: "101", $lte: "101" } },
            ],
          },
        },
      ]).sort({ _id: "asc" });
      if (!resp[0]) return res.status(404).json(err404());

      const total = await Jurnal.aggregate([
        {
          $match: {
            $and: [
              {
                tanggalJurnal: {
                  $gte: new Date(`${tahun}-${bulan}-${hari}`),
                  $lte: new Date(`${tahun}-${bulan}-${hari}`),
                },
              },
              { kodePerkiraan: { $gte: "101", $lte: "101" } },
            ],
          },
        },
        {
          $group: {
            _id: null,
            debet: { $sum: "$debet" },
            kredit: { $sum: "$kredit" },
          },
        },
      ]);
      return res.status(200).json({
        code: 200,
        status: "OK",
        totalDebet: total[0].debet,
        totalKredit: total[0].kredit,
        totalSaldo: total[0].debet - total[0].kredit,
        data: resp,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json(err400(error));
    }
  },
 

  FindMounth: async (req, res) => {
    try {
      const { tahun, bulan } = req.params;
      const resp = await Jurnal.aggregate([
        {
          $match: {
            $and: [
              {
                tanggalJurnal: {
                  $gte: new Date(`${tahun}-${bulan}-01`),
                  $lte: new Date(`${tahun}-${bulan}-31`),
                },
              },
              { kodePerkiraan: { $gte: "101", $lte: "101" } },
            ],
          },
        },
      ]).sort({ _id: "asc" });
      if (!resp[0]) return res.status(404).json(err404());

      const total = await Jurnal.aggregate([
        {
          $match: {
            $and: [
              {
                tanggalJurnal: {
                  $gte: new Date(`${tahun}-${bulan}-01`),
                  $lte: new Date(`${tahun}-${bulan}-31`),
                },
              },
              { kodePerkiraan: { $gte: "101", $lte: "101" } },
            ],
          },
        },
        {
          $group: {
            _id: null,
            debet: { $sum: "$debet" },
            kredit: { $sum: "$kredit" },
          },
        },
      ]);
      return res.status(200).json({
        code: 200,
        status: "OK",
        totalDebet: total[0].debet,
        totalKredit: total[0].kredit,
        totalSaldo: total[0].debet - total[0].kredit,
        data: resp,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json(err400(error));
    }
  },

  FindYear: async (req, res) => {
    try {
      const { tahun } = req.params;
      const resp = await Jurnal.aggregate([
        {
          $match: {
            $and: [
              {
                tanggalJurnal: {
                  $gte: new Date(`${tahun}-01-01`),
                  $lte: new Date(`${tahun}-12-31`),
                },
              },
              { kodePerkiraan: { $gte: "101", $lte: "101" } },
            ],
          },
        },
      ]).sort({ _id: "asc" });
      if (!resp[0]) return res.status(404).json(err404());

      const total = await Jurnal.aggregate([
        {
          $match: {
            $and: [
              {
                tanggalJurnal: {
                  $gte: new Date(`${tahun}-01-01`),
                  $lte: new Date(`${tahun}-12-31`),
                },
              },
              { kodePerkiraan: { $gte: "101", $lte: "101" } },
            ],
          },
        },
        {
          $group: {
            _id: null,
            debet: { $sum: "$debet" },
            kredit: { $sum: "$kredit" },
          },
        },
      ]);
      return res.status(200).json({
        code: 200,
        status: "OK",
        totalDebet: total[0].debet,
        totalKredit: total[0].kredit,
        totalSaldo: total[0].debet - total[0].kredit,
        data: resp,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json(err400(error));
    }
  },
};
